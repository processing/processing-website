import React, { memo, useEffect, useState } from 'react';
import { slugify } from '../utils';
import * as css from './Banner.module.css';

export const Banner = ({ text, url }) => {
  const [visible, setVisible] = useState(false);
  const key = slugify(text);

  const hide = () => {
    if (window.localStorage) {
      window.localStorage.setItem(
        `banner-${key}`,
        JSON.stringify({
          visible: false
        })
      );
    }
    setVisible(false);
  };

  // Only show the banner if this text has not been dismissed yet
  useEffect(() => {
    if (window.localStorage) {
      const savedState = window.localStorage.getItem(`banner-${key}`);
      if (savedState) {
        setVisible(JSON.parse(savedState).visible);
      } else {
        setVisible(true);
      }
    }
  }, [key]);

  return visible ? (
    <div className={css.root}>
      <a className={css.link} href={url} target="_blank" rel="noreferrer">
        {text}
      </a>
      <button className={css.close} onClick={hide}>
        x
      </button>
    </div>
  ) : null;
};

export default memo(Banner);
