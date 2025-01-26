import React from 'react';
import classnames from 'classnames';

import ProcessingIcon from '../images/logo-processing.svg';

import * as css from './CopyButton.module.css';

const OpenWithButton = ({ text }) => {
    return (
        <a
            href={`pde://sketch/base64/${stringToBase64(text)}`}
            type="button"
            className={classnames(css.root)}
        >
            <ProcessingIcon /> {'Open With Processing'}
        </a>
    )
}

export default OpenWithButton;

function stringToBase64(str) {
    if (typeof Buffer !== 'undefined') {
        return Buffer.from(str).toString('base64');
    }
    return btoa(str);
}
