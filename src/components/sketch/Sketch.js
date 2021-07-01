import React, { memo, useState, useEffect, useCallback } from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import SketchGraphic from './SketchGraphic';
import SketchCode from './SketchCode';
import Button from '../Button';

import css from './Sketch.module.css';
import grid from '../../styles/grid.module.css';

const initialState = {
  showGrid: true,
  width: 600,
  height: 600,
  unit: 60,
  strokeWeight: 1.5,
  strokeCap: true,
  shapes: [
    {
      color: [5, 100, 255],
      pos: [4, 1, 7, 1, 7, 5, 4, 5],
      showHandlers: false,
      showPoint: null,
      dragging: null
    },
    {
      line: true,
      color: [30, 50, 170],
      pos: [1, 6, 1, 6, 4, 2, 4, 2],
      showHandlers: false,
      showPoint: null,
      dragging: null
    },
    {
      line: true,

      color: [130, 175, 255],
      pos: [1, 3, 1, 3, 2, 5, 2, 5],
      showHandlers: false,
      showPoint: null,
      dragging: null
    }
  ]
};

const Sketch = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [showCode, setShowCode] = useState(false);
  const intl = useIntl();

  console.log('Render sketch');

  // Load saved graphic from localstorage when component mounts in client
  useEffect(() => {
    if (window.localStorage) {
      const savedState = window.localStorage.getItem('sketch');
      if (savedState) {
        console.log('Loaded state from localStorage', savedState);
        setState(JSON.parse(savedState));
      }
    }
  }, []);

  // Save state back into localstorage when it changes
  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem('sketch', JSON.stringify(state));
    }
  }, [state]);

  // Change handler for a simple attribute in state
  const onChange = useCallback((key, value) => {
    setState((oldState) => Object.assign({}, oldState, { [key]: value }));
  }, []);

  // Change handler for attributes in a shape
  const onChangeShape = useCallback((shapeIdx, key, value) => {
    setState((oldState) => {
      const newState = Object.assign({}, oldState);
      newState.shapes = oldState.shapes.slice();
      newState.shapes[shapeIdx] = Object.assign({}, newState.shapes[shapeIdx], {
        [key]: value
      });
      return newState;
    });
  }, []);

  const onCodeToggle = useCallback(() => {
    setShowCode((show) => !show);
  }, []);

  // Change handler for a simple attribute in state
  const onResetState = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <div className={css.root}>
      <div className={classnames(grid.container, grid.grid, css.wrapper)}>
        <div className={classnames(grid.col, css.left)}>
          <div className={css.splash}>{children}</div>
          <div
            className={classnames(css.code, { [css.codeVisible]: showCode })}>
            <SketchCode
              onChange={onChange}
              onChangeShape={onChangeShape}
              onResetState={onResetState}
              isVisible={showCode}
              {...state}
            />
          </div>
        </div>
        <div className={classnames(grid.col, css.right)}>
          <SketchGraphic {...state} />
          <Button
            onClick={onCodeToggle}
            size="large"
            variant="animate2"
            className={css.editorBtn}>
            {showCode
              ? intl.formatMessage({ id: 'closeEditor' })
              : intl.formatMessage({ id: 'openEditor' })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Sketch);
