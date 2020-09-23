import React, { Fragment } from 'react';
import classnames from 'classnames';

import Searchbar from '../components/Searchbar';
import ExampleList from '../components/ExampleList';
import ReferenceList from '../components/ReferenceList';

import css from './Sidebar.module.css';

const Sidebar = (props) => {
  const { refs, show, examples } = props;

  return (
    <div className={classnames(css.root, { [css.show]: show })}>
      <div className={css.toggleButton} onClick={(e) => props.onChange(!show)}>
        {show ? '×' : '+'}
      </div>
      {show && (
        <Fragment>
          <h2>{examples ? 'Examples' : 'Reference'}</h2>
          <Searchbar placeholder={'Search'} />
          {examples ? (
            <ExampleList data={refs} />
          ) : (
            <ReferenceList data={refs} library={'processing'} sidebar />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
