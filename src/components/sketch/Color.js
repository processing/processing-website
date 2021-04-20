import React, { useState, useCallback, memo } from 'react';
import Draggable from './Draggable';
import css from './Color.module.css';
import { rgbToHex, hexToRgb } from '../../utils/sketch';

/**
  We pass the shapeIndex to the component in order to be able to memo the handler
  functions so the interactive sketch renders faster
**/
const Color = ({
  color,
  shapeIndex,
  onChangeShape,
  tabIndex,
  draggableClassName
}) => {
  const [colorClass, setColorClass] = useState(true);

  const blurRest = (e, val) => {
    setColorClass(!val);
  };

  const handleChange = (idx, val) => {
    const newColor = color.slice();
    newColor[idx] = val;
    onChangeShape(shapeIndex, 'color', newColor);
  };

  return (
    <span className={colorClass ? css.root : css.blur}>
      <Draggable
        className={draggableClassName}
        onChange={handleChange}
        min={0}
        max={255}
        index={0}
        value={color[0]}
        tabIndex={tabIndex}
      />
      ,&nbsp;
      <Draggable
        className={draggableClassName}
        onChange={handleChange}
        min={0}
        max={255}
        index={1}
        value={color[1]}
        tabIndex={tabIndex}
      />
      ,&nbsp;
      <Draggable
        className={draggableClassName}
        onChange={handleChange}
        min={0}
        max={255}
        index={2}
        value={color[2]}
        tabIndex={tabIndex}
      />
      <input
        type="color"
        className={css.color}
        value={rgbToHex(color)}
        aria-label="Choose color"
        tabIndex={tabIndex}
        onChange={(e) =>
          onChangeShape(shapeIndex, 'color', hexToRgb(e.target.value))
        }
      />
    </span>
  );
};

export default memo(Color);
