import React, { useState } from 'react';
import classnames from 'classnames';

import css from './Tabs.module.css';
import grid from '../styles/grid.module.css';

const Tabs = ({ pdes }) => {
  const [active, setActive] = useState(pdes[0].name);

  const onClick = (value) => {
    setActive(value);
  };

  return (
    <div className={css.root}>
      <ul className={grid.col6}>
        {pdes.map((pde, key) => (
          <li
            className={classnames(css.tab, {
              [css.active]: pde.name === active,
            })}
            key={key + 'tab'}
            onClick={() => onClick(pde.name)}>
            {pde.name}
          </li>
        ))}
      </ul>
      <div className={grid.col6}>
        {pdes.map(
          (pde, key) =>
            pde.name === active && (
              <pre className={css.codeBlock} key={key}>
                {pde.internal.content}
              </pre>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
