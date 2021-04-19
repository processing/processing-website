import React, { useState, useMemo, Fragment, useCallback } from 'react';
import classnames from 'classnames';
import SketchGraphic from './SketchGraphic';
import SketchCode from './SketchCode';

import grid from '../../styles/grid.module.css';
import css from './Sketch.module.css';

const initialState = {
  showGrid: true,
  width: 600,
  height: 600,
  unit: 60,
  strokeWeight: 1.5,
  shapes: [
    {
      line: true,
      color: [2, 81, 200],
      pos: [1, 2, 0, 0, 0, 0, 7, 5],
      showHandlers: false,
      dragging: null,
    },
    {
      line: false,
      color: [80, 139, 255],
      pos: [1, 5, 4, 4, 2, 2, 4, 1],
      showHandlers: false,
      dragging: null,
    },
    {
      line: true,
      color: [30, 42, 103],
      pos: [6, 1, 0, 0, 0, 0, 4, 7],
      showHandlers: false,
      dragging: null,
    },
  ],
};

const Sketch = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [showCode, setShowCode] = useState(true);

  // Change handler for a simple attribute in state
  const onChange = useCallback((e, key, value) => {
    setState((oldState) => Object.assign({}, oldState, { [key]: value }));
  }, []);

  // Change handler for a simple attribute in a shape
  const onChangeShape = useCallback((e, shapeIdx, key, value) => {
    // setState((oldState) => Object.assign({}, oldState, { [key]: value }));
  }, []);

  // const onChangeShapeArray

  // const onChangeShapePos

  const handleClickOnSketch = useCallback((e) => {
    e.stopPropagation();
    //setState((state) => state.setIn(['showCode'], !showCode ? true : false));
    setShowCode((show) => !show);
  }, []);

  const handleMouseEnterShapeLine = useCallback((shapeIdx) => {
    // setState((state) =>
    //   state.setIn(['shapes', shapeIdx, 'showHandlers'], true)
    // );
  }, []);

  const handleMouseLeaveShapeLine = useCallback((shapeIdx) => {
    // setState((state) =>
    //   state.setIn(['shapes', shapeIdx, 'showHandlers'], false)
    // );
  }, []);

  const handleDraggingShapeStart = useCallback((shapeIdx, index) => {
    // setState((state) => state.setIn(['shapes', shapeIdx, 'dragging'], index));
  }, []);

  const handleDraggingShapeEnd = useCallback((shapeIdx) => {
    // setState((state) => state.setIn(['shapes', shapeIdx, 'dragging'], null));
  }, []);

  return (
    <div className={classnames(css.root, grid.grid)}>
      <div className={classnames(grid.col, css.left)}>
        <div className={classnames(css.rail, { [css.codeVisible]: showCode })}>
          <div className={css.slide}>{children}</div>
          <div className={css.slide}>
            <SketchCode
              onChange={onChange}
              isVisible={showCode}
              {...state}
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
          {...state}
          isCodeVisible={showCode}
        />
      </div>
    </div>
  );
};

export default Sketch;
