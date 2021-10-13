/**
  Disable inline CSS. This brings the size of the reference from 100MB to 30MB,
  just by removing inline CSS which already exists in stand-alone CSS files and
  is only used to speed up initial rendering.
**/
export const onPreRenderHTML = ({ getHeadComponents }) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  getHeadComponents().forEach((el) => {
    if (el.type === 'style' && el.props['data-href']) {
      el.type = 'link';
      el.props['href'] = el.props['data-href'];
      el.props['rel'] = 'stylesheet';
      el.props['type'] = 'text/css';
      delete el.props['data-href'];
      delete el.props['dangerouslySetInnerHTML'];
    }
  });
};
