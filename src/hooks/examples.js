import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { slugify } from '../utils';
import { examplePath } from '../utils/paths';

/**
  Hook to parse the GraphQL example into a useable object
**/
export const usePreparedExample = (example) => {
  return useMemo(() => {
    if (!example) {
      return null;
    }

    const [category, subcategory] = example.relativeDirectory.split('/');
    return {
      title: example.childJson.title,
      author: example.childJson.author,
      description: example.childJson.description,
      featured: example.childJson.featured,
      category,
      subcategory
    };
  }, [example]);
};

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
        search: `${example.name}`
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
  Hook to sort a list of .pde files so the file with the same name
  of the examples is first in the array. This hooks expects both the
  english and the translated pdes to be present in the nodes, and
  will overwrite the english pde files with the locale pde files.
**/
export const usePdes = (name, nodes, locale) => {
  return useMemo(() => {
    // Find all the english files and add the main pde first
    const pdes = [];
    const localePdes = [];

    for (let i = 0; i < nodes.length; i++) {
      const pde = {
        name: nodes[i].fields.name,
        code: nodes[i].childRawCode.content,
        lang: nodes[i].fields.lang
      };
      if (pde.lang === 'en') {
        if (pde.name === name) {
          pdes.unshift(pde);
        } else {
          pdes.push(pde);
        }
      } else {
        localePdes.push(pde);
      }
    }

    // overwrite the english files with the locale files
    if (locale !== 'en') {
      loop1: for (let i = 0; i < pdes.length; i++) {
        for (let j = 0; j < localePdes.length; j++) {
          if (pdes[i].name === localePdes[j].name) {
            pdes[i] = localePdes[j];
            continue loop1;
          }
        }
      }
    }

    return pdes;
  }, [name, nodes, locale]);
};

/**
  Hook to prepare the trail used for the breadcumbs
  Example: Learn > Examples > [Category] > [Subcategory]
**/
export const useTrail = (example) => {
  const intl = useIntl();
  return useMemo(() => {
    const trail = [
      intl.formatMessage({ id: 'learn' }),
      { slug: '/examples', label: intl.formatMessage({ id: 'examples' }) }
    ];

    if (example) {
      if (example.category) {
        trail.push({
          slug: `/examples#${slugify(example.category)}`,
          label: example.category
        });
      }
      if (example.subcategory) {
        trail.push({
          slug: `/examples#${slugify(example.category, example.subcategory)}`,
          label: example.subcategory
        });
      }
    }

    return trail;
  }, [intl, example]);
};
