import { useMemo } from 'react';
import { examplePath } from '../utils/paths';

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

/**
  Hook to find the json and image for each related example
  @param {Array} examples Array of example JSON files
  @param {Array} images Array of sharp image objects
  @param {Array} filter Array of strings with names to filter examples by
**/
export const usePreparedExamples = (examples, images, filter) => {
  return useMemo(() => {
    // Filter examples if needed
    let filtered = examples;
    if (filter) {
      filtered = [];
      for (let i = 0; i < examples.length; i++) {
        if (filter.includes(examples[i].name)) {
          filtered.push(examples[i]);
        }
      }
    }

    // Prepare examples by extracting the necessary info and
    const prepared = [];

    for (let i = 0; i < filtered.length; i++) {
      const example = filtered[i];

      // Find the image
      let image;
      for (let j = 0; j < images.length; j++) {
        if (images[j].name === example.name) {
          image = images[j];
          break;
        }
      }

      const [category, subCategory] = example.relativeDirectory.split('/');
      prepared.push({
        slug: example.name,
        path: examplePath(example.name),
        name: example.childJson.name,
        category,
        subCategory,
        image,
      });
    }

    return prepared;
  }, [examples, images, filter]);
};
