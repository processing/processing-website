import { useMemo } from 'react';

const getOS = (name) => {
  if (name.includes('windows') || name.includes('.exe')) return 'Windows';
  else if (name.includes('linux')) return 'Linux';
  else if (name.includes('macos')) return 'MacOS';
  else return 'Unknown';
};

const getBit = (name) => {
  if (name.includes('x64')) return '(Intel 64-bit)';
  else if (name.includes('macos-aarch64')) return '(Apple Silicon)';
  else if (name.includes('linux-arm32')) return 'Raspberry Pi 32-bit';
  else if (name.includes('linux-arm64')) return 'Raspberry Pi 64-bit';
  else return null;
};

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
          url: asset.downloadUrl
        });
      }

      prepared.push(item);
    }

    return prepared;
  }, [releases]);
};
