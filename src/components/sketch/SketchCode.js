import React, { Fragment, useEffect } from 'react';
import classnames from 'classnames';

import Draggable from './Draggable';
import Color from './Color';
import Shape from './Shape';

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
      <Line num={3}>
        <span className="hljs-datatype">int</span> u = 60;
      </Line>
      <Line num={4}>
        <span className="hljs-datatype">boolean</span> showGrid ={' '}
        <button
          name="showGrid"
          className={classnames(css.interactive, 'hljs-keyword')}
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
          <Line num={6}>
            <span className="hljs-keyword">void</span>{' '}
            <span className="hljs-title">setup</span>
            {`() {`}
          </Line>
          <Folded />
        </summary>
        <Line num={7}>
          {`  `}
          <span className="hljs-built_in">size</span>
          {`(600, 600);`}
        </Line>
        <Line num={11}>{`}`}</Line>
      </details>
      <Line num={12} />
      <details open>
        <summary tabIndex={isVisible ? 0 : -1}>
          <Line num={13}>
            <span className="hljs-keyword">void</span>{' '}
            <span className="hljs-title">draw</span>
            {`() {`}
          </Line>
          <Folded />
        </summary>
        <Line num={14}>
          {`  `}
          <span className="hljs-built_in">background</span>
          {`(255);`}
        </Line>
        <Line num={14}>{`  if (showGrid) drawGrid();`}</Line>
        <Line num={15}>
          {`  `}
          <span className="hljs-built_in">strokeCap</span>(
          <span className="hljs-constant">SQUARE</span>);
        </Line>
        <Line num={16}>
          {`  `}
          <span className="hljs-built_in">strokeWeight</span>(
          <Draggable
            className={css.interactive}
            value={strokeWidth}
            range={{ min: 0.5, max: 2 }}
            path={['strokeWidth']}
            isInteger={false}
            onChange={onChange}
            tabIndex={isVisible ? 0 : -1}
          />
          {' * u);'}
        </Line>
        <Line num={17} />
        {shapes.map((shape, i) => {
          const num = 18 + i * 3;
          return (
            <Fragment key={`shape-block-${i}`}>
              <Line num={num}>
                {`  `}
                <span className="hljs-built_in">stroke</span>(
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
              {i < shapes.length - 1 && <Line num={num + 2} />}
            </Fragment>
          );
        })}
      </details>
      <Line num={27}>}</Line>
      <Line num={27} />
      <details>
        <summary tabIndex={isVisible ? 0 : -1}>
          <Line num={28}>
            <span className="hljs-keyword">void</span>
            {` drawGrid() {`}
          </Line>
          <Folded />
        </summary>
        <Line num={29}>
          {`  `}
          <span className="hljs-built_in">strokeWeight</span>(1);
        </Line>
        <Line num={29}>
          {`  `}
          <span className="hljs-built_in">noFill</span>();
        </Line>
        <Line num={29}>
          {`  `}
          <span className="hljs-built_in">stroke</span>(200);
        </Line>
        <Line num={32}>
          {`  `}
          <span className="hljs-loop">for</span>(
          <span className="hljs-datatype">int</span>{' '}
          {`col = 0; col < 9; col++) {`})
        </Line>
        <Line num={33}>
          {`    `}
          <span className="hljs-built_in">line</span>
          {`(col * u, 0, col * u, 8 * u);`}
        </Line>
        <Line num={34}>{`  }`}</Line>
        <Line num={32}>
          {`  `}
          <span className="hljs-loop">for</span>(
          <span className="hljs-datatype">int</span>{' '}
          {`row = 0; row < 9; row++) {`})
        </Line>
        <Line num={36}>
          {`    `}
          <span className="hljs-built_in">line</span>
          {`(0, row * u, 8 * u, row * u);`}
        </Line>
        <Line num={37}>{`  }`}</Line>
        <Line num={38}>{`}`}</Line>
      </details>
    </div>
  );
};

// <Button
//   className={css.toggleShape}
//   onClick={(e) => onChange(e, ['shapes', i, 'line'], !shape.line)}
//   tabIndex={isVisible ? 0 : -1}>
//   {shape.line ? '/' : '~'}
// </Button>

const Line = ({ num, children }) => {
  return (
    <div className={css.line}>
      <span className={css.num}>{num}</span>
      {children}
    </div>
  );
};

const Folded = () => {
  return (
    <div className={css.folded}>
      <span>···</span>
      {`}`}
    </div>
  );
};

export default SketchCode;
