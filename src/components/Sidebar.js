import React, { Fragment, useState } from 'react';
import classnames from 'classnames';

import Searchbar from '../components/Searchbar';
import ExampleList from '../components/ExampleList';
import ReferenceList from '../components/ReferenceList';

import css from './Sidebar.module.css';

const Sidebar = (props) => {
  const { refs, show, examples } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRefs, setFilteredRefs] = useState(refs);

  const refreshList = (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm) {
      let newList = { nodes: '' };
      newList.nodes = refs.nodes.filter((ref) =>
        JSON.stringify(ref).includes(searchTerm)
      );
      setFilteredRefs(newList);
    }
  };

  return (
    <div className={classnames(css.root, { [css.show]: show })}>
      <div className={css.toggleButton} onClick={(e) => props.onChange(!show)}>
        {show ? '×' : '+'}
      </div>
      {show && (
        <Fragment>
          <h2>{examples ? 'Examples' : 'Reference'}</h2>
          <Searchbar
            placeholder={'Search'}
            onChange={refreshList}
            searchTerm={searchTerm}
          />
          <div className={css.listWrapper}>
            {examples ? (
              <ExampleList data={refs} />
            ) : (
              <ReferenceList
                data={filteredRefs}
                library={'processing'}
                sidebar
              />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
