import React from 'react';
import ErrorPage from '../components/ErrorPage';

const TooManyRequestsPage = () => (
  <ErrorPage
    titleId="tooManyRequestsTitle"
    headingId="tooManyRequests"
    textId="tooManyRequestsText"
  />
);

export default TooManyRequestsPage;
