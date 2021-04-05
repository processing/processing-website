import React, { useState } from 'react';
import classnames from 'classnames';

import css from './ToggleButton.module.css';

const ToggleButton = ({ className, onToggle }) => {
  const [toggle, setToggle] = useState(false);
  const style = classnames(css.root, className, style);
  const states = { default: 'off', pressed: 'on' };

  const toggleButton = (e) => {
    setToggle((toggle) => !toggle);
    onToggle && onToggle();
  };

  return (
    <button
      aria-pressed={toggle}
      aria-label={`Toggle button`}
      className={style}
      onClick={(e) => toggleButton(e)}>
      <span className={classnames({ [css.active]: !toggle })}>{'off'}</span>
      <span className={classnames({ [css.active]: toggle })}>{'on'}</span>
    </button>
  );
};

export default ToggleButton;
