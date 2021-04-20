import React, { useState, useEffect, memo } from 'react';
import { scale, round } from '../../utils/sketch';
import classnames from 'classnames';
import css from './Draggable.module.css';

/**
  We pass the idx to the component in order to be able to memo the handler
  functions so the interactive sketch renders faster
**/
const Draggable = (props) => {
  const {
    value,
    index = null,
    min,
    max,
    path,
    isInteger = true,
    className,
    onChange,
    onDraggingStart,
    onDraggingEnd,
    tabIndex
  } = props;
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    if (dragging) {
      const handleMouseUp = (e) => {
        setDragging(false);
        index === null && onDraggingEnd();
      };

      const handleMouseMove = (e) => {
        if (dragging !== null) {
          const diff = scale(
            e.screenX - dragging,
            -120,
            120,
            -(max - min),
            max - min
          );
          const t = isInteger
            ? value + Math.floor(diff)
            : round(value + diff, 2);
          if (t >= min && t <= max) {
            index === null ? onChange(t) : onChange(index, t);
          }
        }
      };

      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [dragging, index, isInteger, onDraggingEnd, path, props, min, max, value]);

  const registerMove = (e) => {
    setDragging(e.screenX);
    index === null && onDraggingStart(index);
  };

  const deregisterMove = (e) => {
    setDragging(null);
  };

  return (
    <span
      role={'button'}
      aria-label={'change position'}
      tabIndex={tabIndex}
      className={classnames(css.parent, className)}
      onMouseDown={registerMove}
      onMouseUp={deregisterMove}>
      <span className={css.arrowLeft}></span>
      <span
        name="pos"
        className={dragging ? css.dragging : css.root}
        onChange={(e) => props.onChange(e, path, e.target.value)}
        value={value}>
        {value}
      </span>
      <span className={css.arrowRight}></span>
    </span>
  );
};

export default memo(Draggable);
