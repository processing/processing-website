import React, { memo, useState } from 'react';
import { navigate, graphql } from 'gatsby';
import { useIntl } from 'react-intl';
import classnames from 'classnames';

import HeadMatter from '../components/HeadMatter';

import Layout from '../components/Layout';

import { usePreparedReleases } from '../hooks/download';

import * as css from '../styles/templates/releases.module.css';

const Releases = ({ data }) => {
  const intl = useIntl();
  const releases = usePreparedReleases(data.releases.nodes);
  const preReleases = usePreparedReleases(data.preReleases.nodes);

  const onAfterDownload = () => {
    const goToDonate = () => {
      window.removeEventListener('focus', goToDonate);
      setTimeout(() => {
        navigate('/donate');
      }, 3000);
    };
    window.addEventListener('focus', goToDonate);
  };

  return (
    <Layout>
      <HeadMatter title={intl.formatMessage({ id: 'releasesTitle' })} />

      <div className={css.content}>
        <ReleaseSection
          releases={releases}
          title={intl.formatMessage({ id: 'stable' })}
          onAfterDownload={onAfterDownload}
          intro={
            <p
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: 'releasesIntro' })
              }}></p>
          }
          outro={
            <p
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: 'releasesOutro' })
              }}></p>
          }
        />

        <ReleaseSection
          releases={preReleases}
          title={intl.formatMessage({ id: 'preReleases' })}
          onAfterDownload={onAfterDownload}
        />
      </div>
    </Layout>
  );
};

const ReleaseSection = memo(
  ({ releases, title, onAfterDownload, intro, outro }) => {
    return (
      releases.length > 0 && (
        <div className={css.releaseSection}>
          <h1>{title}</h1>
          <div className={css.releaseListContainer}>
            {intro}
            <ul>
              {releases.map((release, index) => (
                <Release
                  release={release}
                  onAfterDownload={onAfterDownload}
                  key={index}
                />
              ))}
            </ul>
            {outro}
          </div>
        </div>
      )
    );
  }
);

const Release = memo(({ release, onAfterDownload }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={css.release}>
      <div
        className={css.releaseHeader}
        role="button"
        tabIndex="0"
        onClick={() => setIsOpen((o) => !o)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') setIsOpen((o) => !o);
        }}>
        <span
          className={classnames(css.openIcon, { [css.open]: isOpen })}></span>
        <span className={css.releaseName}>Version {release.version} -</span>
        <span className={css.releaseDate}>({release.publishedAt})</span>
      </div>

      {isOpen && (
        <ul className={css.releaseAssets}>
          {release.assets.map((asset, i) => {
            return (
              <li>
                <a
                  href={asset.url}
                  onClick={onAfterDownload}
                  className={css.assetLink}
                  key={asset.url}>
                  {asset.os} {asset.bit}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </li>
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
                size
              }
            }
          }
        }
      }
    }
    preReleases: allFile(
      filter: {
        sourceInstanceName: { eq: "download" }
        relativeDirectory: { eq: "releases" }
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
                size
              }
            }
          }
        }
      }
    }
  }
`;

export default Releases;
