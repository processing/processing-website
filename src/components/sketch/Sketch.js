import React, { Fragment, useMemo, useState } from 'react';
import classnames from 'classnames';
import css from './Sketch.module.css';
import Button from './Button';

import grid from '../../styles/grid.module.css';

const gutterSize = 0;

const Sketch = (props) => {
  const {
    showGrid,
    width,
    height,
    unit,
    shapes,
    strokeWidth,
    onClick,
    isVisible,
  } = props;
  const [mouseEntered, setMouseEntered] = useState(false);

  const modules = [];
  const cols = useMemo(() => Math.floor(width / unit), [width, unit]);
  const rows = useMemo(() => Math.floor(height / unit), [height, unit]);

  for (let i = 0; i < cols; i++) {
    modules.push([]);
    for (let j = 0; j < rows; j++) {
      modules[modules.length - 1].push({
        x: gutterSize + i * unit + i * 2 * gutterSize,
        y: gutterSize + j * unit + j * 2 * gutterSize,
        width: unit,
        height: unit,
      });
    }
  }

  let grid = [];
  if (showGrid) {
    for (let i = 0; i < modules.length; i++) {
      for (let j = 0; j < modules[i].length; j++) {
        grid.push(
          <rect
            key={`grid-${i}-${j}`}
            {...modules[i][j]}
            fill="none"
            stroke="#212724"
            opacity="0.1"
          />
        );
      }
    }
  }

  const handleMouseEnter = () => {
    setMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setMouseEntered(false);
  };

  const firstHandler = (shape, index, color) => (
    <g key={`handler-${index}-tocp1`}>
      <circle
        key={`circle-${index}-cp1`}
        cx={shape.pos[2] * unit}
        cy={shape.pos[3] * unit}
        r={4}
        fill={color}
      />
      <line
        key={`line-${index}-tocp1`}
        x1={shape.pos[0] * unit}
        y1={shape.pos[1] * unit}
        x2={shape.pos[2] * unit}
        y2={shape.pos[3] * unit}
        stroke={color}
        strokeDasharray="4"
      />
    </g>
  );

  const secondHandler = (shape, index, color) => (
    <g key={`handler-${index}-tocp2`}>
      <line
        key={`line-${index}-tocp2`}
        x1={shape.pos[6] * unit}
        y1={shape.pos[7] * unit}
        x2={shape.pos[4] * unit}
        y2={shape.pos[5] * unit}
        stroke={color}
        strokeDasharray="4"
      />
      <circle
        key={`circle-${index}-cp2`}
        cx={shape.pos[4] * unit}
        cy={shape.pos[5] * unit}
        r={4}
        fill={color}
      />
    </g>
  );

  const handlers = (shape, index, color) => {
    const { showHandlers, dragging } = shape;
    if (showHandlers)
      return [
        firstHandler(shape, index, color),
        secondHandler(shape, index, color),
      ];
    else if (dragging) {
      switch (dragging) {
        case 2:
          return firstHandler(shape, index, color);
        case 3:
          return firstHandler(shape, index, color);
        case 4:
          return secondHandler(shape, index, color);
        case 5:
          return secondHandler(shape, index, color);
        default:
          return null;
      }
    } else return null;
  };

  return (
    <div
      className={css.root}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width, height }}>
      <div
        className={classnames(css.message, {
          [css.show]: mouseEntered && !isVisible,
        })}>
        <span>Show code</span>
      </div>
      <svg width={width} height={height}>
        {grid}
        {shapes.map((shape, index) => {
          const color =
            'rgb(' +
            shape.color.r +
            ',' +
            shape.color.g +
            ',' +
            shape.color.b +
            ')';
          let dPoints = shape.pos.map((x) => x * unit);
          if (shape.pos.length > 4) {
            dPoints.splice(0, 0, 'M');
            dPoints.splice(3, 0, 'C');
          }

          return shape.type === true ? (
            <line
              key={index}
              x1={shape.pos[0] * unit}
              y1={shape.pos[1] * unit}
              x2={shape.pos[6] * unit}
              y2={shape.pos[7] * unit}
              stroke={color}
              strokeWidth={strokeWidth * unit}
            />
          ) : (
            <Fragment key={index}>
              <path
                key={index}
                d={dPoints.join(' ')}
                stroke={color}
                fill="none"
                strokeWidth={strokeWidth * unit}
              />
              {handlers(shape, index, color)}
            </Fragment>
          );
        })}
      </svg>
    </div>
  );
};

export default Sketch;
