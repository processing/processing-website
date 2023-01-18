import React, { memo } from 'react';
import { navigate, graphql } from 'gatsby';
import { useIntl } from 'react-intl';
import classnames from 'classnames';

import HeadMatter from '../components/HeadMatter';

import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import LogoWindows from '../images/logo-windows.svg';
import LogoMac from '../images/logo-macos.svg';
import LogoLinux from '../images/logo-linux.svg';

// https://www.svgrepo.com/svg/436169/pencil-tool-pen
import CreateIcon from '../images/create-icon.svg';
// https://www.svgrepo.com/svg/385324/education-book-learn-school-library
import LearnIcon from '../images/learn-icon.svg';
// https://www.svgrepo.com/svg/364975/users-three-fill
import CommunityIcon from '../images/community-icon.svg';
import GitHubIcon from '../images/github-icon.svg';

import { useMachineOS, usePreparedReleases } from '../hooks/download';

import * as css from '../styles/templates/download.module.css';
import * as grid from '../styles/grid.module.css';

const Download = ({ data }) => {
  const intl = useIntl();
  const releases = usePreparedReleases(data.releases.nodes);

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
      <HeadMatter
        title={intl.formatMessage({ id: 'downloadTitle' })}
        description={intl.formatMessage({ id: 'downloadIntro' })}
      />

      <div className={classnames(grid.container, grid.grid)}>
        <div className={classnames(grid.col, css.headerContent)}>
          <Donate />
          <h1>{intl.formatMessage({ id: 'downloadTitle' })}</h1>
          <p>{intl.formatMessage({ id: 'downloadIntro' })}</p>
        </div>
      </div>

      <DownloadSection
        release={releases[0]}
        onAfterDownload={onAfterDownload}
      />

      <div className={css.oldVersionsSection}>
        <h2
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'olderVersions' })
          }}
        />

        <p
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'githubEarlierReleases' })
          }}
        />

        <p
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'downloadChanges' })
          }}
        />

        <p
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'earlierReleases' })
          }}
        />
      </div>

      <ul className={css.bottomLinks}>
        <Link
          title={intl.formatMessage({ id: 'getStartedTitle' })}
          description={intl.formatMessage({ id: 'getStartedDescription' })}
          href="https://hello.processing.org/"
          icon={<CreateIcon />}
        />

        <Link
          title={intl.formatMessage({ id: 'tutorialsTitle' })}
          description={intl.formatMessage({ id: 'tutorialsDescription' })}
          href="https://processing.org/tutorials"
          icon={<LearnIcon />}
        />

        <Link
          title={intl.formatMessage({ id: 'communityTitle' })}
          description={intl.formatMessage({ id: 'communityDescription' })}
          href="https://discourse.processing.org/"
          icon={<CommunityIcon />}
        />

        <Link
          title={intl.formatMessage({ id: 'contributeTitle' })}
          description={intl.formatMessage({ id: 'contributeDescription' })}
          href="https://github.com/processing/processing4"
          icon={<GitHubIcon />}
        />
      </ul>
    </Layout>
  );
};

const DownloadSection = memo(({ release, onAfterDownload }) => {
  const intl = useIntl();

  const [selected] = useMachineOS(release.assetsByOs);

  return (
    <div className={css.downloadSection}>
      <a
        className={css.bigDownloadButton}
        href={selected.os !== '' ? selected.asset.url : ''}
        onClick={onAfterDownload}>
        <span>
          {intl.formatMessage({ id: 'download' })} Processing {release.version}{' '}
        </span>
        {selected.asset && (
          <span className={css.osBit}>
            {selected.asset.os}
            {selected.asset.bit && (
              <>
                {' •'} {selected.asset.bit}
              </>
            )}
          </span>
        )}
      </a>

      <div className={css.osSectionList}>
        <OSSection
          logoComponent={<LogoWindows />}
          osName="Windows"
          assets={release.assetsByOs.Windows}
          selected={selected}
          onAfterDownload={onAfterDownload}
        />
        <OSSection
          logoComponent={<LogoMac />}
          osName="MacOS"
          assets={release.assetsByOs.MacOS}
          selected={selected}
          onAfterDownload={onAfterDownload}
        />
        <OSSection
          logoComponent={<LogoLinux />}
          osName="Linux"
          assets={release.assetsByOs.Linux}
          selected={selected}
          onAfterDownload={onAfterDownload}
        />
      </div>
    </div>
  );
});

const OSSection = memo(
  ({ logoComponent, osName, assets, selected, onAfterDownload }) => {
    const isSelected = selected.os === osName;
    const selectedBit = selected.asset?.bit;

    return (
      <div
        className={classnames(css.osSection, {
          [css.selectedOsSection]: isSelected
        })}>
        <div className={css.osLogoContainer}>
          {logoComponent}
          <h2>{osName}</h2>
        </div>

        <ul className={css.assetList}>
          {assets.map((asset, index) => (
            <li key={index}>
              <a
                className={classnames(css.asset, {
                  [css.selectedAsset]: asset.bit === selectedBit
                })}
                href={asset.url}
                onClick={onAfterDownload}>
                {asset.os}
                {asset.bit && (
                  <>
                    {' •'} {asset.bit}
                  </>
                )}
                {asset.size && (
                  <>
                    {' •'} {asset.size}
                  </>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

const Link = memo(({ href, icon, title, description }) => (
  <li>
    <a href={href}>
      {icon}
      {title}
    </a>
    <p>{description}</p>
  </li>
));

export const query = graphql`
  query($selectedReleases: [String!]!) {
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
  }
`;

export default Download;
