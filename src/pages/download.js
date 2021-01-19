import React, { Fragment } from 'react';
import classnames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { DateTime } from 'luxon';

import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import LogoProcessing from '../images/logo-processing.svg';

import {
  selectedReleasesNumbers,
  selectedPreReleasesNumbers,
  versionLabels,
} from '../utils/constants';

import css from '../styles/pages/download.module.css';
import grid from '../styles/grid.module.css';

let latestAssets = [
  { os: 'windows', bit: 64, label: 'Windows' },
  { os: 'linux', bit: 64, label: 'Linux' },
  { os: 'mac', label: 'Mac OS X' },
  { os: 'windows', bit: 32, label: 'Windows' },
];

const Download = () => {
  const {
    preReleases: preReleasesData,
    releases: releasesData,
  } = useStaticQuery(graphql`
    query {
      releases: github {
        repository(name: "processing", owner: "processing") {
          releases(first: 100, orderBy: { field: NAME, direction: DESC }) {
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
      preReleases: github {
        repository(name: "processing4", owner: "processing") {
          releases(first: 100, orderBy: { field: NAME, direction: DESC }) {
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
    }
  `);

  const releases = releasesData.repository.releases.edges.map((e) => e.node);
  const selectedReleases = releases.filter((r) =>
    selectedReleasesNumbers.includes(r.name.split(' ').pop())
  );
  const preReleases = preReleasesData.repository.releases.edges.map(
    (e) => e.node
  );
  const selectedPreReleases = preReleases.filter((r) =>
    selectedPreReleasesNumbers.includes(r.tagName.split('-').pop())
  );

  const latestRelease = releases.shift();

  const createLabel = (filename) => {
    let label = '';
    versionLabels.forEach((item, i) => {
      if (filename.includes(item.os)) label = label + item.label;
    });
    if (filename.includes('64')) label = label + ' 64';
    else if (filename.includes('32')) label = label + ' 32';
    else if (
      !versionLabels
        .map((e) => e.os)
        .some((os) => filename.split('-').pop().includes(os))
    )
      label = label + ` ${filename.split('-').pop().slice(0, -4)}`;
    return label;
  };

  latestAssets = latestAssets.map((latestAsset) => {
    const assetsData = latestRelease.releaseAssets.edges.map((e) => e.node);
    for (let a of assetsData) {
      const { name: filename, downloadUrl } = a;
      if (latestAsset.bit) {
        if (
          filename.includes(latestAsset.os) &&
          filename.includes(latestAsset.bit)
        )
          latestAsset['url'] = downloadUrl;
        else latestAsset['url'] = downloadUrl;
      } else if (filename.includes(latestAsset.os))
        latestAsset['url'] = downloadUrl;
    }
    const match = assetsData.find((asset) => {
      const name = asset.name.split('-').pop();
      if (name.includes(latestAsset.os) && !latestAsset.bit) return true;
      else if (
        asset.name.includes(latestAsset.os) &&
        asset.name.includes(latestAsset.bit)
      )
        return true;
      else return false;
    });
    if (match) latestAsset['url'] = match.downloadUrl;
    return latestAsset;
  });

  return (
    <Layout>
      <div className={classnames(grid.grid, css.root)}>
        <Donate />
        <h1 className={grid.col}>Download</h1>
        <h3 className={classnames(grid.col, css.textBlock)}>
          Processing is available for Linux, Mac OS X, and Windows. Select your
          choice to download the software below.
        </h3>
        <div
          className={classnames(grid.nest, grid.col, grid.grid, css.section)}>
          <div className={classnames(css.logo, grid.col)}>
            <LogoProcessing />
            <h2>{latestRelease.name.split(' ').shift()}</h2>
          </div>
          <div
            className={classnames(
              css.latestVersionsWrapper,
              grid.nest,
              grid.col
            )}>
            <div className={classnames(grid.col, css.latestLabel)}>
              <span className={css.latestNumber}>
                {latestRelease.name.split(' ').pop()}
              </span>
              <span className={css.latestDate}>
                {` (${DateTime.fromISO(
                  latestRelease.publishedAt
                ).toLocaleString(DateTime.DATE_FULL)})`}
              </span>
            </div>
            {latestAssets
              .sort((a, b) =>
                a.label > b.label ? -1 : a.label < b.label ? 1 : 0
              )
              .map((v, i) => (
                <div
                  key={`version-${i}`}
                  className={classnames(grid.col, css.latestVersion)}>
                  <a href={v.url}>
                    <span className={css.latestVersionName}>{v.label}</span>
                    {v.bit && (
                      <span
                        className={css.latestVersionBit}>{`${v.bit}-bit`}</span>
                    )}
                  </a>
                </div>
              ))}
          </div>
          <ul className={classnames(grid.col, css.links)}>
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
        </div>
        <p className={grid.col}>
          Read about the changes in 3.0. The list of revisions covers the
          differences between releases in detail.
        </p>
        <div className={classnames(grid.nest, grid.col, css.sectionList)}>
          <h3 className={grid.col}>Stable Releases</h3>
          <ul className={css.releaseList}>
            {selectedReleases.map((release) => (
              <li className={css.releaseRow} key={release.name}>
                <span className={classnames(grid.col, css.releaseName)}>
                  {release.name.replace('Processing ', '')}
                </span>
                <span
                  className={classnames(
                    grid.col,
                    css.releaseDate
                  )}>{` (${DateTime.fromISO(release.publishedAt).toLocaleString(
                  DateTime.DATE_FULL
                )})`}</span>
                <span className={grid.col}>
                  {release.releaseAssets.edges
                    .sort((a, b) =>
                      a.node.name > b.node.name
                        ? -1
                        : a.node.name < b.node.name
                        ? 1
                        : 0
                    )
                    .map((asset, i) => {
                      const { name: filename, downloadUrl } = asset.node;
                      const label = createLabel(filename);
                      return (
                        <Fragment key={`asset-container-${i}`}>
                          <a href={downloadUrl} key={`preRelease-asset-${i}`}>
                            <span className={css.assetLabel}>{label}</span>
                          </a>
                          {i < release.releaseAssets.edges.length - 1 && (
                            <span className={css.assetSeparator}>/</span>
                          )}
                        </Fragment>
                      );
                    })}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className={grid.col}>
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
        <div className={classnames(grid.nest, grid.col, css.sectionList)}>
          <h3 className={grid.col}>Pre-Releases</h3>
          <ul className={css.releaseList}>
            {selectedPreReleases.map((preRelease) => (
              <li className={css.releaseRow} key={preRelease.name}>
                <span className={classnames(grid.col, css.releaseName)}>
                  {preRelease.name.replace('Processing ', '')}
                </span>
                <span
                  className={classnames(
                    grid.col,
                    css.releaseDate
                  )}>{` (${DateTime.fromISO(
                  preRelease.publishedAt
                ).toLocaleString(DateTime.DATE_FULL)})`}</span>
                <span className={grid.col}>
                  {preRelease.releaseAssets.edges
                    .sort((a, b) =>
                      a.node.name > b.node.name
                        ? -1
                        : a.node.name < b.node.name
                        ? 1
                        : 0
                    )
                    .map((asset, i) => {
                      const { name: filename, downloadUrl } = asset.node;
                      const label = createLabel(filename);
                      return (
                        <Fragment key={`asset-container-${i}`}>
                          <a href={downloadUrl} key={`preRelease-asset-${i}`}>
                            <span className={css.assetLabel}>{label}</span>
                          </a>
                          {i < preRelease.releaseAssets.edges.length - 1 && (
                            <span className={css.assetSeparator}>/</span>
                          )}
                        </Fragment>
                      );
                    })}
                </span>
              </li>
            ))}
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
