import React, { useState, useEffect, Fragment } from 'react';
import { scale, round } from '../../utils/editor';
import css from './Draggable.module.css';

const Draggable = (props) => {
  const {
    value,
    range,
    path,
    isInteger = true,
    labelBefore,
    labelAfter,
    onDraggingStart,
    onDraggingEnd,
    index,
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
            -(range.max - range.min),
            range.max - range.min
          );
          const t = isInteger
            ? value + Math.floor(diff)
            : round(value + diff, 2);
          if (t >= range.min && t <= range.max) props.onChange(e, path, t);
        }
      };

      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [dragging, index, isInteger, onDraggingEnd, path, props, range, value]);

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
    <Fragment>
      {labelBefore && <span>{labelBefore}</span>}
      <span
        role={'button'}
        tabIndex={'0'}
        className={css.parent}
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
      {labelAfter && <span>{labelAfter}</span>}
    </Fragment>
  );
};

export default Draggable;
