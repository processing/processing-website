import React, { useState, memo } from 'react';
import Draggable from './Draggable';
import css from './Shape.module.css';

/**
  We pass the shapeIndex to the component in order to be able to memo the handler
  functions so the interactive sketch renders faster
**/
const Shape = (props) => {
  const {
    draggableClassName,
    shape,
    shapeIndex,
    min,
    max,
    onChangeShape,
    onMouseEnter,
    onMouseLeave,
    onDraggingStart,
    onDraggingEnd,
    tabIndex
  } = props;

  const handleChange = (idx, val) => {
    const newPos = shape.pos.slice();
    newPos[idx] = val;
    onChangeShape(shapeIndex, 'pos', newPos);
  };

  const handleDraggingStart = (subindex) => {
    // onDraggingStart(shapesInx, subindex);
  };

  const handleDraggingEnd = () => {
    // onDraggingEnd(shapesInx);
  };

  const draggable = [];

  for (let i = 0; i < shape.pos.length; i++) {
    draggable.push(
      <Draggable
        key={`shape-pos-${i}`}
        index={i}
        className={draggableClassName}
        onChange={handleChange}
        onDraggingStart={shape.line ? null : handleDraggingStart}
        onDraggingEnd={shape.line ? null : handleDraggingEnd}
        value={shape.pos[i]}
        min={min}
        max={max}
        tabIndex={tabIndex}
      />
    );
    draggable.push(i === shape.pos.length - 1 ? ' * u' : ' * u, ');
  }

  return (
    <span
      role={'button'}
      tabIndex={tabIndex}
      className={css.root}
      onMouseEnter={() => onMouseEnter(999)}
      onMouseLeave={() => onMouseLeave(999)}>
      {'  '}
      <span className="hljs-built_in">{shape.line ? 'line' : 'bezier'}</span>(
      {draggable})
    </span>
  );
};

export default memo(Shape);
