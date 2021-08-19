const fs = require('fs');
const path = require('path');

// This script is inspired by the old perl script here:
// https://github.com/processing/processing-docs/blob/master/generate/keywords_create.cgi

// TODO: Go through base and check if there are some things we can remove
// and just rely on generated code instead:
// - String
// - All Data > Primitive

const folder = path.join(
  __dirname,
  '..',
  'content',
  'references',
  'translations',
  'en',
  'processing'
);

/**
  A list of names to ignore, based on the old perl script.
  An entry such a "height" will ignore both `height` and `PImage.height`
**/
const ignore = ['width', 'height', 'x', 'y', 'z', 'Object'];

/**
  A list of global functions that need to have special handling
**/
const globalFuncs = [
  'keyPressed()',
  'keyReleased()',
  'keyTyped()',
  'mouseClicked()',
  'mouseDragged()',
  'mouseMoved()',
  'mousePressed()',
  'mouseReleased()',
  'mouseWheel()',
  'settings()',
  'setup()',
  'draw()'
];

/**
  This script creates the keywords.txt file that is used to do syntax highligting
  in the Processing IDE.
**/
const updateKeywords = () => {
  if (!processingRepoExists()) {
    console.error(
      'To run this script, you must have the processing4 repo next to the processing-website repo on your computer.'
    );
    return;
  }

  // Load the base keywords
  const [baseKeywords, baseContents] = parseKeywordsFile('keywords_base.txt');

  // Load all json files
  const entries = fs.readdirSync(folder).map((file) => {
    let entry = require(path.join(folder, file));
    entry = Object.assign(
      {
        filename: file,
        basename: path.basename(file, '.json')
      },
      entry
    );
    entry.leftName = leftName(entry);
    entry.rightName = rightName(entry);
    entry.token = getToken(entry);
    return entry;
  });

  // Sort by listing in original keywords.txt
  entries.sort(sortByClassAndGlobal);

  // Run through and add if not already in base
  const keywords = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (shouldInclude(baseKeywords, entry)) {
      keywords.push([entry.leftName, entry.token, entry.rightName]);
    }
  }

  const pad = (str, size) => (str ? str.padEnd(size, ' ') : str);

  // Save to keywords.txt file
  const combined = baseContents + '\n\n' + generateKeywordsFile(keywords);

  fs.writeFileSync(
    path.join(__dirname, '..', '..', 'processing4', 'java', 'keywords.txt'),
    combined
  );
  console.log('keywords.txt file written to the processing4 repo!');
};

/**
  Sorts the entries based on the basename
**/
const sortByClassAndGlobal = (a, b) => {
  const strippedA = a.basename.replace(/_$/, '').toLowerCase();
  const strippedB = b.basename.replace(/_$/, '').toLowerCase();

  if (strippedA < strippedB) {
    return -1;
  }

  if (strippedA > strippedB) {
    return 1;
  }

  return 0;
};

/**
  Looks to see if the entry is in the base keywords.
**/
const shouldInclude = (keywords, entry) => {
  // Don't include ignored names
  if (ignore.indexOf(entry.name) > -1) {
    return false;
  }

  // See if entry is in the keywords base
  for (let i = 0; i < keywords.length; i++) {
    if (keywords[i][0] == entry.leftName && keywords[i][2] == entry.basename) {
      return false;
    }
  }

  // Otherwise, include
  return true;
};

/**
  Parse a keywords file into an array of arrays
**/
const parseKeywordsFile = (filename) => {
  const content = fs.readFileSync(path.join(__dirname, filename)).toString();
  const lines = content.split('\n');
  const keywords = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line[0] !== '#' && line.length > 0) {
      keywords.push(line.split(/\s/));
    }
  }

  return [keywords, content];
};

const generateKeywordsFile = (keywords) => {
  let str = '';
  for (let i = 0; i < keywords.length; i++) {
    str += `${keywords[i][0]}\t${keywords[i][1]}\t${keywords[i][2]}\n`;
  }
  return str;
};

/**
  Handle special cases
**/
const specialCases = {
  '?: (conditional)': '?',
  '/** */ (doc comment)': '/**',
  '/* */ (multiline comment)': '/*'
};

/**
  Makes the clean version of the name for the left-hand side of the file
**/
const operatorRegex = /\s\([a-zA-Z\s]+\)$/;
const leftName = (entry) => {
  // Special handling
  if (specialCases[entry.name]) {
    return specialCases[entry.name];
  }

  // Operators are renamed: += (add assign) => +=
  if (entry.name.match(operatorRegex)) {
    return entry.name.replace(operatorRegex, '');
  }

  // Functions and class methods are renamed: float() => float
  if (entry.type === 'function' || entry.type === 'method') {
    return entry.name.replace(/\(\)$/, '');
  }

  // Variables are renamed: pixels[] => pixels
  if (entry.type === 'field' || entry.type === 'other') {
    return entry.name.replace(/\[\]$/, '');
  }

  // Just use name (Constants, classes, primitives, etc)
  return entry.name;
};

/**
  Make a name suitable for the right hand side
**/
const rightName = (entry) => {
  // global functions appear as just the name in the right
  if (globalFuncs.includes(entry.name)) {
    return entry.name.replace(/\(\)$/, '');
  }

  // Everything else uses the basename (fill_, PVector_add_, etc)
  return entry.basename;
};

/**
  Gets the syntax category. Based on the old pearl script.
**/
const getToken = (entry) => {
  if (globalFuncs.includes(entry.name)) {
    return 'FUNCTION4';
  } else if (entry.type === 'class') {
    return 'KEYWORD5';
  } else if (entry.type === 'method') {
    return 'FUNCTION2';
  } else if (entry.type === 'other') {
    return 'KEYWORD4';
  } else if (entry.type === 'field') {
    return 'KEYWORD2';
  }
  return 'FUNCTION1';
};

/**
  Checks whether the processing4 repo is next to this repo
**/
const processingRepoExists = (keywords) => {
  const siblings = fs.readdirSync(path.join(__dirname, '..', '..'));
  return siblings.includes('processing4');
};

updateKeywords();
