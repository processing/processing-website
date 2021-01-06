import React from 'react';
import { Link } from 'gatsby';

import css from './Contentbar.module.css';
import { useIntl } from 'react-intl';

const Contentbar = (props) => {
  const { content } = props;
  const intl = useIntl();

  return (
    <div className={css.root}>
      <h3>{intl.formatMessage({ id: 'tableOfContents' })}</h3>
      <ul>
        {content.map((item, key) => (
          <li id={item.url} key={key + 'tb'}>
            <Link to={item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contentbar;
