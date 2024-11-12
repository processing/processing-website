import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { truncate } from '../utils';

export const HeadMatter = ({
  title,
  description,
  img,
  twitterType,
  ogType
}) => {
  const location = useLocation();
  const shortDescription = truncate(
    description ? description.replace(/\s+/g, ' ') : '',
    200
  ).trim();

  let imgUrl;
  if (img) {
    const imgSrc = img.images.fallback.src;
    imgUrl = /^http/.test(imgSrc) ? imgSrc : 'https://processing.org/' + imgSrc;
  }

  imgUrl = imgUrl || '/img/banner.png';

  const pageUrl = 'https://processing.org/' + location.pathname;
  return (
    <Helmet>
      <title>{title}</title>
      {/* Twitter */}
      <meta
        name="twitter:card"
        content={twitterType || img ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:site" content="@ProcessingOrg" />
      <meta name="twitter:creator" content="@ProcessingOrg" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={shortDescription} />
      {imgUrl && <meta name="twitter:image" content={imgUrl} />}

      {/* Open Graph */}
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={'Processing'} />
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={shortDescription} />
      {imgUrl && <meta property="og:image" content={imgUrl} />}
    </Helmet>
  );
};

export default HeadMatter;
