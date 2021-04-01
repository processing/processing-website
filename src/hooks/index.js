import {
  useEffect,
  useRef,
  useMemo,
  useLayoutEffect,
  useCallback,
  useState,
} from 'react';
import hljs from 'highlight.js/lib/core';
import processing from 'highlight.js/lib/languages/processing';
import { shuffleArray } from '../utils/data';

hljs.registerLanguage('processing', processing);

/**
  Hook to get random items from an array
  @param {Array} arr Array of items
  @param {number} num Number of items to select
**/
export const useRandomArray = (arr, num) => {
  return useMemo(() => {
    const copy = arr.slice();
    shuffleArray(copy);
    return num && num < copy.length ? copy.slice(0, num) : copy;
  }, [arr, num]);
};

export const useHighlight = () => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, []);

  return ref;
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

const getWin = (useWindow) => {
  let width = 1280;
  let height = 800;

  if (useWindow) {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  return { width, height };
};

// A hook that returns the window size, throttled by requestAnimationFrame
export const useWindowSize = () => {
  const [win, setWin] = useState(getWin);
  const handleResize = () => {
    window.requestAnimationFrame(() => {
      setWin(getWin(true));
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
