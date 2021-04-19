import React from 'react';
import copy from 'copy-to-clipboard';

const CopyToClipboard = ({ children, text, onCopy, options }) => {
  const onClick = (event) => {
    const elem = React.Children.only(children);
    const res = copy(text, options);

    onCopy && onCopy(text, res);

    if (elem && elem.props && typeof elem.props.onClick === 'function') {
      elem.props.onClick(event);
    }
  };

  const elem = React.Children.only(children);

  return React.cloneElement(elem, { onClick });
};

export default CopyToClipboard;
