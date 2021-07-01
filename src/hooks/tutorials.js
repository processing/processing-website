import { useMemo } from 'react';
import { useIntl } from 'react-intl';

/**
  Hook to prepare the trail used for the breadcumbs
  Example: Learn > Tutorials > Text Tutorials
**/
export const useTrail = (example) => {
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
