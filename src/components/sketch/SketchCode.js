import React, { useState, Fragment } from 'react';
import classnames from 'classnames';

import Draggable from './Draggable';
import Color from './Color';
import Shape from './Shape';
import Button from '../Button';

import css from './SketchCode.module.css';

const SketchCode = ({
  width,
  height,
  unit,
  showGrid,
  shapes,
  strokeWeight,
  strokeCap,
  isVisible,
  onChange,
  onChangeShape,
  onResetState
}) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  return (
    <div
      className={classnames(css.root, { [css.blink]: !hasInteracted })}
      onMouseEnter={() => setHasInteracted(true)}>
      <div className={css.numBar}></div>
      <Line num={1}>
        <span className="hljs-datatype">int</span> u = 60;
      </Line>
      <Line num={2}>
        <span className="hljs-datatype">boolean</span> showGrid ={' '}
        <button
          className={classnames(css.interactive, 'hljs-keyword')}
          onClick={(e) => onChange('showGrid', !showGrid)}
          tabIndex={isVisible ? 0 : -1}>
          {showGrid ? 'true' : 'false'}
        </button>
        ;
      </Line>
      <Line num={3} />
      <details open>
        <summary tabIndex={isVisible ? 0 : -1}>
          <Line num={4}>
            <span className="hljs-keyword">void</span>{' '}
            <span className="hljs-title">setup</span>
            {`() {`}
            <Folded />
          </Line>
        </summary>
        <Line num={5}>
          {`  `}
          <span className="hljs-built_in">size</span>
          {`(600, 600);`}
        </Line>
        <Line num={6}>{`}`}</Line>
      </details>
      <Line num={7} />
      <details open>
        <summary tabIndex={isVisible ? 0 : -1}>
          <Line num={8}>
            <span className="hljs-keyword">void</span>{' '}
            <span className="hljs-title">draw</span>
            {`() {`}
            <Folded />
          </Line>
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
          <button
            className={classnames(css.interactive, 'hljs-constant')}
            onClick={(e) => onChange('strokeCap', !strokeCap)}
            tabIndex={isVisible ? 0 : -1}>
            {strokeCap ? 'SQUARE' : 'ROUND'}
          </button>
          );
        </Line>
        <Line num={12}>
          {`  `}
          <span className="hljs-built_in">strokeWeight</span>(
          <Draggable
            className={css.interactive}
            value={strokeWeight}
            min={0.5}
            max={2}
            isInteger={false}
            onChange={(val) => onChange('strokeWeight', val)}
            tabIndex={isVisible ? 0 : -1}
          />
          {' * u);'}
        </Line>
        <Line num={13} />
        {shapes.map((shape, i) => {
          const num = 14 + i * 3;
          return (
            <Fragment key={`shape-block-${i}`}>
              <Line num={num}>
                {`  `}
                <span className="hljs-built_in">stroke</span>(
                <Color
                  draggableClassName={css.interactive}
                  onChangeShape={onChangeShape}
                  color={shapes[i].color}
                  shapeIndex={i}
                  tabIndex={isVisible ? 0 : -1}
                />
                );
              </Line>
              <Line num={num + 1}>
                <Shape
                  shape={shape}
                  shapeIndex={i}
                  onChangeShape={onChangeShape}
                  draggableClassName={css.interactive}
                  min={0}
                  max={8}
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
      <Line num={23} />
      <details>
        <summary tabIndex={isVisible ? 0 : -1}>
          <Line num={24}>
            <span className="hljs-keyword">void</span>
            {` drawGrid() {`}
            <Folded />
          </Line>
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
      <Button
        className={css.reset}
        color="gray"
        size="small"
        onClick={onResetState}>
        Reset
      </Button>
    </div>
  );
};

const Line = ({ num, children }) => {
  return (
    <div className={css.line}>
      <div className={css.num}>{num}</div>
      <div className={css.code}>{children}</div>
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
