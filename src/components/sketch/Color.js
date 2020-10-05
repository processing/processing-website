import React, { useState } from 'react';
import { fromJS } from 'immutable';
import ColorDraggable from './ColorDraggable';
import css from './Color.module.css';
import { rgbToHex, hexToRgb } from './utils';

const Color = (props) => {
  const { shapes, shapesInx } = props;
  const [dragging, setDragging] = useState(null);
  const [colorClass, setColorClass] = useState(true);

  const registerMove = (e) => {
    setDragging(e.screenX);
  };

  const deregisterMove = (e) => {
    setDragging(null);
  };

  const blurRest = (e, value) => {
    setColorClass(!value);
  };

  return (
    <span className={colorClass ? css.root : css.blur}>
      <ColorDraggable
        onChange={props.onChange}
        shape={shapes[shapesInx]}
        shapesInx={shapesInx}
        blurRest={blurRest}
        colorInx={'r'}
      />
      ,&nbsp;
      <ColorDraggable
        onChange={props.onChange}
        shape={shapes[shapesInx]}
        shapesInx={shapesInx}
        blurRest={blurRest}
        colorInx={'g'}
      />
      ,&nbsp;
      <ColorDraggable
        onChange={props.onChange}
        shape={shapes[shapesInx]}
        shapesInx={shapesInx}
        blurRest={blurRest}
        colorInx={'b'}
      />
      <input
        type="color"
        className={css.color}
        onChange={(e) =>
          props.onChange(
            e,
            ['shapes', shapesInx, 'color'],
            hexToRgb(e.target.value)
          )
        }
        value={rgbToHex(shapes[shapesInx].color)}
      />
    </span>
  );
};

export default Color;
