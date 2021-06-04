import { useMemo } from 'react';
import { titleCase } from '../utils';
import { referencePath, pathToName, examplePath } from '../utils/paths';

/**
  Hook to turn the reference items in an object that can be used in useTree
  @param {Array} items GraphQL reference items
**/
export const usePreparedItems = (items, libraryName) => {
  return useMemo(() => {
    // This makes up for some weirdness in lowercase/uppercase category and subcategory
    // names and removes underscores and adds title cases. Some of these should be fixed
    // in the JavaDoc comments instead.
    const prepared = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // Processing does not list methods or fields in reference list or sidebar. Libraries do.
      if (
        libraryName !== 'processing' ||
        (item.childJson.type !== 'method' && item.childJson.type !== 'field')
      ) {
        prepared.push(
          Object.assign({}, item.childJson, {
            slug: item.name,
            path: referencePath(item.name, libraryName),
            category: titleCase(item.childJson.category),
            subcategory: titleCase(item.childJson.subcategory),
            search: `${item.childJson.name} ${item.childJson.brief ?? ''}`
          })
        );
      }
    }

    return prepared;
  }, [items, libraryName]);
};

/**
  Hook to prepare either a list of strings or object to show in ReferenceItemList
  @param {Array} items Array of string or objects from JSON reference files
**/
export const usePreparedList = (items, libraryName, nameIsPath, shouldLink) => {
  return useMemo(() => {
    if (!items || items.length === 0) {
      return null;
    }

    // Convert string to a list object
    const stringToListObject = (str) => {
      const obj = {
        name: nameIsPath ? pathToName(str) : str
      };

      if (shouldLink) {
        obj.anchor = referencePath(str, libraryName);
      }

      return obj;
    };

    const objectToListObject = (old) => {
      const obj = {
        name: nameIsPath ? pathToName(old.name) : old.name,
        description: old.description ?? old.desc
      };
      if (old.type) {
        obj.type = old.type;
      }
      if (shouldLink) {
        obj.anchor = referencePath(old.anchor ?? old.name, libraryName);
      }
      return obj;
    };

    // If items is a string
    if (typeof items === 'string') {
      return [stringToListObject(items)];
    }

    // If items is an array
    const prepared = [];
    for (let i = 0; i < items.length; i++) {
      if (typeof items[i] === 'string') {
        prepared.push(stringToListObject(items[i]));
      }
      if (typeof items[i] === 'object' && items[i] !== null) {
        prepared.push(objectToListObject(items[i]));
      }
    }

    return prepared.length === 0 ? null : prepared;
  }, [items, libraryName, nameIsPath, shouldLink]);
};

/**
  Hook to prepare every reference example and find an image for it
  @param {Array} examples GraphQL reference examples
  @param {Array} images GraphQL image nodes
**/
export const usePreparedExamples = (pdes, images) => {
  return useMemo(() => {
    if (!pdes || pdes.length === 0) {
      return null;
    }
    const prepared = [];
    for (let i = 0; i < pdes.length; i++) {
      const example = {
        code: pdes[i].node.internal.content
      };

      if (images) {
        for (let j = 0; j < images.length; j++) {
          if (images[j].node.name === pdes[i].node.name) {
            example.image = images[j].node;
            break;
          }
        }
      }

      prepared.push(example);
    }

    return prepared;
  }, [pdes, images]);
};

/**
  Hook to prepare every in use example and find an image for it
  @param {Array} examples GraphQL in use examples
  @param {Array} images GraphQL image nodes
**/
export const useInUseExamples = (inUseExamples, images) => {
  return useMemo(() => {
    if (!inUseExamples || inUseExamples.length === 0) {
      return null;
    }
    const prepared = [];
    for (let i = 0; i < inUseExamples.length; i++) {
      const example = {
        name: inUseExamples[i].split(/(?=[A-Z])/).join(' '),
        path: examplePath(inUseExamples[i])
      };

      if (images) {
        for (let j = 0; j < images.nodes.length; j++) {
          if (images.nodes[j].name === inUseExamples[i]) {
            example.image = images.nodes[j];
            break;
          }
        }
      }

      prepared.push(example);
    }
    return prepared;
  }, [inUseExamples, images]);
};
