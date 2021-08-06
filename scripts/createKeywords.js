const fs = require('fs');
const path = require('path');

// This script is inspired by the old perl script here:
// https://github.com/processing/processing-docs/blob/master/generate/keywords_create.cgi

// TODO: Go through base and check if there are some things we can remove
// and just rely on generated code instead:
// - String
// - All Data > Primitive

// ENTRIES that are in current keywords.txt but not in the new one:
// blendColor()
// displayWidth
// displayHeight
// FloatDict.keys() - needs JavaDoc. It's not in the reference
// IntDict.keys() - needs JavaDoc. It's not in the reference
// Some constants were in there twice, both in the base and in the generated output: HALF_PI, PI, QUARTER_PI, TAU, TWO_PI
// PVector.get()
// StringDict.keys()

// ENTRIES that are in the new one but not in the current
// circle()
// FloatDict.maxIndex()
// FloatDict.minIndex()
// mask()
// PImage.blendColor()
// pop()
// push()
// setLocation()
// setResizable()
// setTitle()
// square()
// Table.matchRowIterator()
// Table.sort()
// XML.getChildCount()
// XML.parse()
// XML.setLong()

// OTHER changes
// draw has been changed to draw_ on the righthand side
// Gobal functions currently have _ at end, which they didn't in the original file: keyPressed, keyReleased, keyTyped, mouseClicked, mouseDragged, mouseMoved, mousePressed, mouseReleased, mouseWheel, settings, setup
// pixelHeight was listed as a function with _ at the right end. I removed it.
// PVector was listed twice as FUNCTION1 in base and KEYWORD5 in generated output. I keps the latter.

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
  This script creates the keywords.txt file that is used to do syntax highligting
  in the Processing IDE.
**/
const createKeywords = () => {
  // TEMPORARY: To be used for diffing
  const currentKeywords = parseKeywordsFile('current_keywords.txt');
  const absIndex = currentKeywords.findIndex((k) => k[0] === 'abs');
  const needToGenerate = currentKeywords.slice(absIndex);

  // Load the base keywords
  const baseKeywords = parseKeywordsFile('keywords_base.txt');

  // Load all json files
  const entries = fs.readdirSync(folder).map((file) => {
    const entry = require(path.join(folder, file));
    return Object.assign(
      {
        filename: file,
        basename: path.basename(file, '.json'),
        clean: cleanName(entry)
      },
      entry
    );
  });

  // Sort by listing in original keywords.txt
  entries.sort(sortByClassAndGlobal);

  // Run through and add if not already in base
  const newKeywords = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.name === 'PVector') {
      console.log('here', shouldInclude(baseKeywords, entry));
    }
    if (shouldInclude(baseKeywords, entry)) {
      newKeywords.push([entry.clean, 'CATEGORY', entry.basename]);
    }
  }

  // Log to compare objects
  for (let i = 0; i < needToGenerate.length; i++) {
    const a = needToGenerate[i][2];
    const b = newKeywords[i] ? newKeywords[i][2] : null;
    console.log(a == b, `| ${a} | ${b} |`);
  }

  console.log(
    'Old length',
    needToGenerate.length,
    'New Length',
    newKeywords.length
  );

  // output rest of stuff from newKeywords
  if (newKeywords.length > needToGenerate.length) {
    for (let i = needToGenerate.length; i < newKeywords.length; i++) {
      console.log('EXTRA', needToGenerate[i]);
    }
  }
};

const sortByClassAndGlobal = (a, b) => {
  // If a is not a class, but b is, a comes first
  // if (!a.classanchor && b.classanchor) {
  //   return -1;
  // }

  // If a is a class, but b is not, a comes last
  // else if (a.classanchor && !b.classanchor) {
  //   return 1;
  // }

  // Otherwise, compare apples to apples
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
  Looks to see if the entry is in the keywords base.
**/
const shouldInclude = (keywords, entry) => {
  // Don't include ignored names
  if (ignore.indexOf(entry.name) > -1) {
    return false;
  }

  // See if entry is in the keywords base
  for (let i = 0; i < keywords.length; i++) {
    if (keywords[i][0] == entry.clean && keywords[i][2] == entry.basename) {
      return false;
    }
  }

  // Otherwise, include
  return true;
};

const parseKeywordsFile = (filename) => {
  const txt = fs.readFileSync(path.join(__dirname, filename)).toString();
  const lines = txt.split('\n');
  const keywords = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line[0] !== '#' && line.length > 0) {
      keywords.push(line.split(/\s/));
    }
  }

  return keywords;
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
const cleanName = (entry) => {
  // Constants, classes and primitives are just using the name
  if (
    entry.type === 'class' ||
    entry.category === 'constants' ||
    (entry.category === 'Data' && entry.subcategory === 'Primitive')
  ) {
    return entry.name;
  }

  // Special handling
  if (specialCases[entry.name]) {
    return specialCases[entry.name];
  }

  // Operators are renamed: += (add assign) => +=
  if (
    entry.subcategory === 'Operators' ||
    entry.subcategory == 'Bitwise Operators' ||
    entry.subcategory == 'Relational Operators' ||
    entry.subcategory == 'Logical Operators' ||
    (entry.category === 'structure' && entry.subcategory === '')
  ) {
    return entry.name.replace(/\([a-zA-Z\s]+\)$/, '').trim();
  }

  // Functions and class methods are renamed: float() => float
  if (entry.type === 'function' || entry.type === 'method') {
    return entry.name.replace(/\(\)$/, '');
  }
};

createKeywords();
