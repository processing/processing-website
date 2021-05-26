import React, { memo } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import LogoProcessing from '../images/logo-processing.svg';

import { usePreparedReleases } from '../hooks/download';

import css from '../styles/templates/download.module.css';

const Download = ({ data }) => {
  const intl = useIntl();
  const releases = usePreparedReleases(data.releases.nodes);
  const preReleases = usePreparedReleases(data.preReleases.nodes);

  return (
    <Layout>
      <Helmet>
        <title>Download</title>
      </Helmet>
      <div className={css.root}>
        <div className={css.content}>
          <Donate />
          <h1>Download</h1>
          <h3>{intl.formatMessage({ id: 'downloadIntro' })}</h3>
          <LatestRelease release={releases[0]} />
          <ul className={css.links}>
            <li>
              <a href={'https://github.com/processing'}>GitHub</a>
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
          <p>{intl.formatMessage({ id: 'downloadChanges' })}</p>
          <ReleasesList
            releases={releases}
            title={intl.formatMessage({ id: 'stable' })}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: 'earlierReleases' })
            }}
          />
          <ReleasesList
            releases={preReleases}
            title={intl.formatMessage({ id: 'preReleases' })}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: 'downloadOutro' })
            }}></p>
        </div>
      </div>
    </Layout>
  );
};

const LatestRelease = memo(({ release }) => {
  return (
    <div className={css.latestRelease}>
      <div className={css.logo}>
        <LogoProcessing />
        <h3>Processing</h3>
      </div>
      <div className={css.latestDownloads}>
        <div className={css.latestLabel}>
          <span className={css.latestNumber}>{release.version}</span>
          <span className={css.latestDate}>({release.publishedAt})</span>
        </div>
        {release.assets.map((asset, i) => (
          <div key={asset.url} className={css.latestVersion}>
            <a href={asset.url}>
              <span className={css.latestVersionName}>{asset.os}</span>
              {asset.bit && (
                <span className={css.latestVersionBit}>{asset.bit}</span>
              )}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
});

const ReleasesList = memo(({ releases, title }) => {
  return (
    <div className={css.releases}>
      <h3>{title}</h3>
      <ul className={css.table}>
        {releases.map((release) => (
          <li className={css.row} key={release.name}>
            <span className={css.releaseName}>{release.version}</span>
            <span className={css.releaseDate}>({release.publishedAt})</span>
            <span className={css.releaseAssets}>
              {release.assets.map((asset, i) => {
                return (
                  <a href={asset.url} className={css.assetLink} key={asset.url}>
                    {asset.os} {asset.bit}
                  </a>
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
