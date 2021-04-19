import React, { memo } from 'react';
import * as css from './ReferenceLicense.module.css';

const License = () => {
  return (
    <div className={css.root}>
      <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
        <img
          alt="Creative Commons License"
          src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
        />
      </a>
      <p>
        {`This work is licensed under a `}
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
          Creative Commons Attribution-NonCommercial-ShareAlike 4.0
          International License
        </a>
        .
      </p>
    </div>
  );
};

export default memo(License);
