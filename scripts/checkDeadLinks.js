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
    const regex = /https?:\/\/[^\s,")>\\]+/g;
    const rawLinks = content.match(regex) || [];
    return rawLinks.map(link => link.replace(/[\\"]+$/, '')); // Remove trailing backslashes and quotes
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
 * Append dead link information to the JSON file.
 * @param {object} deadLink - The dead link object to append.
 */
async function appendDeadLinkToFile(deadLink) {
    const outputPath = path.resolve('dead_links.json');
    try {
        const data = await fs.readJson(outputPath).catch(() => []);
        data.push(deadLink);
        await fs.writeJson(outputPath, data, { spaces: 4 });
    } catch (error) {
        console.error(`❌ Failed to append dead link to JSON: ${error.message}`);
    }
}

/**
 * Process a single file to extract and check links.
 * @param {string} filePath - The path to the file.
 * @param {string[]} excludePatterns - Patterns to exclude from link checking.
 * @param {object[]} deadLinks - Array to collect dead link information.
 * @param {object} counters - Counters to keep track of total and dead links.
 */
async function processFile(filePath, excludePatterns, counters) {
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

            const relativeFilePath = path.relative(process.cwd(), filePath);

            if (result.error) {
                const errorDescription = getErrorDescription(result.status_code);
                console.log(`🔴 [${result.status_code || 'N/A'}] ${link} in file: ${relativeFilePath}`);
                const deadLink = {
                    link: result.link,
                    status_code: result.status_code,
                    file: relativeFilePath,
                    error: result.error,
                    error_description: errorDescription
                };
                await appendDeadLinkToFile(deadLink);
                counters.deadLinks += 1;
            } else {
                console.log(`✅ [OK] ${link} in file: ${relativeFilePath}`);
            }
        }
    } catch (error) {
        console.error(`❌ Error processing file ${filePath}: ${error.message}`);
    }
}

/**
 * Get the description of the HTTP status code.
 * @param {number} statusCode - The HTTP status code.
 * @returns {string} - The description of the status code.
 */
function getErrorDescription(statusCode) {
    const descriptions = {
        400: 'Bad Request - The server could not understand the request.',
        401: 'Unauthorized - Authentication is required and has failed or has not been provided.',
        403: 'Forbidden - The server understood the request, but refuses to authorize it.',
        404: 'Not Found - The server cannot find the requested resource.',
        500: 'Internal Server Error - The server has encountered a situation it doesn\'t know how to handle.',
        502: 'Bad Gateway - The server was acting as a gateway or proxy and received an invalid response.',
        503: 'Service Unavailable - The server is not ready to handle the request.',
        504: 'Gateway Timeout - The server was acting as a gateway or proxy and did not receive a response in time.',
        405: 'Method Not Allowed - The method specified in the Request-Line is not allowed for the resource.',
        429: 'Too Many Requests - The user has sent too many requests in a given amount of time.',
        505: 'HTTP Version Not Supported - The server does not support, or refuses to support, the major version of HTTP that was used in the request message.',
        511: 'Network Authentication Required - The client needs to authenticate to gain network access.',
        599: 'Network Connect Timeout Error - Can be caused by a network issue or a server-side issue.',
    };

    return descriptions[statusCode] || 'Unknown error, look up status code for details';
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

    let counters = {
        totalLinks: 0,
        deadLinks: 0
    };

    // Initialize/clear dead_links.json file
    await fs.writeJson(path.resolve('dead_links.json'), []);

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

                await processFile(file, excludePatterns, counters);
            }
        }
    }

    // Print summary
    console.log(`\n🔍 Summary: Total links checked: ${counters.totalLinks}, Dead links found: ${counters.deadLinks}`);
    console.log('\n✅ Scan completed successfully.');
}

main();