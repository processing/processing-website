/**
  Returns the full path to an example
**/
export const examplePath = (name) => `/examples/${name.toLowerCase()}.html`;

/**
  Returns the full path to a reference (processing or library) item
**/
export const referencePath = (name, libraryName) => {
  return !libraryName || libraryName === 'processing'
    ? `/reference/${name}.html`
    : `/reference/libraries/${libraryName}/${name}.html`;
};
