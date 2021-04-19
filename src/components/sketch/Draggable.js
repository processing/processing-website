import React, { useState, useEffect, memo } from 'react';
import { scale, round } from '../../utils/editor';
import classnames from 'classnames';
import css from './Draggable.module.css';

const Draggable = (props) => {
  const {
    value,
    min,
    max,
    path,
    isInteger = true,
    className,
    onDraggingStart,
    onDraggingEnd,
    index,
    tabIndex,
    onChange,
  } = props;
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    if (dragging) {
      const handleMouseUp = (e) => {
        props.blurRest && props.blurRest(e, false);
        setDragging(false);
        index && onDraggingEnd();
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
            onChange(t);
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
    props.blurRest && props.blurRest(e, true);
    setDragging(e.screenX);
    index && onDraggingStart(index);
  };

  const deregisterMove = (e) => {
    props.blurRest && props.blurRest(e, false);
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
