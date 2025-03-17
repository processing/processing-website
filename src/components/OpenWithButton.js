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
                    <p>If this did not open Processing, make sure you have it installed and opened at least once.</p>
                    <p>Currently only versions of Processing later than 4.4 are supported</p>
                    <a href="https://www.processing.org/download/" target="_black">Download Processing</a>
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