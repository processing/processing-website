import { useMemo } from 'react';

/**
  Hook to turn the reference items in an object that can be used in useTree
  @param {Array} items GraphQL reference items
**/
export const usePreparedReferenceItems = (items) => {
  return useMemo(() => {
    return items.map((item) => item.childJson);
  }, [items]);
};
