/**
  NB: This file is written with node-like exports because it is used both
  in the frontend and in the gatsby-node.js file.
**/

const langPrefix = (lang) =>
  lang && lang !== '' && lang !== 'en' ? `/${lang}` : '';

/**
  Returns the slug of an example. Slug is lowercased to match old processing.org URL's
**/
const exampleSlug = (name) => {
  return name.toLowerCase();
};

/**
  Returns the full path to an example
**/
const examplePath = (name) => {
  return `/examples/${exampleSlug(name)}.html`;
};

/**
  Returns the full path to a reference (processing or library) item
  @param lang only used in Node. In React, this is controlled by the InternationalizedLink component
**/
const referencePath = (name, libraryName, lang) => {
  return !libraryName || libraryName === 'processing'
    ? `${langPrefix(lang)}/reference/${name}.html`
    : `${langPrefix(lang)}/reference/libraries/${libraryName}/${name}.html`;
};

/**
  Used to convert fill_ to fill() and PShape_width to PShape::width
**/
const pathToName = (name) => name.replace(/_$/g, '()').replace(/_/g, '::');

module.exports = {
  exampleSlug,
  examplePath,
  referencePath,
  pathToName
};
