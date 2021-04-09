import React, { useEffect, memo } from 'react';
import slugify from 'slugify';

import { useIntersect } from '../../hooks';

const H2 = ({ children, setCurrent }) => {
  const [ref, appearedOnScreen] = useIntersect({});
  const slug = slugify(children, { lower: true, remove: /[*+~.()'"!:@]/g });

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
