const fs = require('fs');
const path = require('path');

const from = path.join(
  __dirname,
  '..',
  '..',
  'processing-contributions',
  'sources'
);
const to = path.join(__dirname, '..', 'content', 'contributions');

/**
  This script updates the contributions data
**/
const updateContributions = () => {
  if (!contributionsRepoExists()) {
    console.error(
      'To run this script, you must have the processing-contributions repo next to the processing-website repo on your computer.'
    );
    return;
  }

  deleteContributions();

  // Copy over all files from the contribs repo to the website
  const files = fs.readdirSync(from);
  for (const file of files) {
    if (path.extname(file) === '.json') {
      fs.copyFileSync(path.join(from, file), path.join(to, file));
    }
  }

  console.log('Contributions updated!');
};

/**
  Checks whether the processing-contributions repo is next to this repo
**/
const contributionsRepoExists = (keywords) => fs.existsSync(from);

/**
  Delete all files in the website contributions folder
**/
const deleteContributions = () => {
  const files = fs.readdirSync(to);
  for (const file of files) {
    fs.unlinkSync(path.join(to, file), (err) => {
      if (err) throw err;
    });
  }
};

updateContributions();
