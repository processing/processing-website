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
    tabIndex
  } = props;

  const handleChange = (idx, val) => {
    const newPos = shape.pos.slice();
    newPos[idx] = val;
    onChangeShape(shapeIndex, 'pos', newPos);
  };

  const handleDraggingStart = (idx) => {
    onChangeShape(shapeIndex, 'dragging', idx);
  };

  const handleDraggingEnd = () => {
    onChangeShape(shapeIndex, 'dragging', null);
  };

  const handleMouseEnter = () => {
    onChangeShape(shapeIndex, 'showHandlers', true);
  };

  const handleMouseLeave = () => {
    onChangeShape(shapeIndex, 'showHandlers', false);
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {'  '}
      <span className="hljs-built_in">{shape.line ? 'line' : 'bezier'}</span>(
      {draggable})
    </span>
  );
};

export default memo(Shape);
