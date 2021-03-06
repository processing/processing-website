import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Link } from 'gatsby';

import classnames from 'classnames';

import Eye from './Eye';

import * as css from './Character.module.css';

import characters from './characters.json';

const Character = ({ className, href }) => {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const newVersion = () => Math.floor(Math.random() * 3);
    const timer = setInterval(() => {
      setVersion(newVersion);
    }, 20 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const strokeWidth = 30;
  const [moving, setMoving] = useState(null);

  const shapes = characters[version].shapes;
  const eyes = characters[version].eyes;
  const blink = characters[version].blink;

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

  const char = (
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
        return <Eye key={index + 'ey'} eye={eye} blink={blink} index={index} />;
      })}
    </svg>
  );

  return (
    <div className={classnames(css.root, { [className]: className })}>
      {href ? <Link to={href}>{char}</Link> : char}
    </div>
  );
};

export default Character;
