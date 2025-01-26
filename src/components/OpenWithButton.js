import React from 'react';
import classnames from 'classnames';

import ProcessingIcon from '../images/logo-processing.svg';

import * as css from './CopyButton.module.css';

const OpenWithButton = ({ text }) => {
    const openWithProcessing = () => {
        window.open('pde://sketch/base64/' + btoa(text));
    };

    return (
        <button
            type="button"
            onClick={openWithProcessing}
            className={classnames(css.root)}
        >
            <ProcessingIcon /> {'Open With Processing'}
        </button>
    )
}

export default OpenWithButton;