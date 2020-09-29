import React, { Fragment, useEffect, useState } from 'react';
import classnames from 'classnames';

import css from './SidebarLabel.module.css';

const SidebarLabel = ({ label, children, secondary }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    !label && setExpanded(true);
  }, [label]);
  return (
    <div className={css.root}>
      <button
        onClick={() => setExpanded((expanded) => !expanded)}
        className={classnames({ [css.expanded]: expanded })}>
        {!secondary ? (
          <h3>{label}</h3>
        ) : (
          <Fragment>
            {label && (
              <div className={css.secondaryLabel}>
                <div className={css.expandButton}>
                  <span>{expanded ? '−' : '+'}</span>
                </div>
                <h4>{label}</h4>
              </div>
            )}
          </Fragment>
        )}
      </button>
      {expanded && children}
    </div>
  );
};

export default SidebarLabel;
