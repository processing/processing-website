const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');
const inquirer = require('inquirer');

const from = path.join(__dirname, '..', '..', 'processing-examples');
const to = path.join(__dirname, '..', 'content', 'examples');

/**
  This script updates the Processing code for the examples
**/
const updateExamples = async () => {
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

  console.log('Examples from processing-examples that are not in the website:');
  console.log('(These need to be manually added to the website)');
  missingTo.map((example) => console.log(`- ${example.path}`));
  console.log('');
  console.log('Examples from the website that are not in processing-examples:');
  console.log('(These should probably be deleted from the website)');
  missingFrom.map((example) => console.log(`- ${example.path}`));
  console.log('');
  console.log(
    'Examples that are in both repos and will be updated with the script:'
  );
  portExamples.map((example) => console.log(`- ${example.path}`));
  console.log('');

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Do you wish to update the content stated above?'
    }
  ]);

  if (!answers.confirm) {
    return;
  }

  // console.log('MISSING FROM');
  // console.log(missingFrom.map((e) => e.path));

  // console.log('MISSING TO');
  // console.log(missingTo.map((e) => e.path));

  // First make a log of
  // -> These examples exist in the website but not in processing-examples
  // -> These examples exist in the processing-examples repo but not in processing-website
  // -> These examples exist in both places and will be updated

  // Copy over all files from the contribs repo to the website
  // const files = fs.readdirSync(from);
  // for (const file of files) {
  //   if (path.extname(file) === '.json') {
  //     fs.copyFileSync(path.join(from, file), path.join(to, file));
  //   }
  // }

  console.log('Examples updated!');
};

/**
  Finds all main example files that are of format CATEGORY/SUBCATEGORY/EXAMPLE/EXAMPLE.pde
**/
const findExamples = (folder) => {
  const files = glob.sync('**/*.pde', { cwd: folder });
  const examples = [];
  files.forEach((file) => {
    const split = file.split(path.sep);
    const basename = path.basename(file, '.pde');

    // If the file is in the right nested folder structure
    // and the file is named the same as the parent.
    if (split.length === 4 && split[2] === basename) {
      examples.push({
        category: split[0],
        subcategory: split[1],
        path: file,
        name: basename
      });
    }
  });
  return examples;
};

/**
  Finds all the examples from examples1 missing from examples2
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
  Checks whether the processing-contributions repo is next to this repo
**/
const examplesRepoExists = (keywords) => fs.existsSync(from);

updateExamples();
