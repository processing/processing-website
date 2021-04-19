import React, { Fragment, useState, useMemo } from 'react';
import classnames from 'classnames';

import Button from '../Button';

import css from './SketchGraphic.module.css';

const SketchGraphic = (props) => {
  const {
    showGrid,
    width,
    height,
    shapes,
    strokeWeight,
    onClick,
    isCodeVisible,
  } = props;

  // -2 in order to make the strokes fully visible
  const unit = (width - 2) / 8;

  const grid = useMemo(() => {
    if (!showGrid) {
      return null;
    }
    const grid = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        grid.push(
          <rect
            key={`grid-${i}-${j}`}
            x={i * unit}
            y={j * unit}
            width={unit}
            height={unit}
          />
        );
      }
    }
    return grid;
  }, [showGrid, unit]);

  const firstHandler = (shape, index, color) => (
    <g key={`handler-${index}-tocp1`}>
      <line
        key={`line-${index}-tocp1`}
        x1={shape.pos[0] * unit}
        y1={shape.pos[1] * unit}
        x2={shape.pos[2] * unit}
        y2={shape.pos[3] * unit}
        stroke={color}
        strokeDasharray="4"
      />
      <circle
        key={`circle-${index}-cp1`}
        cx={shape.pos[2] * unit}
        cy={shape.pos[3] * unit}
        r={4}
        fill={color}
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
      style={{ width, height }}>
      <div className={css.ui}>
        <Button className={css.button} onClick={onClick} size={'large'}>
          {isCodeVisible ? 'Hide code' : 'Play'}
        </Button>
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(1, 1)`}>
          <g className={css.grid}>{grid}</g>
          {shapes.map((shape, index) => {
            const color = `rgb(${shape.color[0]},${shape.color[1]},${shape.color[2]})`;

            let dPoints = shape.pos.map((x) => x * unit);

            if (shape.pos.length > 4) {
              dPoints.splice(0, 0, 'M');
              dPoints.splice(3, 0, 'C');
            }

            return shape.line ? (
              <line
                key={index}
                x1={shape.pos[0] * unit}
                y1={shape.pos[1] * unit}
                x2={shape.pos[6] * unit}
                y2={shape.pos[7] * unit}
                stroke={color}
                strokeWidth={strokeWeight * unit}
              />
            ) : (
              <Fragment key={index}>
                <path
                  key={index}
                  d={dPoints.join(' ')}
                  stroke={color}
                  fill="none"
                  strokeWidth={strokeWeight * unit}
                />
                {handlers(shape, index, color)}
              </Fragment>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default SketchGraphic;
