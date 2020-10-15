import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';

import css from '../styles/pages/download.module.css';
import grid from '../styles/grid.module.css';

const selectedReleases = ['3.5.3', '1.5.1', '2.2.1'];
const preReleases = ['4.0a2', '4.0a1'];

const Download = () => {
  const [loading, setLoading] = useState(true);
  const [releases, setReleases] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [latest, setLatest] = useState();

  useEffect(() => {
    const url = 'https://api.github.com/repos/processing/processing/releases';
    fetch(url)
      .then((res) => res.json())
      .then((data) => setReleases(data));
    const latestUrl =
      'https://api.github.com/repos/processing/processing/releases/latest';
    fetch(latestUrl)
      .then((res) => res.json())
      .then((data) => setLatest(data));
  }, []);

  useEffect(() => {
    setFiltered(
      releases.filter((d) => selectedReleases.some((r) => d.name.includes(r)))
    );
  }, [releases]);

  console.log(releases);
  console.log(filtered);
  console.log(latest);

  return (
    <Layout>
      <div className={grid.grid}>
        <h1 className={classnames(grid.col5, grid.pull3)}>Download</h1>
        <h3 className={classnames(grid.col4, grid.pull4)}>
          Processing is available for Linux, Mac OS X, and Windows. Select your
          choice to download the software below.
        </h3>
        {latest && (
          <div>
            <h2>{latest.name}</h2>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Download;
