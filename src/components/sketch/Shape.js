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
  } = props;
  const [shapeClass, setShapeClass] = useState(true);
  const [dragging, setDragging] = useState(null);

  let draggable = [];

  const blurRest = (e, value) => {
    setShapeClass(!value);
  };

  const handleDraggingStart = (subindex) => {
    onDraggingStart(shapesInx, subindex);
  };

  const handleDraggingEnd = () => {
    console.log('dragging ended');
    onDraggingEnd(shapesInx);
  };

  if (shape.type === true) {
    draggable.push('line(');
    shape.pos.map((p, index) => {
      if (index < 2 || index > 5) {
        draggable.push(
          <Draggable
            key={index}
            className={css.Draggable}
            onChange={props.onChange}
            value={shape.pos[index]}
            path={['shapes', shapesInx, 'pos', index]}
            range={index % 2 == 0 ? rangeX : rangeY}
            blurRest={blurRest}
          />
        );
        draggable.push(' * u, ');
      }
    });
    draggable.pop();
    draggable.push(' * u)');
  } else {
    draggable.push('bezier(');
    shape.pos.map((p, index) => {
      draggable.push(
        <Draggable
          key={index}
          index={index}
          onChange={props.onChange}
          onDraggingStart={handleDraggingStart}
          onDraggingEnd={handleDraggingEnd}
          range={index % 2 == 0 ? rangeX : rangeY}
          value={shape.pos[index]}
          path={['shapes', shapesInx, 'pos', index]}
          blurRest={blurRest}
        />
      );
      draggable.push(' * u, ');
    });
    draggable.pop();
    draggable.push(' * u)');
  }

  return (
    <span
      className={shapeClass ? css.root : css.blur}
      onMouseEnter={() => onMouseEnter(shapesInx)}
      onMouseLeave={() => onMouseLeave(shapesInx)}>
      {draggable}
    </span>
  );
};

export default Shape;
