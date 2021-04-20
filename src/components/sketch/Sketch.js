import React, {
  useState,
  useEffect,
  useMemo,
  Fragment,
  useCallback
} from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import SketchGraphic from './SketchGraphic';
import SketchCode from './SketchCode';
import CoolButton from './CoolButton';

import grid from '../../styles/grid.module.css';
import css from './Sketch.module.css';

const initialState = {
  showGrid: true,
  width: 600,
  height: 600,
  unit: 60,
  strokeWeight: 1.5,
  strokeCap: true,
  shapes: [
    {
      line: true,
      color: [2, 81, 200],
      pos: [1, 2, 4, 1, 5, 2, 7, 5],
      showHandlers: false,
      dragging: null
    },
    {
      color: [80, 139, 255],
      pos: [1, 5, 4, 4, 2, 2, 4, 1],
      showHandlers: false,
      dragging: null
    },
    {
      line: true,
      color: [30, 42, 103],
      pos: [6, 1, 7, 3, 6, 6, 4, 7],
      showHandlers: false,
      dragging: null
    }
  ]
};

const loadedState =
  window.localStorage && window.localStorage.getItem('sketch');
const parsedState = loadedState ? JSON.parse(loadedState) : initialState;

const Sketch = ({ children }) => {
  const [state, setState] = useState(parsedState);
  const [showCode, setShowCode] = useState(false);
  const intl = useIntl();

  // Sync state to local storage
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
    <div className={classnames(css.root, grid.grid)}>
      <div className={classnames(grid.col, css.left)}>
        <div className={css.splash}>{children}</div>
        <div className={classnames(css.code, { [css.codeVisible]: showCode })}>
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
        <SketchGraphic isCodeVisible={showCode} {...state} />
        <CoolButton onClick={onCodeToggle}>
          {showCode
            ? intl.formatMessage({ id: 'closeEditor' })
            : intl.formatMessage({ id: 'openEditor' })}
        </CoolButton>
      </div>
    </div>
  );
};

export default Sketch;
