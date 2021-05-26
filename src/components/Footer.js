import React from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import css from './Footer.module.css';

const Footer = ({ withSidebar }) => {
  const intl = useIntl();
  return (
    <footer
      className={classnames(css.root, {
        [css.withSidebar]: withSidebar
      })}>
      <div className={css.contactWrapper}>
        <h3>{intl.formatMessage({ id: 'contactUs' })}</h3>
        <p>{intl.formatMessage({ id: 'contactUsDescription' })}</p>
        <a href="mailto:foundation@processing.org">foundation@processing.org</a>
      </div>
      <div className={css.socialmediaWrapper}>
        <ul>
          <li>
            <a href={'https://twitter.com/ProcessingOrg'}>Twitter</a>
          </li>
          <li>
            <a href={'https://medium.com/@ProcessingOrg'}>Medium</a>
          </li>
          <li>
            <a href={'https://www.instagram.com/processingorg/'}>Instagram</a>
          </li>
          <li>
            <a href={'http://github.com/processing/'}>GitHub</a>
          </li>
        </ul>
        <p
          className={css.disclaimer}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'footer' })
          }}></p>
      </div>
    </footer>
  );
};

export default Footer;
