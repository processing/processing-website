import React from 'react';
import classnames from 'classnames';

import ProcessingIcon from '../images/logo-processing.svg';

import * as css from './CopyButton.module.css';

const OpenWithButton = ({ text }) => {
    return (
        <a
            href={`pde://sketch/base64/${btoa(text)}`}
            type="button"
            onClick={openWithProcessing}
            className={classnames(css.root)}
        >
            <ProcessingIcon /> {'Open With Processing'}
        </a>
    )
}

export default OpenWithButton;