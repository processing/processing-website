import React, { memo, useContext } from 'react';
import classnames from 'classnames';

import { useIntl } from 'react-intl';

import { LayoutContext } from '../Layout';

import Character from './Character';
import Button from '../Button';

import * as grid from '../../styles/grid.module.css';
import * as css from './Donate.module.css';

const Donate = () => {
  const { headerScrolled } = useContext(LayoutContext);
  const intl = useIntl();
  return (
    <div
      className={classnames(css.root, grid.col, {
        [css.compact]: headerScrolled
      })}>
      <h3 className={css.text}>
        {intl.formatMessage({ id: 'donateWeNeed' })}
        <br />
        {intl.formatMessage({ id: 'donateYourHelp' })}
      </h3>
      <Character className={css.character} />
      <p className={css.text}>{intl.formatMessage({ id: 'donateHelp' })}</p>
      <Button to="/donate" className={css.donate}>
        {intl.formatMessage({ id: 'donateButton' })}
      </Button>
    </div>
  );
};

export default memo(Donate);
