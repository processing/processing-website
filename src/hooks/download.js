import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

const getOS = (name) => {
  if (name.includes('windows') || name.includes('.exe')) return 'Windows';
  if (name.includes(".snap")) return "Linux & Raspbery  Pi";
  else if (name.includes('linux-arm')) return 'Raspberry Pi';
  else if (name.includes('linux-aarch64')) return 'Raspberry Pi';
  else if (name.includes('linux')) return 'Linux';
  else if (name.includes('macos')) return 'macOS';
  else return 'Unknown';
};

const getBit = (name) => {
  if (name.includes('x64')) return 'Intel';
  else if (name.includes('windows64')) return '64-bit';
  else if (name.includes('windows32')) return '32-bit';
  else if (name.includes('macos-aarch64')) return 'Apple Silicon';
  else if (name.includes('linux-arm32')) return '32-bit';
  else if (name.includes('linux-arm64')) return '64-bit';
  else if (name.includes('linux-aarch64')) return 'Arm';
  else return null;
};

const getTooltip = (name, intProvider) => {
  if (name.includes('windows')) return intProvider('windowsIntelAssetTooltip');
  else if (name.includes('macos-aarch64'))
    return intProvider('macOsSiliconAssetTooltip');
  else if (name.includes('macos')) return intProvider('macOsIntelAssetTooltip');
  else if (name.includes('linux-arm32'))
    return intProvider('raspberryPi32AssetTooltip');
  else if (name.includes('linux-arm64'))
    return intProvider('raspberryPi64AssetTooltip');
  else if (name.includes('linux')) return intProvider('linuxIntelAssetTooltip');
  else return null;
};

// Adapted from https://stackoverflow.com/q/15900485
function formatBytes(bytes, decimals = 0) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
  Hook to find turn a releases GraphQL array into an array of objects
  to use on the download page
  @param {Array} releases Array of releases JSON files
**/
export const usePreparedReleases = (releases) => {
  const intl = useIntl();

  return useMemo(() => {
    const prepared = [];

    for (let i = 0; i < releases.length; i++) {
      const release = releases[i].childJson;

      // Prepare release
      const item = {
        name: release.name,
        version: release.name.replace('Processing', '').trim(),
        publishedAt: new Date(release.publishedAt).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        assets: [],
        assetsByOs: { Windows: [], macOS: [], Linux: [], 'Raspberry Pi': [], "Linux & Raspbery  Pi": [] }
      };

      // Prepare release assets
      for (let j = 0; j < release.releaseAssets.edges.length; j++) {
        const asset = release.releaseAssets.edges[j].node;
        if (asset.name.includes('portable')) continue;
        if (asset.name.includes(".snap")) {
          asset.downloadUrl = process.env.SNAPSTORE_URL ?? "https://snapcraft.io/processing";
          if (asset.name.includes("aarch64")) {
            asset.downloadUrl += "/raspbian"
          }
        }
        item.assets.push({
          name: asset.name,
          os: getOS(asset.name),
          bit: getBit(asset.name),
          url: asset.downloadUrl,
          size: formatBytes(asset.size),
          tooltipMessage: getTooltip(asset.name, (id) =>
            intl.formatMessage({ id })
          )
        });
      }

      for (let asset of item.assets) {
        if (asset.os in item.assetsByOs) {
          item.assetsByOs[asset.os].push(asset);
        }
      }
      for (let os in item.assetsByOs) {
        item.assetsByOs[os].sort((a, b) => {
          if (a.bit === b.bit) return 0;
          if (a.bit != null && a.bit.includes('Intel')) return 1;
          if (b.bit != null && b.bit.includes('Intel')) return -1;
          return 0;
        });
      }

      prepared.push(item);
    }

    return prepared;
  }, [intl, releases]);
};

/**
  Hook to detect the OS where the site is mounted. 
  Will default to Windows if fails to detect other.
**/
export const useMachineOS = (releases) => {
  const [detected, setDetected] = useState({
    os: '',
    asset: null
  });

  const selectAsset = useCallback(
    (asset) => {
      setDetected({ os: asset.os, asset });
    },
    [setDetected]
  );

  useEffect(() => {
    const selectOS = (os) => {
      const osReleases = releases[os];
      const firstAsset = osReleases[0];
      selectAsset(firstAsset);
    };

    const { userAgent } = navigator;
    if (userAgent.search('Windows') !== -1) {
      selectOS('Windows');
    } else if (userAgent.search('Mac') !== -1) {
      selectOS('macOS');
    } else if (userAgent.search('X11') !== -1) {
      selectOS('Linux');
    } else {
      selectOS('Windows');
    }
  }, [releases, selectAsset]);

  return detected;
};
