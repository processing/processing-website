import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { navigate, graphql } from 'gatsby';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import { useGoal } from 'gatsby-plugin-fathom';

import HeadMatter from '../components/HeadMatter';

import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import LogoWindows from '../images/logo-windows.svg';
import LogoMac from '../images/logo-macos.svg';
import LogoLinux from '../images/logo-linux.svg';
import LogoRaspberry from '../images/logo-raspberry.svg';

import InfoIcon from '../images/info-icon.svg';

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

// Set to false to hide the Donate character
const showDonate = false;

const Download = ({ data }) => {
  const intl = useIntl();
  const releases = usePreparedReleases(data.releases.nodes);
  const prereleases = usePreparedReleases(data.prereleases.nodes);

  const [selectedRelease, setSelectedRelease] = useState(releases[0]);

  // gatsby-plugin-fathom requires us to use hooks
  const trackWindows = useGoal('CIMDWXJV');
  const trackMacIntel = useGoal('VQUBVEQR');
  const trackMacSilicon = useGoal('IWSPGL5F');
  const trackLinux = useGoal('HHYWFK7G');
  const trackPi32 = useGoal('ZKSBBVWD');
  const trackPi64 = useGoal('TXVODVYO');

  const onAfterDownload = (asset) => {
    if (asset) {
      if (asset.os === 'Windows') {
        trackWindows(0);
      } else if (asset.os === 'macOS' && asset.bit === 'Intel 64-bit') {
        trackMacIntel(0);
      } else if (asset.os === 'macOS' && asset.bit === 'Apple Silicon') {
        trackMacSilicon(0);
      } else if (asset.os === 'Linux') {
        trackLinux(0);
      } else if (asset.os === 'Raspberry Pi' && asset.bit === '32-bit') {
        trackPi32(0);
      } else if (asset.os === 'Raspberry Pi' && asset.bit === '64-bit') {
        trackPi64(0);
      } else {
        console.error(`Untracked asset: ${asset}`);
      }
    }

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
        title={intl.formatMessage({ id: 'downloadTitleMeta' })}
        description={intl.formatMessage({ id: 'downloadIntro' })}
      />

      <div className={classnames(grid.container, grid.grid)}>
        <div className={classnames(grid.col, css.headerContent)}>
          {showDonate && <Donate />}
          <h1>{intl.formatMessage({ id: 'downloadTitle' })}</h1>
          <p>{intl.formatMessage({ id: 'downloadIntro' })}</p>
        </div>
      </div>

      <PreReleaseSwitch
        releases={releases}
        prereleases={prereleases}
        selectedRelease={selectedRelease}
        setSelectedRelease={setSelectedRelease}
      />

      {selectedRelease.version === "4.3.1" && <a href='https://github.com/processing/processing4-carbon-aug-19/wiki/Announcing-Processing-4.3.1-(release-candidate)' style={{ textAlign: "center", display: "block", paddingTop: "var(--gutter)", textDecoration: "underline" }}> Read the announcement</a>}

      <MainDownloadSection
        release={selectedRelease}
        onAfterDownload={onAfterDownload}
      />

      <OSSectionContainer
        release={selectedRelease}
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

const PreReleaseSwitch = memo(({ releases, prereleases, selectedRelease, setSelectedRelease }) => {
  const intl = useIntl();

  return (
    <>
      {
        prereleases.length > 0 && (
          <div className={classnames(grid.container, grid.grid, css.preReleaseSwitchContainer)}>
            <div className={classnames(grid.col, css.preReleaseSwitch)}>
              <button className={selectedRelease === releases[0] ? css.selected : ""} onClick={() => setSelectedRelease(releases[0])}>
                {intl.formatMessage({ id: 'main' })} ({releases[0].version})
              </button>
              <button className={selectedRelease === prereleases[0] ? css.selected : ""} onClick={() => setSelectedRelease(prereleases[0])}>
                {intl.formatMessage({ id: 'beta' })} ({prereleases[0].version})
              </button>
            </div>
          </div>
        )
      }
    </>
  )
});

const MainDownloadSection = memo(({ release, onAfterDownload }) => {
  const intl = useIntl();
  const detectedAsset = useMachineOS(release.assetsByOs, release.publishedAt);

  const appleSiliconAsset = useMemo(() => release.assets.find(asset => detectedAsset.os === "macOS" && asset.os === "macOS" && asset.bit === "Intel"), [release, detectedAsset]);

  return (
    <div className={classnames(grid.container, grid.grid)}>
      <div className={classnames(grid.col, css.mainDownloadButtonContainer)}>
        <a
          className={css.mainDownloadButton}
          href={detectedAsset.os !== '' ? detectedAsset.asset.url : ''}
          onClick={() => onAfterDownload(detectedAsset.asset)}>
          <span>
            {intl.formatMessage({ id: 'download' })} Processing{' '}
            {release.version} {intl.formatMessage({ id: 'for' })}{' '}
            {detectedAsset.os}
          </span>
        </a>

        {detectedAsset.asset && (
          <div>
            <p className={css.osBit}>
              {detectedAsset.asset.os}
              {detectedAsset.asset.bit && (
                <>
                  {' •'} {detectedAsset.asset.bit}
                </>
              )}
              {detectedAsset.asset.size && (
                <>
                  {' •'} {detectedAsset.asset.size}
                </>
              )}
              <span className={css.preTooltipDot}>{' •'}</span>
            </p>
            <InfoTooltip
              asset={detectedAsset.asset}
              date={release.publishedAt}
              className={css.downloadDetailsTooltip}
            />
          </div>
        )}
        {appleSiliconAsset && (
          <div>
            <p
              className={css.appleSiliconWarning}
              dangerouslySetInnerHTML={{
                __html: intl
                  .formatMessage({ id: 'macOsIntelWarning' })
                  .replace('{0}', appleSiliconAsset.url)
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
});

const InfoTooltip = ({ asset, date, className, zIndex, translateX }) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef();

  useEffect(() => {
    if (open) {
      const dropdownRect = tooltipRef.current.getBoundingClientRect();
      const dropdownRightX = dropdownRect.x + dropdownRect.width;
      if (dropdownRightX > window.innerWidth) {
        tooltipRef.current.style.left = 'auto';
        tooltipRef.current.style.right = '0';
        tooltipRef.current.style.transform = 'none';
      }

      const outsideInteraction = (e) => {
        if (tooltipRef.current == null) return;
        if (tooltipRef.current.contains(e.target)) return;
        if (
          !e.target.contains(tooltipRef.current) ||
          (e.target.contains(tooltipRef.current) &&
            e.target !== tooltipRef.current)
        )
          setOpen(false);
      };
      document.addEventListener('click', outsideInteraction);
      return () => {
        document.removeEventListener('click', outsideInteraction);
      };
    }
  }, [open]);

  return (
    <div
      className={classnames(css.infoTooltipContainer, className, {
        [css.open]: open
      })}
      style={{ zIndex: zIndex }}>
      <button onClick={() => setOpen((o) => !o)}>
        <InfoIcon />
      </button>

      {open && (
        <div className={css.tooltip} ref={tooltipRef}>
          <p
            dangerouslySetInnerHTML={{
              __html: asset.tooltipMessage
            }}
          />

          <p className={css.tooltipDate}>
            {intl.formatMessage({ id: 'publishedOn' })} {date}
          </p>
        </div>
      )}
    </div>
  );
};

const osAndComponents = [
  { osName: 'Windows', logoComponent: <LogoWindows /> },
  { osName: 'macOS', logoComponent: <LogoMac /> },
  { osName: "Linux & Raspbery Pi", logoComponent: <div className='flex'><LogoLinux /><LogoRaspberry /> </div> },
  { osName: 'Linux', logoComponent: <LogoLinux /> },
  { osName: 'Raspberry Pi', logoComponent: <LogoRaspberry /> },
];

const OSSectionContainer = memo(({ release, onAfterDownload }) => {
  const intl = useIntl();
  const [selectedOs, setSelectedOs] = useState('');

  return (
    <div className={css.osSectionContainer}>
      <p>{intl.formatMessage({ id: 'otherVersions' })}</p>
      <div className={css.osSectionList}>
        {osAndComponents.map((os, index) => (
          <OSSection
            key={index}
            logoComponent={os.logoComponent}
            osName={os.osName}
            assets={release.assetsByOs[os.osName]}
            date={release.publishedAt}
            isSelected={selectedOs === os.osName}
            onSelect={() =>
              setSelectedOs((s) => (s !== os.osName ? os.osName : ''))
            }
            onAfterDownload={onAfterDownload}
          />
        ))}
      </div>
    </div>
  );
});

const OSSection = memo(
  ({
    logoComponent,
    osName,
    assets,
    date,
    isSelected,
    onSelect,
    onAfterDownload
  }) => {
    if (assets === undefined || assets?.length === 0) return null;
    return (
      <div
        className={classnames(css.osSection, {
          [css.selectedOsSection]: isSelected
        })}>
        <button className={css.osButton} onClick={() => onSelect()}>
          {logoComponent}
          <h2>{osName}</h2>
        </button>

        <ul className={css.assetList}>
          {isSelected &&
            assets.map((asset, index) => (
              <li key={index} className={css.assetContainer}>
                <a
                  className={css.asset}
                  href={asset.url}
                  onClick={() => onAfterDownload(asset)}>
                  {asset.bit && <>{asset.bit}</>}
                </a>
                <InfoTooltip
                  asset={asset}
                  date={date}
                  className={css.assetTooltip}
                  zIndex={assets.length - index}
                />
              </li>
            ))}
        </ul>
      </div>
    );
  }
);

export const Link = memo(({ href, icon, title, description }) => (
  <li>
    <a href={href}>
      {icon}
      {title}
    </a>
    <p>{description}</p>
  </li>
));

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
          isPrerelease
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
    prereleases: allFile(
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
          isPrerelease
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
