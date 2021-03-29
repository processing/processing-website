import React, { Fragment, useEffect, useState } from 'react';
import classnames from 'classnames';

import css from './SidebarGroup.module.css';

const SidebarGroup = ({ label, children, secondary, filtered }) => {
  const [expanded, setExpanded] = useState();

  useEffect(() => {
    !label && setExpanded(true);
  }, [label]);

  return (
    <div
      className={classnames(
        css.root,
        { [css.secondaryLabel]: secondary },
        { [css.expanded]: expanded || filtered },
        { [css.noLabel]: !label }
      )}>
      <button
        className={css.button}
        onClick={() => setExpanded((expanded) => !expanded)}>
        {!secondary ? (
          <h3 className={css.label}>{label}</h3>
        ) : (
          <Fragment>
            {label && (
              <div className={css.secondaryWrapper}>
                {!filtered && (
                  <div className={css.expandButton}>
                    <span>{expanded ? '−' : '+'}</span>
                  </div>
                )}
                <h4 className={css.label}>{label}</h4>
              </div>
            )}
          </Fragment>
        )}
      </button>
      {(expanded || filtered) && children}
    </div>
  );
};

export default SidebarGroup;
