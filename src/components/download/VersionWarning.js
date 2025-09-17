import classnames from 'classnames';
import React from 'react';
import * as grid from 'styles/grid.module.css';
import * as styles from './VersionWarning.module.css';
import { useLatestVersion, useVersion } from './Version';
import Button from 'components/Button';
import { usePlatform } from './Platform';

export default function VersionWarning() {
    const version = useVersion();
    const latestVersion = useLatestVersion();
    const platform = usePlatform()

    if (version === undefined) {
        return null;
    }
    if (version === latestVersion) {
        return null;
    }

    return (
        <div className={classnames(grid.grid, grid.container, styles.alert)}>
            <div className={classnames(styles.content)}>(!) This is not the latest release of Processing. <Button href={`/download/${platform.name}`}>Go to {latestVersion}</Button></div>
        </div>
    )
}