import {
  useEffect,
  useRef,
  useMemo,
  useLayoutEffect,
  useCallback,
  useState
} from 'react';
import hljs from 'highlight.js/lib/core';
import processing from 'highlight.js/lib/languages/processing';
import { getWin, sessionStorage, sortObject } from '../utils';

hljs.registerLanguage('processing', processing);

/**
  Performs syntax highlighting on all <pre><code> in the body
  We added a 500ms delay in order for the first render to have been performed.
**/
export const useHighlight = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.body.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, []);
};

/**
  Hook to turn an array of prepared objects with category and subcategory into an
  object that represent the tree of categories, subcategories, and items.
  @param {Array} items Array of items with `category` and `subcategory`
  @param {Object} order An object indicating the sort order. Must be an object with string keys and array values
**/
export const useTree = (items, order) => {
  return useMemo(() => {
    let tree = {};

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!tree[item.category]) {
        tree[item.category] = {};
      }

      if (!tree[item.category][item.subcategory]) {
        tree[item.category][item.subcategory] = [];
      }

      tree[item.category][item.subcategory].push(item);
    }

    if (order) {
      // Sort main categories
      const keys = Object.keys(order);
      tree = sortObject(tree, keys);
      // Sort subcategories
      for (let i = 0; i < keys.length; i++) {
        tree[keys[i]] = sortObject(tree[keys[i]], order[keys[i]]);
      }
    }

    return tree;
  }, [items, order]);
};

/**
  Hook to filter items in an array based on a specific string attribute
  such as those used in reference and examples.
  @param {Array} array The array of items
  @param {string} searchTerm The search term string entered by the user
  @param {string[]} searchKeys Array of strings with keys to search
**/
export const useFilteredArray = (array, searchTerm, searchKeys = []) => {
  return useMemo(() => {
    if (!searchTerm || searchTerm === '') {
      return array;
    }

    const filtered = [];
    const terms = searchTerm.split(' ');

    loop1: for (let i = 0; i < array.length; i++) {
      const item = array[i];
      for (let j = 0; j < terms.length; j++) {
        const term = terms[j];
        for (let k = 0; k < searchKeys.length; k++) {
          const key = searchKeys[k];
          if (
            item[key] &&
            typeof item[key].toString === 'function' &&
            item[key].toString().toLowerCase().includes(term.toLowerCase())
          ) {
            filtered.push(item);
            continue loop1;
          }
        }
      }
    }

    return filtered;
  }, [array, searchTerm, searchKeys]);
};

/**
  Hook to filter items in an object tree of categories, subcategories, and items
  such as those used in reference and examples.
  @param {object} tree The tree object
  @param {string} searchTerm The search term string entered by the user
**/
export const useFilteredTree = (tree, searchTerm, searchKey = 'search') => {
  return useMemo(() => {
    if (!searchTerm || searchTerm === '') {
      return tree;
    }

    const filtered = {};
    const terms = searchTerm.split(' ');

    for (const category in tree) {
      filtered[category] = {};
      for (const subcategory in tree[category]) {
        const items = tree[category][subcategory];
        const filteredItems = [];
        itemLoop: for (let i = 0; i < items.length; i++) {
          for (let j = 0; j < terms.length; j++) {
            if (
              items[i][searchKey].toLowerCase().includes(terms[j].toLowerCase())
            ) {
              filteredItems.push(items[i]);
              continue itemLoop;
            }
          }
        }
        // Only add subcategory if there are any filtered items
        if (filteredItems.length > 0) {
          filtered[category][subcategory] = filteredItems;
        }
      }

      // Remove category if there are no subcategories
      if (Object.keys(filtered[category]).length === 0) {
        delete filtered[category];
      }
    }

    return filtered;
  }, [tree, searchTerm, searchKey]);
};

/**
  Simple hook to sort an tree based on given a attribute
  @param {Object} tree Tree of objects that own the given attribute
  @param {string} attr Atribute name
  @param {boolean} sort If true, the tree is sorted by the attribute
**/
export const useTreeSort = (tree, attr, sort) => {
  return useMemo(() => {
    if (!sort) {
      return tree;
    }
    const sortedTree = {};
    Object.keys(tree).forEach((category) => {
      if (!sortedTree[category]) {
        sortedTree[category] = {};
      }
      Object.keys(tree[category]).forEach((subcategory) => {
        const sorted = [];
        for (let i = 0; i < tree[category][subcategory].length; i++) {
          sorted[tree[category][subcategory][i][attr]] =
            tree[category][subcategory][i];
        }

        sortedTree[category][subcategory] = sorted;
      });
    });
    return sortedTree;
  }, [tree, attr, sort]);
};

