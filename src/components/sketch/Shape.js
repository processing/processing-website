import React, { useState } from 'react';
import Draggable from './Draggable';
import css from './Shape.module.css';

const Shape = (props) => {
  const {
    shape,
    shapesInx,
    rangeX,
    rangeY,
    onMouseEnter,
    onMouseLeave,
    onDraggingStart,
    onDraggingEnd,
    tabIndex,
  } = props;
  const [shapeClass, setShapeClass] = useState(true);

  let draggable = [];

  const blurRest = (e, value) => {
    setShapeClass(!value);
  };

  const handleDraggingStart = (subindex) => {
    onDraggingStart(shapesInx, subindex);
  };

  const handleDraggingEnd = () => {
    onDraggingEnd(shapesInx);
  };

  if (shape.line === true) {
    shape.pos.forEach((p, index) => {
      if (index < 2 || index > 5) {
        draggable.push(
          <Draggable
            key={index}
            onChange={props.onChange}
            value={shape.pos[index]}
            path={['shapes', shapesInx, 'pos', index]}
            range={index % 2 === 0 ? rangeX : rangeY}
            blurRest={blurRest}
            tabIndex={tabIndex}
          />
        );
        draggable.push(' * u, ');
      }
    });
    draggable.pop();
    draggable.push(' * u');
  } else {
    shape.pos.forEach((p, index) => {
      draggable.push(
        <Draggable
          key={index}
          index={index}
          onChange={props.onChange}
          onDraggingStart={handleDraggingStart}
          onDraggingEnd={handleDraggingEnd}
          range={index % 2 === 0 ? rangeX : rangeY}
          value={shape.pos[index]}
          path={['shapes', shapesInx, 'pos', index]}
          blurRest={blurRest}
          tabIndex={tabIndex}
        />
      );
      draggable.push(' * u, ');
    });
    draggable.pop();
    draggable.push(' * u');
  }

  return (
    <span
      role={'button'}
      tabIndex={tabIndex}
      className={shapeClass ? css.root : css.blur}
      onMouseEnter={() => onMouseEnter(shapesInx)}
      onMouseLeave={() => onMouseLeave(shapesInx)}>
      {'  '}
      <span className="hljs-built_in">{shape.line ? 'line' : 'bezier'}</span>(
      {draggable})
    </span>
  );
};

export default Shape;
