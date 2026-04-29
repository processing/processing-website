import React from 'react';
import ErrorPage from '../components/ErrorPage';

const NotFoundPage = () => (
  <ErrorPage
    titleId="pageNotFound"
    headingId="notFound"
    textId="notFoundText"
  />
);

export default NotFoundPage;
