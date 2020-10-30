import React, { useState, useEffect } from 'react';
import css from './Draggable.module.css';

const changeColor = (rgb, t) => {
  if (rgb + t < 0) return 0;
  else if (rgb + t > 255) return 255;
  rgb = rgb + t;
  return rgb;
};

const ColorDraggable = (props) => {
  const { shape, shapesInx, colorInx } = props;
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    if (dragging) {
      const handleMouseUp = (e) => {
        props.blurRest(e, false);
        setDragging(false);
      };

      const handleMouseMove = (e) => {
        if (dragging !== null) {
          const t = e.screenX - dragging;
          let newColor;
          switch (colorInx) {
            case 'r':
              newColor = changeColor(shape.color.r, t);
              break;
            case 'g':
              newColor = changeColor(shape.color.g, t);
              break;
            case 'b':
              newColor = changeColor(shape.color.b, t);
              break;
            default:
              break;
          }
          props.onChange(e, ['shapes', shapesInx, 'color', colorInx], newColor);
        }
      };

      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [dragging]);

  const registerMove = (e) => {
    props.blurRest(e, true);
    setDragging(e.screenX);
  };

  const deregisterMove = (e) => {
    props.blurRest(e, false);
    setDragging(null);
  };

  return (
    <span className={css.parent}>
      <span className={css.arrowLeft}></span>
      <span
        role={'button'}
        tabIndex={'0'}
        className={dragging ? css.dragging : css.root}
        onMouseDown={registerMove}
        onMouseUp={deregisterMove}
        onChange={(e) =>
          props.onChange(
            e,
            ['shapes', shapesInx, 'color', colorInx],
            e.target.value
          )
        }
        value={shape.color[colorInx]}>
        {shape.color[colorInx]}
      </span>
      <span className={css.arrowRight}></span>
    </span>
  );
};

export default ColorDraggable;
