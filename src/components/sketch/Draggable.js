import React, { useState, useEffect, memo } from 'react';
import { round } from '../../utils/sketch';
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
  onMouseEnter,
  onMouseLeave,
  tabIndex
}) => {
  const [draggingInfo, setDraggingInfo] = useState(null);
  const [keyInfo, setKeyInfo] = useState(null);

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

    if (keyInfo) {
      const handleKeyDown = (e) => {
        setKeyInfo(false);
        if (e.keyCode === 39) {
          const val = isInteger ? value + 1 : round(value + 0.1, 2);
          if (val <= max) index === null ? onChange(val) : onChange(index, val);
        } else if (e.keyCode === 37) {
          const val = isInteger ? value - 1 : round(value - 0.1, 2);
          if (val >= min) index === null ? onChange(val) : onChange(index, val);
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [
    draggingInfo,
    index,
    isInteger,
    onChange,
    onDraggingEnd,
    min,
    max,
    keyInfo
  ]);

  const registerMove = (e) => {
    const ratio = (value - min) / (max - min);
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

  const handleMouseEnter = (e) => {
    if (onMouseEnter) {
      onMouseEnter(index);
    }
  };

  const handleMouseLeave = (e) => {
    if (onMouseEnter) {
      onMouseLeave(index);
    }
  };

  const registerKey = (e) => {
    setKeyInfo(true);
  };

  return (
    <span
      role={'button'}
      aria-label={'change position'}
      tabIndex={tabIndex}
      className={classnames(className, css.root, {
        [css.dragging]: draggingInfo
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={registerMove}
      onMouseUp={deregisterMove}
      onKeyDown={registerKey}>
      {value}
    </span>
  );
};

export default memo(Draggable);
