import React, { memo } from 'react';
import Button from '../Button';
import css from './CoolButton.module.css';

const CoolButton = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} size="large" className={css.root}>
      {children}
    </Button>
  );
};

export default memo(CoolButton);
