import React, { useState, useMemo, Fragment } from 'react';
import classnames from 'classnames';
import SketchGraphic from './SketchGraphic';
import SketchCode from './SketchCode';
import { fromJS } from 'immutable';

import { useWindowSize } from '../../hooks';

import grid from '../../styles/grid.module.css';
import css from './Sketch.module.css';

const initialState = fromJS({
  showGrid: true,
  width: 600,
  height: 600,
  unit: 60,
  strokeWidth: 1.5,
  shapes: [
    {
      line: true,
      color: { r: 2, g: 81, b: 200 },
      pos: [1, 2, 0, 0, 0, 0, 7, 5],
      showHandlers: false,
      dragging: null,
    },
    {
      line: false,
      color: { r: 80, g: 139, b: 255 },
      pos: [1, 5, 4, 4, 2, 2, 4, 1],
      showHandlers: false,
      dragging: null,
    },
    {
      line: true,
      color: { r: 30, g: 42, b: 103 },
      pos: [6, 1, 0, 0, 0, 0, 4, 7],
      showHandlers: false,
      dragging: null,
    },
  ],
});

const Sketch = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [showCode, setShow] = useState(true);
  const { width } = useWindowSize();

  const changeStateHandler = (e, path, value) => {
    setState((state) => state.setIn(path, value));
  };

  const handleClickOnSketch = (e) => {
    e.stopPropagation();
    setState((state) => state.setIn(['showCode'], !showCode ? true : false));
    setShow((showCode) => !showCode);
  };

  const handleMouseEnterShapeLine = (shapeIdx) => {
    setState((state) =>
      state.setIn(['shapes', shapeIdx, 'showHandlers'], true)
    );
  };

  const handleMouseLeaveShapeLine = (shapeIdx) => {
    setState((state) =>
      state.setIn(['shapes', shapeIdx, 'showHandlers'], false)
    );
  };

  const handleDraggingShapeStart = (shapeIdx, index) => {
    setState((state) => state.setIn(['shapes', shapeIdx, 'dragging'], index));
  };

  const handleDraggingShapeEnd = (shapeIdx) => {
    setState((state) => state.setIn(['shapes', shapeIdx, 'dragging'], null));
  };

  useMemo(() => {
    setState((state) => state.setIn(['width'], width <= 960 ? 600 : 600));
  }, [width]);

  const stateJS = state.toJS();

  return (
    <div className={classnames(css.root, grid.grid)}>
      <div className={classnames(grid.col, css.left)}>
        <div className={classnames(css.rail, { [css.codeVisible]: showCode })}>
          <div className={css.slide}>{children}</div>
          <div className={css.slide}>
            <SketchCode
              onChange={changeStateHandler}
              isVisible={showCode}
              {...stateJS}
              onMouseEnterShape={handleMouseEnterShapeLine}
              onMouseLeaveShape={handleMouseLeaveShapeLine}
              onDraggingShapeStart={handleDraggingShapeStart}
              onDraggingShapeEnd={handleDraggingShapeEnd}
            />
          </div>
        </div>
      </div>
      <div className={classnames(grid.col, css.right)}>
        <SketchGraphic
          onClick={handleClickOnSketch}
          {...stateJS}
          isCodeVisible={showCode}
        />
      </div>
    </div>
  );
};

export default Sketch;
