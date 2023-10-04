const fs = require('fs-extra');
const path = require('path');
const glob = require('fast-glob');

// Define the source and destination directories
const from = path.join(__dirname, '..', '..', 'processing-examples');
const to = path.join(__dirname, '..', 'content', 'examples');

/**
 * This script updates the .pdez files for the examples
 **/
const updatePdezFiles = async () => {
  if (!examplesRepoExists()) {
    console.error(
      'To run this script, you must have the processing-examples repo next to the processing-website repo on your computer.'
    );
    return;
  }

  // Find examples in both the examples repo and this repo
  const fromExamples = findExamples(from);
  const toExamples = findExamples(to);

  const missingFrom = diffExamples(toExamples, fromExamples);
  const missingTo = diffExamples(fromExamples, toExamples);
  const portExamples = fromExamples.filter(
    (example) => !missingTo.includes(example)
  );

  if (missingTo.length > 0) {
    console.log(
      'Examples from processing-examples that are not in the website:'
    );
    console.log('(These need to be manually added to the website)');
    missingTo.map((example) => console.log(`- ${example.path}`));
    console.log('');
  }

  if (missingFrom.length > 0) {
    console.log(
      'Examples from the website that are not in processing-examples:'
    );
    console.log('(These should probably be deleted from the website)');
    missingFrom.map((example) => console.log(`- ${example.path}`));
    console.log('');
  }

  if (portExamples.length > 0) {
    console.log(
      'Examples that are in both repos and will be updated with the script:'
    );
    portExamples.map((example) => console.log(`- ${example.path}`));
    console.log('');
  }

  // Perform the update
  await performPdezFilesUpdate(portExamples);

  console.log('.pdez files updated successfully!');
};

/**
 * Finds all main example files that are of format CATEGORY/SUBCATEGORY/EXAMPLE/EXAMPLE.pde
 **/
const findExamples = (folder) => {
  const files = glob.sync('**/*.pde', { cwd: folder });
  const examples = [];
  files.forEach((file) => {
    const split = file.split(path.sep);
    const basename = path.basename(file, '.pde');

    if (split.length === 4 && split[2] === basename) {
      examples.push({
        category: split[0],
        subcategory: split[1],
        path: file,
        name: basename,
        dirname: path.dirname(file),
      });
    }
  });
  return examples;
};

/**
 * Finds all the examples from examples1 missing from examples2
 **/
const diffExamples = (examples1, examples2) => {
  const missing = [];
  loop1: for (let i = 0; i < examples1.length; i++) {
    for (let j = 0; j < examples2.length; j++) {
      if (examples1[i].path === examples2[j].path) {
        continue loop1;
      }
    }
    missing.push(examples1[i]);
  }
  return missing;
};

/**
 * Checks whether the processing-examples repo is next to this repo
 **/
const examplesRepoExists = () => fs.existsSync(from);

/**
 * Perform the update of .pdez files
 **/
const performPdezFilesUpdate = async (examples) => {
  for (let i = 0; i < examples.length; i++) {
    const example = examples[i];

    // Generate .pdez file content based on the example
    const pdezContent = generatePdezContent(example);

    // Write the .pdez file to the example folder
    const pdezFilePath = path.join(to, example.dirname, `${example.name}.pdez`);
    await fs.writeFile(pdezFilePath, pdezContent);

    console.log(`Updated .pdez file for ${example.path}`);
  }
};

/**
 * Generate .pdez file content for an example
 **/
const generatePdezContent = (example) => {
  // Modify this function to generate .pdez content based on your requirements
  // You can use example's properties to customize the content
  return `
    {
      "name": "${example.name}",
      "title": "${example.title}",
      "author": "${example.author}",
      "level": "${example.level}",
      "order": "${example.order}",
      "description": "${example.description}",
      "featured": ${JSON.stringify(example.featured)}
    }
  `;
};

// Run the updatePdezFiles function
updatePdezFiles();
