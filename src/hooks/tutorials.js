import { useMemo } from 'react';
import { useIntl } from 'react-intl';

/**
  Hook to prepare the video and text examples
**/
export const usePreparedTutorials = (tutorials) => {
  return useMemo(() => {
    let prepared = [];

    for (let i = 0; i < tutorials.length; i++) {
      const { coverImage, ...rest } = tutorials[i].childMdx.frontmatter;
      prepared.push({
        ...rest,
        image: coverImage.childImageSharp.fluid
      });
    }

    return prepared;
  }, [tutorials]);
};

/**
  Hook to prepare the trail used for the breadcumbs
  Example: Learn > Tutorials > Text Tutorials
**/
export const useTrail = () => {
  const intl = useIntl();

  return useMemo(() => {
    return [
      intl.formatMessage({ id: 'learn' }),
      {
        slug: '/tutorials',
        label: intl.formatMessage({ id: 'tutorials' })
      },
      {
        slug: '/tutorials#text-tutorials',
        label: intl.formatMessage({ id: 'textTutorials' })
      }
    ];
  }, [intl]);
};
