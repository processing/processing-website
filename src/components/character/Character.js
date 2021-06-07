import React, { Fragment, useState, useMemo } from 'react';
import classnames from 'classnames';

import Eye from './Eye';

import css from './Character.module.css';

import characters from './characters.json';

const Character = ({ num, className }) => {
  const strokeWidth = 30;
  const [moving, setMoving] = useState(null);

  const shapes = characters[num].shapes;
  let eyes = characters[num].eyes;
  const blink = characters[num].blink;

  useMemo(() => {
    if (moving)
      eyes.forEach((eye) => {
        if (!eye.open) eye.open = true;
      });
    else {
      eyes.forEach((eye) => {
        if (eye.open) eye.open = false;
      });
    }
  }, [eyes, moving]);

  const registerEnter = (e) => {
    setMoving(true);
  };

  const registerLeave = (e) => {
    setMoving(false);
  };

  return (
    <div className={classnames(css.root, { [className]: className })}>
      <svg
        viewBox={'0 0 150 150'}
        onMouseEnter={registerEnter}
        onMouseLeave={registerLeave}>
        {shapes.map((shape, index) => {
          let dPoints;
          if (!shape.type) {
            dPoints = shape.pos.map((x) => x);
            dPoints.splice(0, 0, 'M');
            dPoints.splice(3, 0, 'C');
          }

          return shape.type === true ? (
            <line
              key={index}
              x1={shape.pos[0]}
              y1={shape.pos[1]}
              x2={shape.pos[6]}
              y2={shape.pos[7]}
              stroke={shape.color}
              strokeWidth={strokeWidth}
            />
          ) : (
            <Fragment key={index}>
              <path
                key={index}
                d={dPoints.join(' ')}
                stroke={shape.color}
                fill="none"
                strokeWidth={strokeWidth}
              />
            </Fragment>
          );
        })}
        {eyes.map((eye, index) => {
          return (
            <Eye key={index + 'ey'} eye={eye} blink={blink} index={index} />
          );
        })}
      </svg>
    </div>
  );
};

export default Character;