export const useHeight = (scrolled) => {
  const [height, setHeight] = useState(0);
  const [node, setNode] = useState(null);

  const ref = useCallback((node) => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measureHeight = () =>
        window.requestAnimationFrame(() =>
          setHeight(node.getBoundingClientRect().height)
        );

      window.addEventListener('resize', measureHeight);
      window.addEventListener('scroll', measureHeight);

      return () => {
        window.removeEventListener('resize', measureHeight);
        window.removeEventListener('scroll', measureHeight);
      };
    }
  }, [node, scrolled]);

  return [ref, height];
};

// A hook that returns the window size, throttled by requestAnimationFrame
// defaultWidth and defaultHeight are the values used for win on SSR.
export const useWindowSize = (defaultWidth = null, defaultHeight = null) => {
  const [win, setWin] = useState([defaultWidth, defaultHeight]);
  const handleResize = () => {
    window.requestAnimationFrame(() => {
      setWin(getWin());
    });
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, []);
  return win;
};

/**
  A hook that lets us use IntersectionObserver
  Source: https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
**/
export const useIntersect = (root, rootMargin, threshold = 0) => {
  const [appearedOnScreen, setAppearedOnScreen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAppearedOnScreen(true);
        } else {
          setAppearedOnScreen(false);
        }
      },
      {
        root,
        rootMargin,
        threshold
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [root, rootMargin, threshold, setAppearedOnScreen]);

  return [ref, appearedOnScreen];
};

/**
  Hook to handle sidebar functionality.
  - Set as null  as default but shows it when the page renders
    in the browser if the screen is wider than 960.
  - If state is set externally, persist with sessionStorage
**/

// this is only true on the first load
let firstRun = true;

export const useSidebar = (_key = '') => {
  const key = `showSidebar-${_key}`;

  // check if the sidebar should be shown
  // based on window width or user preference
  // returns null if running on the server
  // or for the very first time in the browser
  const shouldShowSidebar = useCallback((key) => {
    if (firstRun) {
      firstRun = false;
      return null;
    }
    const [winWidth] = getWin();
    const isMobile = winWidth < 960;
    const isHidden = sessionStorage && sessionStorage.getItem(key) === 'false';
    return !(isMobile || isHidden);
  }, []);

  const [showSidebar, setShowSidebar] = useState(shouldShowSidebar(key));

  useEffect(() => {
    setShowSidebar(shouldShowSidebar(key));
  }, [key, shouldShowSidebar]);

  // Make function that both updates the sidebar and saves to sessionStorage
  const setShowSidebarMemo = useCallback(
    (value) => {
      if (window.sessionStorage) {
        sessionStorage.setItem(key, value);
      }
      setShowSidebar(value);
    },
    [key, setShowSidebar]
  );

  return [showSidebar, setShowSidebarMemo];
};

/**
  Hook to filter a list of .pde files by overwriting the english
  pde files with the locale pde files. Optionally, you can pass in
  a name of the PDE file you want to sort first. This hook expects both
  the english and the translated pdes to be present in the nodes.
**/
export const usePdes = (nodes, locale, name) => {
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
        if (name && pde.name === name) {
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
  A hook that takes two arrays of nodes with name and childJson fields
  and merges the childJson based on the language. The merge strategy is:
  - Select all the translation items
  - Merge the english content into each of the translation items
  The result is that if an item is not translated, it's not in the result.
**/
export const useTranslations = (locale, english, translation) => {
  return useMemo(() => {
    // Otherwise, merge away!
    const merged = [];
    for (let i = 0; i < translation.length; i++) {
      let englishItem = null;
      for (let j = 0; j < english.length; j++) {
        if (translation[i].name === english[j].name) {
          englishItem = english[j];
        }
      }
      if (locale !== 'en' && englishItem !== null) {
        merged.push({
          ...englishItem.childJson,
          ...translation[i].childJson
        });
      } else {
        merged.push(translation[i].childJson);
      }
    }

    return merged;
  }, [locale, english, translation]);
};

/**
  A hook that takes two arrays of nodes with name and childJson fields
  and merges the childJson based on the language. The merge strategy is:
  - Select all the english items
  - Merge the translated content into each of the english items
  The result is that if an item still exists in the english version even if not translated.
**/
export const useTranslationsWithEnglishBase = (
  locale,
  english,
  translation
) => {
  return useMemo(() => {
    const merged = [];

    for (let i = 0; i < english.length; i++) {
      let translatedItem = null;
      for (let j = 0; j < translation.length; j++) {
        if (english[i].name === translation[j].name) {
          translatedItem = translation[j];
        }
      }
      if (locale !== 'en' && translatedItem != null) {
        merged.push({
          ...english[i].childJson,
          ...translatedItem.childJson
        });
      } else {
        merged.push(english[i].childJson);
      }
    }

    return merged;
  }, [locale, english, translation]);
};
