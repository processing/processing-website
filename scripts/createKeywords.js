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
// pixelHeight was there twice. I removed it from the generated code
// PVector was listed twice as FUNCTION1 in base and KEYWORD5 in generated output. I keps the latter.
// PShader.set was `PShader	FUNCTION2	PShader_set_`. Changed to `set	FUNCTION2	PShader_set_`
// PFont.list was listed as FUNCTION1. I changed it to be FUNCTION2 like the other class methods.

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
const createKeywords = () => {
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

  // COMPARE TO OLD VERSION
  /*
  const [currentKeywords] = parseKeywordsFile('keywords_old.txt');
  const absIndex = currentKeywords.findIndex((k) => k[0] === 'abs');
  const needToGenerate = currentKeywords.slice(absIndex);
  console.log('Old', needToGenerate.length, 'New', keywords.length);

  for (let i = 0; i < needToGenerate.length; i++) {
    const a = needToGenerate[i];
    const b = keywords[i];
    const match = a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

    if (!match) {
      console.log(
        pad(match.toString(), 7),
        pad(a[0], 25),
        pad(b[0], 25),
        pad(a[1], 10),
        pad(b[1], 10),
        pad(a[2], 25),
        pad(b[2], 25)
      );
    }
  }
  */

  // Save to keywords.txt file
  const combined = baseContents + '\n\n' + generateKeywordsFile(keywords);

  fs.writeFileSync(path.join(__dirname, 'keywords.txt'), combined);
  console.log('keywords.txt file written to scripts folder');
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

createKeywords();
