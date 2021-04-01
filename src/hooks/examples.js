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
    const filtered = filter
      ? examples.filter((f) => filter.includes(f.name))
      : examples;
    return filtered.map((example) => {
      const image = images.find((f) => f.name === example.name);
      const [category, subCategory] = example.relativeDirectory.split('/');
      return {
        slug: examplePath(example.name),
        name: example.childJson.name,
        category,
        subCategory,
        image,
      };
    });
  }, [examples, images, filter]);
};
