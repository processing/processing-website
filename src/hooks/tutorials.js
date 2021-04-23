import { useMemo } from 'react';
import slugify from 'slugify';

/**
  Hook to turn the reference items in an object that can be used in useTree
  @param {Array} items GraphQL reference items
**/
export const useSlug = (str) => {
  return useMemo(
    () => slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g }),
    [str]
  );
};
