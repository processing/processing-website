import React from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import * as css from './Footer.module.css';
import * as grid from '../styles/grid.module.css';

const Footer = ({ withSidebar }) => {
  const intl = useIntl();
  return (
    <footer
      className={classnames(grid.grid, css.root, {
        [css.withSidebar]: withSidebar
      })}>
      <div className={classnames(grid.col, css.contactWrapper)}>
        <h3>{intl.formatMessage({ id: 'contactUs' })}</h3>
        <p>{intl.formatMessage({ id: 'contactUsDescription' })}</p>
        <a href="mailto:hello@processing.org">hello@processing.org</a>
      </div>
      <div className={classnames(grid.col, css.socialmediaWrapper)}>
        <ul>
          <li>
            <a href={'http://github.com/processing/'} target="_blank" rel="noreferrer">GitHub</a>
          </li>
          <li>
            <a href={'https://bsky.app/profile/processing.org'} target="_blank" rel="noreferrer">Bluesky</a>
          </li>
          <li>
            <a href={'https://mastodon.social/@processing/'} target="_blank" rel="noreferrer">Mastodon</a>
          </li>
          <li>
            <a href={'https://www.instagram.com/processing_core/'} target="_blank" rel="noreferrer">Instagram</a>
          </li>
          <li>
            <a href={'https://www.facebook.com/people/Processing-Core/61567491443061/'} target="_blank" rel="noreferrer">Facebook</a>
          </li>
          <li>
            <a href={'https://medium.com/@ProcessingOrg'} target="_blank" rel="noreferrer">Medium</a>
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
