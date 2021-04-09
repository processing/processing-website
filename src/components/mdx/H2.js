import React, { useEffect, memo } from 'react';

import { useSlug } from '../../hooks/tutorials';
import { useIntersect } from '../../hooks';

const H2 = ({ children, setCurrent }) => {
  const [ref, appearedOnScreen] = useIntersect();
  const slug = useSlug(children);

  useEffect(() => {
    if (appearedOnScreen) {
      setCurrent(slug);
    }
  }, [appearedOnScreen, setCurrent, slug]);

  return (
    <h2 ref={ref} id={slug}>
      {children}
    </h2>
  );
};

export default memo(H2);
