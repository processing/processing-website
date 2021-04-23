import React, { Fragment, useState, useEffect } from 'react';
import classnames from 'classnames';
import hljs from 'highlight.js/lib/core';

import Button from './Button';
import CopyButton from './CopyButton';

import css from './Tabs.module.css';

const Tabs = ({ pdes, className }) => {
  const [active, setActive] = useState(pdes[0].name);

  useEffect(() => {
    document.querySelectorAll('pre').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [active]);

  const onClick = (value) => {
    setActive(value);
  };

  return (
    <div className={classnames(css.root, className)}>
      <ul>
        {pdes.map((pde, key) => (
          <li key={key + 'tab'}>
            <Button
              className={classnames(css.tab, {
                [css.active]: pde.name === active,
              })}
              onClick={() => onClick(pde.name)}
              onKeyDown={() => onClick(pde.name)}>
              {pde.name}
            </Button>
          </li>
        ))}
      </ul>
      <div className={css.code}>
        {pdes.map(
          (pde, key) =>
            pde.name === active && (
              <Fragment key={key}>
                <CopyButton text={pde.internal.content} />
                <pre className={css.codeBlock} key={`code-${key}`}>
                  {pde.internal.content}
                </pre>
              </Fragment>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
