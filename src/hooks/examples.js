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
  @param {Array} related Array of strings with names of related examples
  @param {Array} examples Array of all example JSON files returned from GraphQL
  @param {Array} images Array of sharp image objects
**/
export const useRelatedExamples = (related, examples, images) => {
  return useMemo(() => {
    return related.map((name) => {
      const json = examples.find((f) => f.name === name);
      const image = images.find((f) => f.name === name);
      return {
        slug: examplePath(name),
        name: json.childJson.name,
        image,
      };
    });
  }, [related, examples, images]);
};
