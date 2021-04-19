import React, { useState, memo } from 'react';
import Draggable from './Draggable';
import css from './Color.module.css';
import { rgbToHex, hexToRgb } from '../../utils/editor';

const Color = ({ color, onChange, tabIndex }) => {
  const [colorClass, setColorClass] = useState(true);

  const blurRest = (e, val) => {
    setColorClass(!val);
  };

  const handleChange = (idx, val) => {
    console.log('VAL', idx, val);
    const newColor = color.slice();
    newColor[idx] = val;
    onChange(newColor);
  };

  return (
    <span className={colorClass ? css.root : css.blur}>
      <Draggable
        onChange={(val) => handleChange(0, val)}
        min={0}
        max={255}
        value={color[0]}
        tabIndex={tabIndex}
      />
      ,&nbsp;
      <Draggable
        onChange={(val) => handleChange(1, val)}
        min={0}
        max={255}
        value={color[1]}
        tabIndex={tabIndex}
      />
      ,&nbsp;
      <Draggable
        onChange={(val) => handleChange(2, val)}
        min={0}
        max={255}
        value={color[2]}
        tabIndex={tabIndex}
      />
      <input
        type="color"
        className={css.color}
        value={rgbToHex(color)}
        aria-label="Choose color"
        tabIndex={tabIndex}
      />
    </span>
  );
};

// onChange={(e) =>
//   //onChange(e, ['shapes', shapesInx, 'color'], hexToRgb(e.target.value))
// }

export default memo(Color);
