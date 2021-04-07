import { useMemo } from 'react';
import { titleCase } from '../utils';
import { referencePath } from '../utils/paths';

/**
  Hook to turn the reference items in an object that can be used in useTree
  @param {Array} items GraphQL reference items
**/
export const usePreparedReferenceItems = (items, libraryName) => {
  return useMemo(() => {
    // This makes up for some weirdness in lowercase/uppercase category and subcategory
    // names and removes underscores and adds title cases. Some of these should be fixed
    // in the JavaDoc comments instead.
    return items.map((item) =>
      Object.assign({}, item.childJson, {
        slug: item.name,
        path: referencePath(item.name, libraryName),
        category: titleCase(item.childJson.category),
        subcategory: titleCase(item.childJson.subcategory),
        search: `${item.childJson.name} ${item.childJson.brief ?? ''}`,
      })
    );
  }, [items, libraryName]);
};
