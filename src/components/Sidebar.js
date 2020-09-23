import React from 'react';

import SidebarList from '../components/SidebarList';

import css from './Sidebar.module.css';

const Sidebar = (props) => {
  const { refs, show, examples } = props;

  return (
    <div className={css.root} style={{ width: show ? '350px' : '50px' }}>
      {show && <SidebarList refs={refs} examples={examples} />}
      <span className={css.show} onClick={(e) => props.onChange(!show)}>
        {show ? 'close' : 'open'}
      </span>
    </div>
  );
};

export default Sidebar;
