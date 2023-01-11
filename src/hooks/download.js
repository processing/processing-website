import { useCallback, useEffect, useMemo, useState } from 'react';

const getOS = (name) => {
  if (name.includes('windows') || name.includes('.exe')) return 'Windows';
  else if (name.includes('linux')) return 'Linux';
  else if (name.includes('macos')) return 'MacOS';
  else return 'Unknown';
};

const getBit = (name) => {
  if (name.includes('x64')) return 'Intel 64-bit';
  else if (name.includes('windows64')) return '64-bit';
  else if (name.includes('windows32')) return '32-bit';
  else if (name.includes('macos-aarch64')) return 'Apple Silicon';
  else if (name.includes('linux-arm32')) return 'Raspberry Pi 32-bit';
  else if (name.includes('linux-arm64')) return 'Raspberry Pi 64-bit';
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
        assets: []
      };

      // Prepare release assets
      for (let j = 0; j < release.releaseAssets.edges.length; j++) {
        const asset = release.releaseAssets.edges[j].node;
        item.assets.push({
          name: asset.name,
          os: getOS(asset.name),
          bit: getBit(asset.name),
          url: asset.downloadUrl,
          size: formatBytes(asset.size)
        });
      }

      prepared.push(item);
    }

    return prepared;
  }, [releases]);
};

/**
  Hook to detect the OS where the site is mounted. 
  Will default to Windows if fails to detect other.
**/
export const useMachineOS = (releases) => {
  const [selected, setSelected] = useState({ os: '', asset: null });

  const selectAsset = useCallback(
    (asset) => {
      setSelected({ os: asset.os, asset });
    },
    [setSelected]
  );

  const selectOS = (os) => {
    const osReleases = releases[os];
    const lastAsset = osReleases[osReleases.length - 1];
    selectAsset(lastAsset);
  };

  useEffect(() => {
    const { userAgent } = navigator;
    if (userAgent.search('Windows') !== -1) {
      selectOS('Windows');
    } else if (userAgent.search('Mac') !== -1) {
      selectOS('MacOS');
    } else if (userAgent.search('X11') !== -1) {
      selectOS('Linux');
    } else {
      selectOS('Windows');
    }
  }, []);

  return [selected, selectAsset];
};
