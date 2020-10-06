import React, { Fragment, useState, useMemo, useEffect } from 'react';
import classnames from 'classnames';
import hljs from 'highlight.js/lib/core';
import processing from 'highlight.js/lib/languages/processing';
import Button from '../Button';
import Draggable from './Draggable';
import Color from './Color';
import Shape from './Shape';

import grid from '../../styles/grid.module.css';
import css from './SketchCode.module.css';
import highlight from './processingIDE.css';

console.log(highlight);

hljs.registerLanguage('processing', processing);
hljs.configure({ classPrefix: 'processingIDE__hljs-' });

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
  } = props;
  const [showing, setShowing] = useState(false);

  const cols = useMemo(() => Math.floor(width / unit), [width, unit]);
  const rows = useMemo(() => Math.floor(height / unit), [height, unit]);

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, []);

  useEffect(() => {
    shapes.forEach((shape, index) => {
      shape.pos.forEach((p, subindex) => {
        if (p > rows && subindex % 2 == 1) {
          props.onChange(
            'Adjusting strokes to rows',
            ['shapes', index, 'pos', subindex],
            rows
          );
        }
      });
    });
  }, [height, unit]);

  useEffect(() => {
    shapes.forEach((shape, index) => {
      shape.pos.forEach((p, subindex) => {
        if (p > cols && subindex % 2 == 0) {
          props.onChange(
            'Adjusting strokes to cols',
            ['shapes', index, 'pos', subindex],
            cols
          );
        }
      });
    });
  }, [width, unit]);

  return (
    <div className={css.root}>
      <div className={classnames(css.code, { [css.visible]: isVisible })}>
        <div className={css.inCode}>
          <pre>
            <code>int width = </code>
          </pre>
          <Draggable
            name="width"
            className={css.showGrid}
            value={width}
            range={{ min: 0, max: 1600 }}
            path={['width']}
            onChange={props.onChange}></Draggable>
          ;
          <br />
          <pre>
            <code>int height = </code>
          </pre>
          <Draggable
            name="height"
            className={css.showGrid}
            value={height}
            range={{ min: 0, max: 1200 }}
            path={['height']}
            onChange={props.onChange}></Draggable>
          ;
          <br />
          <pre>
            <code>int unit = </code>
          </pre>
          <Draggable
            name="unit"
            className={css.showGrid}
            value={unit}
            range={{ min: 20, max: 80 }}
            path={['unit']}
            onChange={props.onChange}></Draggable>
          ;
          <br />
          <pre>
            <code>boolean showGrid = </code>
          </pre>
          <Button
            name="showGrid"
            className={css.showGrid}
            value={showGrid}
            onClick={(e) => props.onChange(e, ['showGrid'], !showGrid)}>
            {showGrid ? 'true' : 'false'}
          </Button>
          ;
        </div>
        <br />
        <details className={classnames(css.details, css.inCode)}>
          <summary className={css.summary}>
            <pre>
              <code>{`void setup() {`}</code>
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
              onChange={props.onChange}
              label={{ prev: '    strokeWeight(', after: ' * u);' }}
            />
            {shapes.map((shape, index) => (
              <Fragment key={`shape-block-${index}`}>
                <br />
                <br />
                stroke(
                <Color
                  onChange={props.onChange}
                  shapes={shapes}
                  shapesInx={index}
                />
                );
                <br />
                <Button
                  className={css.button}
                  onClick={(e) =>
                    props.onChange(e, ['shapes', index, 'type'], !shape.type)
                  }>
                  {shape.type ? '/' : '~'}
                </Button>
                <Shape
                  onMouseEnter={onMouseEnterShape}
                  onMouseLeave={onMouseLeaveShape}
                  onDraggingStart={onDraggingShapeStart}
                  onDraggingEnd={onDraggingShapeEnd}
                  onChange={props.onChange}
                  shape={shape}
                  shapesInx={index}
                  rangeX={{ min: 0, max: cols }}
                  rangeY={{ min: 0, max: rows }}
                />
                ;
              </Fragment>
            ))}
          </div>
          <pre>
            <code>{`}`}</code>
          </pre>
        </div>
        <details className={classnames(css.details, css.inCode)}>
          <summary className={css.summary}>
            <pre>
              <code>{`void drawGrid() {`}</code>
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
        <Button
          className={css.link}
          onClick={(e) =>
            (window.location.href =
              'https://editor.p5js.org/Anadroid/sketches/m9LpjIci2')
          }>
          Open in web editor
        </Button>
      </div>
    </div>
  );
};

export default SketchCode;
