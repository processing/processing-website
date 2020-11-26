import React, {
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
  useState,
} from 'react';
import hljs from 'highlight.js/lib/core';
import processing from 'highlight.js/lib/languages/processing';

hljs.registerLanguage('processing', processing);

export const useHighlight = () => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [ref.current]);

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
