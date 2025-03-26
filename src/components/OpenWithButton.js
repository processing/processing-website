import React, { useState } from 'react';
import classnames from 'classnames';

import ProcessingIcon from '../images/logo-processing.svg';

import * as css from './OpenWithButton.module.css';

const OpenWithButton = ({ pdes }) => {
    const main = pdes[0]
    let sketchURL = `pde://sketch/base64/${stringToBase64(main.code)}?pde=`
    for (let pde of pdes) {
        if (pde === main) continue
        sketchURL += `${pde.name}:${stringToBase64(pde.code)},`
    }
    const [showInstructions, setShowInstructions] = useState(false)

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (showInstructions && !event.target.closest(`.${css.root}`)) {
                setShowInstructions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showInstructions]);

    return (
        <a
            href={sketchURL}
            type="button"
            className={classnames(css.root)}
            onClick={() => setShowInstructions(true)}
        >
            <ProcessingIcon /> {'Open With Processing'}
            {showInstructions && (
                <div className={classnames(css.instructions)}>
                    <h1>Opening Processing<span className={css.ellipsis}></span></h1>
                    <p>If nothing happens, <a href="https://www.processing.org/download/" target="_black" className={css.downloadLink}>Download Processing</a> version 4.4.1 or later and try again.</p>
                    <p className={classnames(css.tooltipFootnote)}>Make sure Processing is installed and was opened at least once.</p>
                </div>
            )}
        </a>
    )
}

export default OpenWithButton;

function stringToBase64(str) {
    if (typeof Buffer !== 'undefined') {
        return Buffer.from(str).toString('base64');
    }
    return btoa(str)
}