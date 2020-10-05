import React, { useState } from 'react';
import Button from './Button';
import css from './Interface.module.css';
import { rgbToHex, hexToRgb } from './utils';

const Interface = (props) => {
  const { showGrid, shapes } = props;

  return (
    <div className={css.root}>
      <h1>Parameters</h1>
      {shapes.map((shape, index) => (
        <div key={index}>
          <input
            type="color"
            name="color"
            onChange={(e) =>
              props.onChange(
                e,
                ['shapes', index, 'color'],
                hexToRgb(e.target.value)
              )
            }
            value={rgbToHex(shape.color)}
          />
          <br />
          {shape.pos.map((p, idx) => (
            <input
              key={`${index}-${idx}`}
              type="range"
              min="0"
              max="10"
              name="pos"
              onChange={(e) =>
                props.onChange(e, ['shapes', index, 'pos', idx], e.target.value)
              }
              value={p}
            />
          ))}
        </div>
      ))}
      <Button
        name="showGrid"
        value={showGrid}
        onClick={(e) => props.onChange(e, ['showGrid'], !showGrid)}>
        Grid {showGrid ? 'Off' : 'On'}
      </Button>
    </div>
  );
};

export default Interface;
