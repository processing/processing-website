import React, { useState } from 'react';
import classnames from 'classnames';

import css from './ToggleButton.module.css';

const ToggleButton = ({
  className,
  onToggle,
  defaultLabel,
  pressedLabel,
  ariaLabel,
}) => {
  const [toggle, setToggle] = useState(false);
  const style = classnames(css.root, className, style);
  const states = {
    default: defaultLabel ? defaultLabel : 'off',
    pressed: pressedLabel ? pressedLabel : 'on',
  };

  const toggleButton = (e) => {
    setToggle((toggle) => !toggle);
    onToggle && onToggle(toggle);
  };

  return (
    <button
      aria-label={ariaLabel}
      aria-pressed={toggle}
      className={style}
      onClick={(e) => toggleButton(e)}>
      <div>
        <span className={classnames({ [css.pressed]: !toggle })}>
          {states.default}
        </span>
        <span className={classnames({ [css.pressed]: toggle })}>
          {states.pressed}
        </span>
      </div>
    </button>
  );
};

export default ToggleButton;
