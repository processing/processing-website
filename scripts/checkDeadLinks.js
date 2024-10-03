#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const glob = require('glob');

/**
 * Extract links from a given file content using regex.
 * @param {string} content - The content of the file.
 * @returns {string[]} - Array of extracted links.
 */
function extractLinks(content) {
    const regex = /https?:\/\/[^\s,")]+/g;
    return content.match(regex) || [];
}

/**
 * Check if a link should be excluded based on exclude patterns.
 * @param {string} link - The URL to check.
 * @param {string[]} excludePatterns - Array of patterns to exclude.
 * @returns {boolean} - True if the link should be excluded.
 */
function isExcluded(link, excludePatterns) {
    return excludePatterns.some(pattern => link.includes(pattern));
}

/**
 * Check the status of a single link.
 * @param {string} link - The URL to check.
 * @returns {Promise<object>} - Result object containing link status.
 */
async function checkLink(link) {
    try {
        const response = await axios.head(link, { maxRedirects: 10, timeout: 5000 });
        return {
            link,
            status_code: response.status,
            error: response.status >= 400 ? 'Dead link' : null
        };
    } catch (error) {
        return {
            link,
            status_code: error.response ? error.response.status : null,
            error: error.message
        };
    }
}

/**
 * Process a single file to extract and check links.
 * @param {string} filePath - The path to the file.
 * @param {string[]} excludePatterns - Patterns to exclude from link checking.
 * @param {object[]} deadLinks - Array to collect dead link information.
 * @param {object} counters - Counters to keep track of total and dead links.
 */
async function processFile(filePath, excludePatterns, deadLinks, counters) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        const links = extractLinks(content);

        if (links.length === 0) {
            return;
        }

        for (const link of links) {
            if (isExcluded(link, excludePatterns)) {
                continue;
            }

            counters.totalLinks += 1;
            const result = await checkLink(link);

            if (result.error) {
                console.log(`🔴 Dead link found: ${link} (Status code: ${result.status_code || 'N/A'}) in file: ${filePath}`);
                deadLinks.push({
                    link: result.link,
                    status_code: result.status_code,
                    file: filePath,
                    error: result.error
                });
                counters.deadLinks += 1;
            } else {
                console.log(`✅ Working link: ${link} in file: ${filePath}`);
            }
        }
    } catch (error) {
        console.error(`❌ Error processing file ${filePath}: ${error.message}`);
    }
}

/**
 * Main function to execute the link checking process.
 */
async function main() {
    // Parse command-line arguments
    const argv = yargs(hideBin(process.argv))
        .option('target-dirs', {
            alias: 't',
            type: 'array',
            default: ['.'],
            description: 'Directories to target for scanning (default is current directory)'
        })
        .option('exclude-dirs', {
            alias: 'ed',
            type: 'array',
            default: [],
            description: 'Directories to exclude from scanning (e.g., node_modules .cache)'
        })
        .option('exclude-files', {
            alias: 'ef',
            type: 'array',
            default: [],
            description: 'Specific files to exclude from scanning (e.g., file1.mdx file2.json)'
        })
        .option('exclude', {
            alias: 'e',
            type: 'array',
            default: [],
            description: 'Patterns to exclude from link checking (e.g., example.com another.com)'
        })
        .help()
        .alias('help', 'h')
        .argv;

    const targetDirs = argv['target-dirs'].map(dir => path.resolve(dir));
    const excludeDirs = new Set(argv['exclude-dirs'].map(dir => path.resolve(dir)));
    const excludeFiles = new Set(argv['exclude-files'].map(file => path.resolve(file)));
    const excludePatterns = argv['exclude'];

    let deadLinks = [];
    let counters = {
        totalLinks: 0,
        deadLinks: 0
    };

    // Define file patterns to search
    const filePatterns = ['**/*.mdx', '**/*.json', '**/*.md'];

    for (const targetDir of targetDirs) {
        for (const pattern of filePatterns) {
            const files = glob.sync(pattern, {
                cwd: targetDir,
                absolute: true,
                nodir: true,
                ignore: Array.from(excludeDirs).map(dir => path.join(dir, '**')),
            });

            for (const file of files) {
                if (excludeFiles.has(file)) {
                    continue;
                }

                await processFile(file, excludePatterns, deadLinks, counters);
            }
        }
    }

    // Write dead links to JSON file
    if (deadLinks.length > 0) {
        const outputPath = path.resolve('dead_links.json');
        try {
            await fs.writeJson(outputPath, deadLinks, { spaces: 4 });
            console.log(`\n🔗 Dead links have been written to ${outputPath}`);
        } catch (error) {
            console.error(`❌ Failed to write dead links to JSON: ${error.message}`);
        }
    } else {
        console.log('\n🎉 No dead links found.');
    }

    // Print summary
    console.log(`\n🔍 Summary: Total links checked: ${counters.totalLinks}, Dead links found: ${counters.deadLinks}`);
}

main();