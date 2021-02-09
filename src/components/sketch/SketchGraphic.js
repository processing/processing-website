import React, { Fragment, useState } from 'react';
import classnames from 'classnames';

import Button from '../Button';

import css from './SketchGraphic.module.css';

const gutterSize = 0;

const SketchGraphic = (props) => {
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
  const cols = Math.floor(width / unit);
  const rows = Math.floor(height / unit);
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
    if (showHandlers) {
      return [
        firstHandler(shape, index, color),
        secondHandler(shape, index, color),
      ];
    } else if (dragging) {
      if ([2, 3].includes(dragging)) {
        return firstHandler(shape, index, color);
      } else if ([4, 5].includes(dragging)) {
        return secondHandler(shape, index, color);
      }
    }
    return null;
  };

  return (
    <div
      role={'button'}
      tabIndex={'0'}
      className={css.root}
      onClick={onClick}
      onKeyDown={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width, height }}>
      <div
        className={classnames(css.ui, {
          [css.show]: mouseEntered || isVisible,
        })}>
        <Button className={css.button} onClick={onClick} size={'large'}>
          {isVisible ? 'Hide code' : 'Play'}
        </Button>
      </div>
      <svg width={width} height={height}>
        {grid}
        {shapes.map((shape, index) => {
          const { r, g, b } = shape.color;
          const color = `rgb(${r},${g},${b})`;

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

export default SketchGraphic;
