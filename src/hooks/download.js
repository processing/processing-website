import { useMemo } from 'react';
import { DateTime } from 'luxon';

const getOS = (name) => {
  if (name.includes('windows') || name.includes('.exe')) return 'Windows';
  else if (name.includes('linux')) return 'Linux';
  else if (name.includes('mac')) return 'Mac OS X';
  else return 'Unknown';
};

const getBit = (name) => {
  if (name.includes('32')) return '32-bit';
  else if (name.includes('64')) return '64-bit';
  else if (name.includes('armv6hf')) return 'ARMv6hf';
  else if (name.includes('.exe')) return 'exe';
  else return null;
};

/**
  Hook to find turn a releases GraphQL array into an array of objects
  to use on the download page
  @param {Array} examples Array of releases JSON files
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
        publishedAt: DateTime.fromISO(release.publishedAt).toLocaleString(
          DateTime.DATE_FULL
        ),
        assets: [],
      };

      // Prepare release assets
      for (let j = 0; j < release.releaseAssets.edges.length; j++) {
        const asset = release.releaseAssets.edges[j].node;
        item.assets.push({
          name: asset.name,
          os: getOS(asset.name),
          bit: getBit(asset.name),
          url: asset.downloadUrl,
        });
      }

      prepared.push(item);
    }

    return prepared;
  }, [releases]);
};
