import React from 'react';
import classnames from 'classnames';

import * as css from './Eye.module.css';

const Eye = ({ eye, index, blink }) => {
  let position = [];

  if (eye.position.length > 0) {
    position.push(eye.position[1] + 5);
    position.push(eye.position[2]);
  }

  const path = 'url(#' + index + ')';

  return (
    <>
      {eye.open ? (
        <svg>
          <defs>
            <clipPath id={index}>
              <rect
                className={css.topLid}
                x={position[0] - 7}
                y={position[1] - 22}
                width="14"
                height="14"
              />
              <rect
                className={css.bottomLid}
                x={position[0] - 7}
                y={position[1] + 14}
                width="14"
                height="14"
              />
            </clipPath>
          </defs>
          <circle
            cx={position[0]}
            cy={position[1]}
            r="7"
            stroke="none"
            strokeWidth="1"
            fill="white"
          />
          <circle
            className={classnames({ [css.pupil]: !blink })}
            cx={blink ? position[0] + 1 : position[0] - 1}
            cy={blink ? position[1] - 1 : position[1]}
            r="4"
            stroke="black"
            strokeWidth="1"
            fill="black"
          />
          {blink && (
            <circle cx={position[0]} cy={position[1]} r="7" clipPath={path} />
          )}
        </svg>
      ) : (
        <path
          d={eye.position.join(' ')}
          stroke="black"
          strokeWidth="3"
          fill="none"
        />
      )}
    </>
  );
};

export default Eye;
