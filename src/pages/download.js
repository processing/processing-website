import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { DateTime } from 'luxon';

import Layout from '../components/Layout';

import { selectedReleases } from '../utils/constants';

import css from '../styles/pages/download.module.css';
import grid from '../styles/grid.module.css';
const preReleases = ['4.0a2', '4.0a1'];

const Download = () => {
  const { preRelease, github: githubData } = useStaticQuery(graphql`
    query {
      github {
        repository(name: "processing", owner: "processing") {
          releases(first: 100, orderBy: { field: NAME, direction: ASC }) {
            edges {
              node {
                name
                tagName
                publishedAt
                releaseAssets(first: 10) {
                  edges {
                    node {
                      name
                      downloadUrl
                    }
                  }
                }
              }
            }
          }
        }
      }
      preRelease {
        url
        name
        tagName
        published
        assets {
          name
          content_type
          browser_download_url
        }
      }
    }
  `);

  const releases = githubData.repository.releases.edges.map((e) => e.node);
  const latestRelease = releases.pop();
  let latestAssets = [
    { os: 'windows', bit: 64, label: 'Windows' },
    { os: 'mac', label: 'Mac OS X' },
    { os: 'linux', bit: 64, label: 'Linux' },
    { os: 'linux', bit: 32, label: 'Linux' },
    { os: 'windows', bit: 32, label: 'Windows' },
  ];
  latestAssets = latestAssets.map((latestAsset) => {
    const assetsData = latestRelease.releaseAssets.edges.map((e) => e.node);
    for(let a of assetsData)  {
      const { filename: name, downloadUrl } = a;
      if (filename.includes(latestAsset.os) && filename.includes(latestAsset.bit)) latestAsset['url'] = a.downloadUrl;
      else if (filename.includes(latestAsset.os) && !filename.includes(latestAsset.bit)) latestAsset['url'] = a.downloadUrl;
    });

    const match = assetsData.filter((asset) => {
      const name = assetsData.name.split('-').pop();
      if (name.includes(latestAsset.os) && !latestAsset.bit) return true;
      else if (
        asset.name.includes(latestAsset.os) &&
        asset.name.includes(latestAsset.bit)
      )
        return true;
      else return false;
    });
    if (match.length > 0) latestAsset['url'] = match.shift().downloadUrl;
    return version;
  });

  return (
    <Layout>
      <div className={grid.grid}>
        <h1 className={classnames(grid.col5, grid.pull3)}>Download</h1>
        <h3 className={classnames(grid.col4, grid.pull4)}>
          Processing is available for Linux, Mac OS X, and Windows. Select your
          choice to download the software below.
        </h3>
        <div className={classnames(grid.nest, grid.col6, grid.grid)}>
          <div className={classnames(css.logo, grid.col2)}>
            <h2>{latestRelease.name.split(' ').shift()}</h2>
          </div>
          <div
            className={classnames(
              css.latestVersionsWrapper,
              grid.nest,
              grid.col3
            )}>
            <div className={grid.col3}>
              <span className={css.latestNumber}>
                {latestRelease.name.split(' ').pop()}
              </span>
              <span className={css.latestDate}>
                {` (${DateTime.fromISO(
                  latestRelease.publishedAt
                ).toLocaleString(DateTime.DATE_FULL)})`}
              </span>
            </div>
            {latestAssets.map((v, i) => (
              <div
                key={`version-${i}`}
                className={classnames(grid.col1, css.latestVersion)}>
                <a href={v.url}>
                  <span className={css.latestVersionName}>{v.name}</span>
                  {v.bit && (
                    <span
                      className={css.latestVersionBit}>{`${v.bit}-bit`}</span>
                  )}
                </a>
              </div>
            ))}
          </div>
          <ul className={classnames(grid.col1, css.links)}>
            <li>
              <a href={'https://github.com/processing'}>Github</a>
            </li>
            <li>
              <a
                href={
                  'https://github.com/processing/processing/issues?q=is%3Aopen'
                }>
                Report Bugs
              </a>
            </li>
            <li>
              <a href={'https://github.com/processing/processing/wiki'}>Wiki</a>
            </li>{' '}
            <li>
              <a
                href={
                  'https://github.com/processing/processing/wiki/Supported-Platforms'
                }>
                Supported Platforms
              </a>
            </li>
          </ul>
          <p className={grid.col5}>
            Read about the changes in 3.0. The list of revisions covers the
            differences between releases in detail.
          </p>
        </div>
        <div
          className={classnames(grid.nest, grid.col5, grid.grid, grid.push1)}>
          <h3>Stable Releases</h3>
        </div>
        <p className={grid.col5}>
          Earlier releases have been removed because we can only support the
          current versions of the software. To update old code, read the
          <a href={'https://github.com/processing/processing/wiki/Changes'}>
            {` changes `}
          </a>
          page. Changes for each release can be found in{' '}
          <a
            href={
              'https://raw.githubusercontent.com/processing/processing/master/build/shared/revisions.txt'
            }>{`revisions.txt`}</a>
          . If you have problems with the current release, please{' '}
          <a
            href={
              'https://github.com/processing/processing/issues?q=is%3Aopen'
            }>{`file a bug`}</a>{' '}
          so that we can fix it. Older releases can also be{' '}
          <a
            href={
              'https://github.com/processing/processing'
            }>{`built from the source`}</a>
          .{' '}
          <a
            href={
              'https://github.com/processing/processing/wiki/FAQ#whats-with-the-version-numbers'
            }>
            {`Read More`}
          </a>{' '}
          about the releases and their numbering. To use{' '}
          <a href={'https://android.processing.org/'}>{`Android Mode`}</a>,
          Processing 3 or later is required.
        </p>
        <div
          className={classnames(grid.nest, grid.col5, grid.grid, grid.push1)}>
          <h3>Pre-Releases</h3>
          <ul className={css.releaseList}>
            <li className={css.releaseRow}>
              <span className={grid.col1}>
                {preRelease.name.replace('Processing ', '')}
              </span>
              <span className={grid.col1}>{` (${DateTime.fromISO(
                preRelease.published
              ).toLocaleString(DateTime.DATE_FULL)})`}</span>
              <span className={grid.col3}>
                {preRelease.assets.map((asset, i) => (
                  <a
                    href={asset.browser_download_url}
                    key={`preRelease-asset-${i}`}>
                    <span>{asset.name.split('-').pop()}</span>
                  </a>
                ))}
              </span>
            </li>
          </ul>
        </div>
        <p className={grid.col5}>
          The{' '}
          <a
            href={
              'https://github.com/processing/processing4/blob/master/build/shared/changes.md'
            }>{`changes`}</a>{' '}
          document covers incremental updates between 4.x releases, and is
          especially important to read for pre-releases.
        </p>
      </div>
    </Layout>
  );
};

export default Download;
