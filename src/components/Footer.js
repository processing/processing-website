import React from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import * as css from './Footer.module.css';
import * as grid from '../styles/grid.module.css';

import XLogo from '../images/twitter.svg';
import MediumLogo from '../images/medium.svg';
import InstagramLogo from '../images/instagram.svg';
import GithubLogo from '../images/github.svg';

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
        <a href="mailto:foundation@processingfoundation.org">
          foundation@processingfoundation.org
        </a>
      </div>
      <div className={classnames(grid.col, css.socialmediaWrapper)}>
        <ul>
          <li>
            <a
              href={'https://twitter.com/ProcessingOrg'}
              target="_blank"
              rel="noreferrer">
              <span>
                <XLogo />
              </span>
              Twitter
            </a>
          </li>
          <li>
            <a
              href={'https://medium.com/@ProcessingOrg'}
              target="_blank"
              rel="noreferrer">
              <span>
                <MediumLogo />
              </span>
              Medium
            </a>
          </li>
          <li>
            <a
              href={'https://www.instagram.com/processingorg/'}
              target="_blank"
              rel="noreferrer">
              <span>
                <InstagramLogo />
              </span>
              Instagram
            </a>
          </li>
          <li>
            <a
              href={'http://github.com/processing/'}
              target="_blank"
              rel="noreferrer">
              <span>
                <GithubLogo />
              </span>
              GitHub
            </a>
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
