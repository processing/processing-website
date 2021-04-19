import React, { Fragment, useEffect, memo } from 'react';
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
    strokeWeight,
    isVisible,
    onChange,
    onChangeShape,
    onMouseEnterShape,
    onMouseLeaveShape,
    onDraggingShapeStart,
    onDraggingShapeEnd,
  } = props;
  return (
    <div className={css.root}>
      <Line num={1}>
        <span className="hljs-datatype">int</span> u = 60;
      </Line>
      <ShowGrid showGrid={showGrid} isVisible={isVisible} onChange={onChange} />
      <Line num={3} />
      <Setup isVisible={isVisible} />
      <Line num={7} />
      <details open>
        <summary tabIndex={isVisible ? 0 : -1}>
          <Line num={8}>
            <span className="hljs-keyword">void</span>{' '}
            <span className="hljs-title">draw</span>
            {`() {`}
          </Line>
          <Folded />
        </summary>
        <Line num={9}>
          {`  `}
          <span className="hljs-built_in">background</span>
          {`(255);`}
        </Line>
        <Line num={10}>{`  if (showGrid) drawGrid();`}</Line>
        <Line num={11}>
          {`  `}
          <span className="hljs-built_in">strokeCap</span>(
          <span className="hljs-constant">SQUARE</span>);
        </Line>
        <StrokeWeight
          strokeWeight={strokeWeight}
          onChange={onChange}
          isVisible={isVisible}
        />
        <Line num={13} />
        {shapes.map((shape, i) => {
          const num = 14 + i * 3;
          return (
            <Fragment key={`shape-block-${i}`}>
              <Line num={num}>
                {`  `}
                <span className="hljs-built_in">stroke</span>(
                <Color
                  onChange={(color) => onChangeShape(i, 'color', color)}
                  color={shapes[i].color}
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
                  rangeX={{ min: 0, max: 8 }}
                  rangeY={{ min: 0, max: 8 }}
                  tabIndex={isVisible ? 0 : -1}
                />
                ;
              </Line>
              {i < shapes.length - 1 && <Line num={num + 2} />}
            </Fragment>
          );
        })}
        <Line num={22}>}</Line>
      </details>
      <BottomLines isVisible={isVisible} />
    </div>
  );
};

const ShowGrid = memo(({ showGrid, isVisible, onChange }) => {
  return (
    <Line num={2}>
      <span className="hljs-datatype">boolean</span> showGrid ={' '}
      <button
        name="showGrid"
        className={classnames(css.interactive, 'hljs-keyword')}
        value={showGrid}
        onClick={(e) => onChange(e, 'showGrid', !showGrid)}
        tabIndex={isVisible ? 0 : -1}>
        {showGrid ? 'true' : 'false'}
      </button>
      ;
    </Line>
  );
});

const Setup = memo(({ isVisible }) => {
  return (
    <details open>
      <summary tabIndex={isVisible ? 0 : -1}>
        <Line num={4}>
          <span className="hljs-keyword">void</span>{' '}
          <span className="hljs-title">setup</span>
          {`() {`}
        </Line>
        <Folded />
      </summary>
      <Line num={5}>
        {`  `}
        <span className="hljs-built_in">size</span>
        {`(600, 600);`}
      </Line>
      <Line num={6}>{`}`}</Line>
    </details>
  );
});

const StrokeWeight = memo(({ strokeWeight, onChange, isVisible }) => {
  return (
    <Line num={12}>
      {`  `}
      <span className="hljs-built_in">strokeWeight</span>(
      <Draggable
        className={css.interactive}
        value={strokeWeight}
        range={{ min: 0.5, max: 2 }}
        path={['strokeWeight']}
        isInteger={false}
        onChange={onChange}
        tabIndex={isVisible ? 0 : -1}
      />
      {' * u);'}
    </Line>
  );
});

const MiddleLines = memo(() => {});

const BottomLines = memo(({ isVisible }) => {
  return (
    <>
      <Line num={23} />
      <details>
        <summary tabIndex={isVisible ? 0 : -1}>
          <Line num={24}>
            <span className="hljs-keyword">void</span>
            {` drawGrid() {`}
          </Line>
          <Folded />
        </summary>
        <Line num={25}>
          {`  `}
          <span className="hljs-built_in">strokeWeight</span>(1);
        </Line>
        <Line num={26}>
          {`  `}
          <span className="hljs-built_in">noFill</span>();
        </Line>
        <Line num={27}>
          {`  `}
          <span className="hljs-built_in">stroke</span>(200);
        </Line>
        <Line num={28}>
          {`  `}
          <span className="hljs-loop">for</span>(
          <span className="hljs-datatype">int</span>{' '}
          {`col = 0; col < 9; col++) {`})
        </Line>
        <Line num={29}>
          {`    `}
          <span className="hljs-built_in">line</span>
          {`(col * u, 0, col * u, 8 * u);`}
        </Line>
        <Line num={30}>{`  }`}</Line>
        <Line num={31}>
          {`  `}
          <span className="hljs-loop">for</span>(
          <span className="hljs-datatype">int</span>{' '}
          {`row = 0; row < 9; row++) {`})
        </Line>
        <Line num={32}>
          {`    `}
          <span className="hljs-built_in">line</span>
          {`(0, row * u, 8 * u, row * u);`}
        </Line>
        <Line num={33}>{`  }`}</Line>
        <Line num={34}>{`}`}</Line>
      </details>
    </>
  );
});

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
