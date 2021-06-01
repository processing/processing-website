import React, { useEffect, memo } from 'react';

import { useIntersect } from '../../hooks';

const H2 = ({ children, id, setCurrent }) => {
  const [ref, appearedOnScreen] = useIntersect();

  useEffect(() => {
    if (appearedOnScreen) {
      setCurrent(id);
    }
  }, [appearedOnScreen, setCurrent, id]);

  return (
    <h2 ref={ref} id={id}>
      {children}
    </h2>
  );
};

export default memo(H2);
