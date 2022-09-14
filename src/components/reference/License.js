import React, { memo } from 'react';
import * as css from './License.module.css';
import { useIntl } from 'react-intl';

const License = () => {
  const intl = useIntl();
  return (
    <div className={css.root}>
      <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
        <img
          alt="Creative Commons License"
          src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
        />
      </a>
      <p>
        {intl.formatMessage({ id:"CCLicenseIntro"})}
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
          {intl.formatMessage({ id:"CCLicense"})}
        </a>
        .
      </p>
    </div>
  );
};

export default memo(License);
