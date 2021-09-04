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
  of the examples is first in the array.
**/
export const useOrderedPdes = (name, nodes) => {
  const locale = useIntl().locale;
  console.log(`locale actual ${locale}`)
  return useMemo(() => {
    const main = nodes.find((pde) => pde.name === name);
    const rest = nodes.filter((pde) => pde.name !== name);

    rest.unshift(main);
    let pdeinlocale =[]
    if (locale!==`en`){
       pdeinlocale = rest.filter ( (pde) => pde.name.includes(`.${locale}`)) ;
    }else{//TODO check this logic
      console.log("quitando los que tienen locale")
      pdeinlocale = rest.filter ( (pde) => !pde.name.includes(`.`)) ;
    }
    console.log(`rest`)
    console.log(rest)
    console.log(`locale`)
    console.log(pdeinlocale)

    //return rest;
    return pdeinlocale;
  }, [name, nodes]);
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
   //   console.log( `Hay ejemplo`);
      if (example.category) {
        console.log( `hook examples categoria ${example.category.toString()}`);
        const category = intl.formatMessage({ id: example.category });
        console.log( `hook examples categoria INTL ${category}`);
        trail.push({
          slug: `/examples#${slugify(example.category)}`,
          label: category
        });
      }
      if (example.subcategory) {

        console.log( `subcategoria ${example.subcategory.toString()}`);
        const subcategory = intl.formatMessage({ id: example.subcategory });
       console.log( `subcategoria INTL ${subcategory}`);
        trail.push({
          slug: `/examples#${slugify(example.category, subcategory)}`,
          label: subcategory
        });
      }
    }
   // console.log( `trail construido: ${trail.toString()}`);
    return trail;
  }, [intl, example]);
};
