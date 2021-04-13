import React, { Fragment, useEffect } from 'react';
import classnames from 'classnames';

import Draggable from './Draggable';
import Color from './Color';
import Shape from './Shape';
import Line from './Line';

import css from './SketchCode.module.css';

const SketchCode = (props) => {
  const {
    width,
    height,
    unit,
    showGrid,
    shapes,
    strokeWidth,
    isVisible,
    onMouseEnterShape,
    onMouseLeaveShape,
    onDraggingShapeStart,
    onDraggingShapeEnd,
    onChange,
  } = props;
  const cols = Math.floor(width / unit);
  const rows = Math.floor(height / unit);

  useEffect(() => {
    shapes.forEach((shape, index) => {
      shape.pos.forEach((p, subindex) => {
        if (p > rows && subindex % 2 === 1) {
          onChange(
            'Adjusting strokes to rows',
            ['shapes', index, 'pos', subindex],
            rows
          );
        }
      });
    });
  }, [height, unit, onChange, rows, shapes]);

  useEffect(() => {
    shapes.forEach((shape, index) => {
      shape.pos.forEach((p, subindex) => {
        if (p > cols && subindex % 2 === 0) {
          onChange(
            'Adjusting strokes to cols',
            ['shapes', index, 'pos', subindex],
            cols
          );
        }
      });
    });
  }, [width, unit, cols, onChange, shapes]);

  return (
    <div className={css.root}>
      <Line num={1}>
        <span className="hljs-datatype">int</span> w = {width};
      </Line>
      <Line num={2}>
        <span className="hljs-datatype">int</span> h = {height};
      </Line>
      <Line num={3}>
        <span className="hljs-datatype">int</span> u ={' '}
        <Draggable
          name="unit"
          className={css.showGrid}
          value={unit}
          range={{ min: 20, max: 80 }}
          path={['unit']}
          onChange={onChange}
          tabIndex={isVisible ? 0 : -1}></Draggable>
        ;
      </Line>
      <Line num={4}>
        <span className="hljs-datatype">boolean</span> showGrid ={' '}
        <button
          name="showGrid"
          className={classnames(css.showGrid, 'hljs-keyword')}
          value={showGrid}
          onClick={(e) => onChange(e, ['showGrid'], !showGrid)}
          tabIndex={isVisible ? 0 : -1}>
          {showGrid ? 'true' : 'false'}
        </button>
        ;
      </Line>
      <Line num={5} />
      <details>
        <summary tabIndex={isVisible ? 0 : -1}>
          <Line num={6}>{`void setup() {`}</Line>
          <Folded />
        </summary>
        <Line num={7}>{`  size(width, height);`}</Line>
        <Line num={8}>{`  background(255, 255, 255);`}</Line>
        <Line num={9}>{`  if (showGrid) drawGrid();`}</Line>
        <Line num={10}>{`}`}</Line>
      </details>
      <Line num={11} />
      <details open>
        <summary tabIndex={isVisible ? 0 : -1}>
          <Line num={12}>{`void draw() {`}</Line>
          <Folded />
        </summary>
        <Line num={13}>{`  if (showGrid) drawGrid();`}</Line>
        <Line num={14}>{`  strokeCap(SQUARE);`}</Line>
        <Line num={15}>
          {`  strokeWeight(`}
          <Draggable
            className={css.showGrid}
            value={strokeWidth}
            range={{ min: 0.5, max: 2 }}
            path={['strokeWidth']}
            isInteger={false}
            onChange={onChange}
            tabIndex={isVisible ? 0 : -1}
          />
          {' * u);'}
        </Line>
        <Line num={16} />
        {shapes.map((shape, i) => {
          const num = 17 + i * 3;
          return (
            <Fragment key={`shape-block-${i}`}>
              <Line num={num}>
                {`  stroke(`}
                <Color
                  onChange={onChange}
                  shapes={shapes}
                  shapesInx={i}
                  tabIndex={isVisible ? 0 : -1}
                />
                );
              </Line>
              <Line num={num + 1}>
                <Shape
                  onMouseEnter={onMouseEnterShape}
                  onMouseLeave={onMouseLeaveShape}
                  onDraggingStart={onDraggingShapeStart}
                  onDraggingEnd={onDraggingShapeEnd}
                  onChange={onChange}
                  shape={shape}
                  shapesInx={i}
                  rangeX={{ min: 0, max: cols }}
                  rangeY={{ min: 0, max: rows }}
                  tabIndex={isVisible ? 0 : -1}
                />
                ;
              </Line>
              <Line num={num + 2} />
            </Fragment>
          );
        })}
      </details>
      <Line num={26} />
      <details>
        <summary tabIndex={isVisible ? 0 : -1}>
          <Line num={27}>{`void drawGrid() {`}</Line>
          <Folded />
        </summary>
        <Line num={28}>{`  strokeWeight(1);`}</Line>
        <Line num={29}>{`  noFill();`}</Line>
        <Line num={30}>{`  stroke(200, 200, 200);`}</Line>
        <Line num={31}>{`  for (int col = 0; col < cols + 1; col++) {`}</Line>
        <Line num={32}>{`    line(col * u, 0, col * u, cols * u);`}</Line>
        <Line num={33}>{`  }`}</Line>
        <Line num={34}>{`  for (int row = 0; row < rows + 1; row++) {`}</Line>
        <Line num={35}>{`    line(0, row * u, rows * u, row * u);`}</Line>
        <Line num={36}>{`  }`}</Line>
        <Line num={37}>{`}`}</Line>
      </details>
    </div>
  );
};

// <Button
//   className={css.toggleShape}
//   onClick={(e) => onChange(e, ['shapes', i, 'type'], !shape.type)}
//   tabIndex={isVisible ? 0 : -1}>
//   {shape.type ? '/' : '~'}
// </Button>

const Folded = () => {
  return (
    <div className={css.folded}>
      <span>···</span>
      {`}`}
    </div>
  );
};

export default SketchCode;
