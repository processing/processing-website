import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import SidebarList from '../components/SidebarList';

import css from './Sidebar.module.css';

const Sidebar = (props) => {
  const { refs, show } = props;

  return (
    <div className={css.root} style={{ width: show ? '350px' : '50px' }}>
      {show && <SidebarList refs={refs} />}
      <span className={css.show} onClick={(e) => props.onChange(!show)}>
        {show ? 'close' : 'open'}
      </span>
    </div>
  );
};

export default Sidebar;
