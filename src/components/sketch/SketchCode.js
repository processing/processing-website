import React, { Fragment, useEffect } from 'react';
import classnames from 'classnames';

import Button from '../Button';
import Draggable from './Draggable';
import Color from './Color';
import Shape from './Shape';

import { useHighlight } from '../../hooks';

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
  useHighlight();

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
    <div className={classnames(css.root, { [css.visible]: isVisible })}>
      <div className={css.code}>
        <div className={css.inCode}>
          <pre>
            int width = {width}; <br />
            int height = {height};<br />
            <code>int unit = </code>
          </pre>
          <Draggable
            name="unit"
            className={css.showGrid}
            value={unit}
            range={{ min: 20, max: 80 }}
            path={['unit']}
            onChange={onChange}
            tabIndex={isVisible ? 0 : -1}></Draggable>
          ;
          <br />
          <pre>
            <code>boolean showGrid = </code>
          </pre>
          <Button
            name="showGrid"
            className={css.showGrid}
            value={showGrid}
            onClick={(e) => onChange(e, ['showGrid'], !showGrid)}
            tabIndex={isVisible ? 0 : -1}>
            {showGrid ? 'true' : 'false'}
          </Button>
          ;
        </div>
        <br />
        <details className={css.details}>
          <summary className={css.summary} tabIndex={isVisible ? 0 : -1}>
            <pre>
              <code>
                {`void setup() {`}
                <span className={css.dots}>{`...`}</span>
              </code>
            </pre>
          </summary>
          <pre>
            <code>
              {`    size(width, height);
    background(255, 255, 255);
    if (showGrid) drawGrid();
  }`}
            </code>
          </pre>
        </details>
        <div className={css.inCode}>
          <pre>
            <code>
              {`
void draw() {
    if (showGrid) drawGrid();
    strokeCap(SQUARE);`}
            </code>
          </pre>
          <div className={css.codeStrokes}>
            <Draggable
              name="strokeWidth"
              className={css.showGrid}
              value={strokeWidth}
              range={{ min: 0.5, max: 2 }}
              path={['strokeWidth']}
              isInteger={false}
              onChange={onChange}
              labelBefore={'strokeWeight('}
              labelAfter={' * u);'}
              tabIndex={isVisible ? 0 : -1}
            />
            {shapes.map((shape, index) => (
              <Fragment key={`shape-block-${index}`}>
                <br />
                <br />
                stroke(
                <Color
                  onChange={onChange}
                  shapes={shapes}
                  shapesInx={index}
                  tabIndex={isVisible ? 0 : -1}
                />
                );
                <br />
                <Button
                  className={css.toggleShape}
                  onClick={(e) =>
                    onChange(e, ['shapes', index, 'type'], !shape.type)
                  }
                  tabIndex={isVisible ? 0 : -1}>
                  {shape.type ? '/' : '~'}
                </Button>
                <Shape
                  onMouseEnter={onMouseEnterShape}
                  onMouseLeave={onMouseLeaveShape}
                  onDraggingStart={onDraggingShapeStart}
                  onDraggingEnd={onDraggingShapeEnd}
                  onChange={onChange}
                  shape={shape}
                  shapesInx={index}
                  rangeX={{ min: 0, max: cols }}
                  rangeY={{ min: 0, max: rows }}
                  tabIndex={isVisible ? 0 : -1}
                />
                ;
              </Fragment>
            ))}
          </div>
          <pre>
            <code>{`}`}</code>
          </pre>
        </div>
        <details className={css.details}>
          <summary className={css.summary} tabIndex={isVisible ? 0 : -1}>
            <pre>
              <code>
                {`void drawGrid() {`}
                <span className={css.dots}>{`...`}</span>
              </code>
            </pre>
          </summary>
          <pre>
            <code>{`    strokeWeight(1);
    noFill();
    stroke(200, 200, 200);
    for (int col = 0; col < cols + 1; col++) {
        line(col * u, 0, col * u, cols * u);
    }
    for (int row = 0; row < rows + 1; row++) {
        line(0, row * u, rows * u, row * u);
    }
  }
			`}</code>
          </pre>
        </details>
      </div>
    </div>
  );
};

export default SketchCode;
