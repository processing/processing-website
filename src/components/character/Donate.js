import React, { memo, useContext } from 'react';
import classnames from 'classnames';

import { LayoutContext } from '../Layout';

import Character from './Character';
import Button from '../Button';

import grid from '../../styles/grid.module.css';
import css from './Donate.module.css';

const Donate = () => {
  const { headerScrolled } = useContext(LayoutContext);

  return (
    <div
      className={classnames(css.root, grid.col, {
        [css.compact]: headerScrolled
      })}>
      <h3 className={css.text}>
        We need
        <br />
        your help!
      </h3>
      <Character className={css.character} href="/donate" />
      <p className={css.text}>Help us continue with your generosity!</p>
      <Button to="/donate" className={css.donate}>
        Donate
      </Button>
    </div>
  );
};

export default memo(Donate);
