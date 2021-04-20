import React, { Fragment, memo } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import LogoProcessing from '../images/logo-processing.svg';

import { usePreparedReleases } from '../hooks/download';

import css from '../styles/templates/download.module.css';
import grid from '../styles/grid.module.css';

const Download = ({ data }) => {
  const intl = useIntl();
  const releases = usePreparedReleases(data.releases.nodes);
  const preReleases = usePreparedReleases(data.preReleases.nodes);

  return (
    <Layout>
      <Helmet>
        <title>Download</title>
      </Helmet>
      <div className={classnames(grid.grid, css.root)}>
        <Donate />
        <h1 className={grid.col}>Download</h1>
        <h3 className={classnames(grid.col, css.textBlock)}>
          {intl.formatMessage({ id: 'downloadIntro' })}
        </h3>
        <LatestRelease
          release={releases[0]}
          reportLabel={intl.formatMessage({ id: 'report' })}
          supportedLabel={intl.formatMessage({ id: 'supported' })}
        />
        <p className={grid.col}>
          {intl.formatMessage({ id: 'downloadChanges' })}
        </p>
        <ReleasesList
          releases={releases}
          title={intl.formatMessage({ id: 'stable' })}
        />
        <p
          className={grid.col}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'earlierReleases' }),
          }}
        />
        <ReleasesList
          releases={preReleases}
          title={intl.formatMessage({ id: 'preReleases' })}
        />
        <p
          className={grid.col5}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'downloadOutro' }),
          }}></p>
      </div>
    </Layout>
  );
};

const LatestRelease = memo(({ release, reportLabel, supportedLabel }) => {
  return (
    <div className={classnames(grid.nest, grid.col, grid.grid, css.section)}>
      <div className={classnames(css.logo, grid.col)}>
        <LogoProcessing />
        <h3>Processing</h3>
      </div>
      <div
        className={classnames(css.latestVersionsWrapper, grid.nest, grid.col)}>
        <div className={classnames(grid.col, css.latestLabel)}>
          <span className={css.latestNumber}>{release.version}</span>
          <span className={css.latestDate}>({release.publishedAt})</span>
        </div>
        {release.assets.map((asset, i) => (
          <div
            key={`version-${i}`}
            className={classnames(grid.col, css.latestVersion)}>
            <a href={asset.url}>
              <span className={css.latestVersionName}>{asset.os}</span>
              {asset.bit && (
                <span className={css.latestVersionBit}>{asset.bit}</span>
              )}
            </a>
          </div>
        ))}
      </div>
      <ul className={classnames(grid.col, css.links)}>
        <li>
          <a href={'https://github.com/processing'}>GitHub</a>
        </li>
        <li>
          <a
            href={
              'https://github.com/processing/processing/issues?q=is%3Aopen'
            }>
            {reportLabel}
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
            {supportedLabel}
          </a>
        </li>
      </ul>
    </div>
  );
});

const ReleasesList = memo(({ releases, title }) => {
  return (
    <div className={classnames(grid.nest, grid.col, css.sectionList)}>
      <h3 className={grid.col}>{title}</h3>
      <ul className={css.releaseList}>
        {releases.map((release) => (
          <li className={css.releaseRow} key={release.name}>
            <span className={classnames(grid.col, css.releaseName)}>
              {release.version}
            </span>
            <span className={classnames(grid.col, css.releaseDate)}>
              ({release.publishedAt})
            </span>
            <span className={classnames(grid.col, css.releaseAssets)}>
              {release.assets.map((asset, i) => {
                return (
                  <Fragment key={`asset-container-${i}`}>
                    <a href={asset.url}>
                      <span className={css.assetLabel}>
                        {asset.os} {asset.bit}
                      </span>
                    </a>
                    {i < release.assets.length - 1 && (
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
  );
});

export const query = graphql`
  query($selectedReleases: [String!]!, $selectedPreReleases: [String!]!) {
    releases: allFile(
      filter: {
        sourceInstanceName: { eq: "download" }
        relativeDirectory: { eq: "releases" }
        childJson: { tagName: { in: $selectedReleases } }
      }
      sort: { fields: childJson___name, order: DESC }
    ) {
      nodes {
        childJson {
          name
          tagName
          publishedAt
          releaseAssets {
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
    preReleases: allFile(
      filter: {
        sourceInstanceName: { eq: "download" }
        relativeDirectory: { eq: "prereleases" }
        childJson: { tagName: { in: $selectedPreReleases } }
      }
      sort: { fields: childJson___name, order: DESC }
    ) {
      nodes {
        childJson {
          name
          tagName
          publishedAt
          releaseAssets {
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
`;

export default Download;
