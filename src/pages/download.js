import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { DateTime } from 'luxon';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();

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
      <Helmet>
        <title>{'Download'}</title>
      </Helmet>
      <div className={classnames(grid.grid, css.root)}>
        <Donate />
        <h1 className={grid.col}>Download</h1>
        <h3 className={classnames(grid.col, css.textBlock)}>
          {intl.formatMessage({ id: 'downloadIntro' })}
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
                {intl.formatMessage({ id: 'report' })}
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
                {intl.formatMessage({ id: 'supported' })}
              </a>
            </li>
          </ul>
        </div>
        <p className={grid.col}>
          {intl.formatMessage({ id: 'downloadChanges' })}
        </p>
        <div className={classnames(grid.nest, grid.col, css.sectionList)}>
          <h3 className={grid.col}>{intl.formatMessage({ id: 'stable' })}</h3>
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
        <p
          className={grid.col}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'earlierReleases' }),
          }}
        />
        <div className={classnames(grid.nest, grid.col, css.sectionList)}>
          <h3 className={grid.col}>
            {intl.formatMessage({ id: 'preReleases' })}
          </h3>
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
        <p
          className={grid.col5}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'downloadOutro' }),
          }}></p>
      </div>
    </Layout>
  );
};

export default Download;
