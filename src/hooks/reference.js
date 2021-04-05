import { useMemo } from 'react';
import { titleCase } from '../utils/data';

/**
  Hook to turn the reference items in an object that can be used in useTree
  @param {Array} items GraphQL reference items
**/
export const usePreparedReferenceItems = (items) => {
  return useMemo(() => {
    // This makes up for some weirdness in lowercase/uppercase category and subcategory
    // names and removes underscores and adds title cases.
    return items.map((item) =>
      Object.assign({}, item.childJson, {
        category: titleCase(item.childJson.category),
        subcategory: titleCase(item.childJson.subcategory),
      })
    );
  }, [items]);
};
