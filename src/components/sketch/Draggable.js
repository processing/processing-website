import React, { useState, useEffect, memo } from 'react';
import { scale, round } from '../../utils/sketch';
import { map } from '../../utils';
import classnames from 'classnames';
import css from './Draggable.module.css';

const dragArea = 250;

/**
  We pass the idx to the component in order to be able to memo the handler
  functions so the interactive sketch renders faster
**/
const Draggable = ({
  value,
  index = null,
  min,
  max,
  isInteger = true,
  className,
  onChange,
  onDraggingStart,
  onDraggingEnd,
  tabIndex
}) => {
  const [draggingInfo, setDraggingInfo] = useState(null);

  useEffect(() => {
    if (draggingInfo) {
      const handleMouseUp = (e) => {
        setDraggingInfo(null);
        if (onDraggingEnd) {
          onDraggingEnd(index);
        }
      };

      const handleMouseMove = (e) => {
        if (draggingInfo) {
          const val = map(
            e.screenX - draggingInfo.startX,
            draggingInfo.dragMin,
            draggingInfo.dragMax,
            min,
            max
          );
          const t = isInteger ? Math.round(val) : round(val, 2);
          index === null ? onChange(t) : onChange(index, t);
        }
      };

      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [draggingInfo, index, isInteger, onDraggingEnd, min, max]);

  const registerMove = (e) => {
    const ratio = value / (max - min);
    setDraggingInfo({
      startX: e.screenX,
      dragMin: -(dragArea * ratio),
      dragMax: dragArea * (1 - ratio)
    });
    if (onDraggingStart) {
      onDraggingStart(index);
    }
  };

  const deregisterMove = (e) => {
    setDraggingInfo(null);
  };

  return (
    <span
      role={'button'}
      aria-label={'change position'}
      tabIndex={tabIndex}
      className={classnames(css.root, className, {
        [css.dragging]: draggingInfo
      })}
      onMouseDown={registerMove}
      onMouseUp={deregisterMove}>
      {value}
    </span>
  );
};

export default memo(Draggable);
