import React, { useEffect, useRef } from 'react';
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
