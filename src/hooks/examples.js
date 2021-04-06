import { useMemo } from 'react';
import { examplePath } from '../utils/paths';

/**
  Hook to find the json and image for each related example
  @param {Array} examples Array of example JSON files
  @param {Array} images Array of sharp image objects
**/
export const usePreparedExamples = (examples, images) => {
  return useMemo(() => {
    // Prepare examples by extracting the necessary info and
    const prepared = [];

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];

      // Find the image
      let image;
      if (Array.isArray(images)) {
        for (let j = 0; j < images.length; j++) {
          if (images[j].name === example.name) {
            image = images[j];
            break;
          }
        }
      }

      const [category, subcategory] = example.relativeDirectory.split('/');
      prepared.push({
        slug: example.name,
        path: examplePath(example.name),
        name: example.childJson.name,
        order: example.childJson.order,
        level: example.childJson.level,
        category,
        subcategory,
        image,
        search: `${example.name}`,
      });
    }

    return prepared;
  }, [examples, images]);
};

/**
  Simple hook to sort an array of examples based on an array of string names
  @param {Array} examples Array of examples that have been through usePreparedExamples()
  @param {Array} related Array of string names
**/
export const useRelatedExamples = (examples, related) => {
  return useMemo(() => {
    const filtered = [];
    for (let i = 0; i < examples.length; i++) {
      if (related.includes(examples[i].slug)) {
        filtered.push(examples[i]);
      }
    }
    return filtered;
  }, [examples, related]);
};

/**
  Simple hook to sort an tree based on given a attribute
  @param {Object} tree Tree of objects that own the given attribute
  @param {string} attr Atribute name
  @param {boolean} curated If true, the tree is sorted by the attribute
**/
export const useTreeSort = (tree, attr, curated) => {
  return useMemo(() => {
    const sortedTree = {};
    if (curated) {
      Object.keys(tree).map((category) => {
        if (!sortedTree[category]) sortedTree[category] = {};
        Object.keys(tree[category]).map((subcategory) => {
          const sorted = [];
          for (let i = 0; i < tree[category][subcategory].length; i++) {
            sorted[tree[category][subcategory][i][attr]] =
              tree[category][subcategory][i];
          }
          sortedTree[category][subcategory] = sorted;
        });
      });
    }
    return curated ? sortedTree : tree;
  }, [tree, attr, curated]);
};

/**
  Hook to sort a list of .pde files so the file with the same name
  of the examples is first in the array.
**/
export const useOrderedPdes = (name, nodes) => {
  return useMemo(() => {
    const main = nodes.find((pde) => pde.name === name);
    const rest = nodes.filter((pde) => pde.name !== name);
    rest.unshift(main);
    return rest;
  }, [name, nodes]);
};
