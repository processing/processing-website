import React, { memo } from 'react';
import Draggable from './Draggable';
import classnames from 'classnames';
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

  const handleMouseEnterLine = () => {
    onChangeShape(shapeIndex, 'showHandlers', true);
  };

  const handleMouseLeaveLine = () => {
    onChangeShape(shapeIndex, 'showHandlers', false);
  };

  const handleMouseEnterPoint = (idx) => {
    onChangeShape(shapeIndex, 'showPoint', idx);
  };

  const handleMouseLeavePoint = () => {
    onChangeShape(shapeIndex, 'showPoint', null);
  };

  const handleToggleShape = () => {
    onChangeShape(shapeIndex, 'line', !shape.line);
  };

  const draggable = [];

  for (let i = 0; i < shape.pos.length; i++) {
    if (!shape.line || i < 2 || i > 5) {
      draggable.push(
        <Draggable
          key={`shape-pos-${i}`}
          value={shape.pos[i]}
          index={i}
          className={draggableClassName}
          onChange={handleChange}
          onMouseEnter={handleMouseEnterPoint}
          onMouseLeave={handleMouseLeavePoint}
          onDraggingStart={handleDraggingStart}
          onDraggingEnd={handleDraggingEnd}
          min={min}
          max={max}
          tabIndex={tabIndex}
        />
      );
      draggable.push(i === shape.pos.length - 1 ? ' * u' : ' * u, ');
    }
  }

  return (
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <span
      tabIndex={tabIndex}
      className={css.root}
      onMouseEnter={handleMouseEnterLine}
      onMouseLeave={handleMouseLeaveLine}>
      {'  '}
      <span className={css.breakWhitespace}>
        <button
          className={classnames(draggableClassName, 'hljs-built_in')}
          onClick={handleToggleShape}
          tabIndex={tabIndex}>
          {shape.line ? 'line' : 'bezier'}
        </button>
        ({draggable})
      </span>
    </span>
  );
};

export default memo(Shape);
