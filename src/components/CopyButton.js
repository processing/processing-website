import React, { useState } from 'react';
import classnames from 'classnames';

import CopyToClipboard from './CopyToClipboard';

import CopyIcon from '../images/copy-icon.svg';

import css from './CopyButton.module.css';

const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = (text, res) => {
    if (res) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  };

  return (
    <CopyToClipboard text={text} onCopy={onCopy}>
      <button
        type="button"
        className={classnames(css.root, { [css.copied]: isCopied })}>
        <CopyIcon /> {isCopied ? 'Copied' : 'Copy'}
      </button>
    </CopyToClipboard>
  );
};

export default CopyButton;
