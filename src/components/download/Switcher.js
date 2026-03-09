import React from "react"
import { PlatformIcon, usePlatform, usePlatforms } from "./Platform";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import * as styles from './Switcher.module.css';
import { useVersion, useLatestVersion } from "./Version";
import { Link } from "gatsby";

export default function Switcher() {
    const platforms = usePlatforms();
    const current = usePlatform();

    const latest = useLatestVersion();
    const version = useVersion();

    return (
        <div className={classNames(grid.grid, grid.container, styles.container)}>
            <div className={classNames(styles.info)}>
                <h1>
                    Get Processing {version ?? latest} for {current.title}
                </h1>
                <p>
                    Processing is open source and is available for macOS, Windows, and Linux. Projects created with Processing are also cross-platform, and can be used on macOS, Windows, Android, Raspberry Pi, and many other Linux platforms.
                </p>
            </div>
            <ul className={classNames(grid.col, styles.bar)}>
                <p>
                    Or select your OS:
                </p>
                {platforms
                    .map(node => (
                        // TODO: Convert to button and add extra variants to the button + hover states
                        <Link to={`/download/${node.name}/${version ?? ""}`} key={node.name}>
                            <li className={node.name === current.name ? classNames(styles.active) : undefined}>
                                <PlatformIcon platform={node} />
                                {node.title}
                            </li>
                        </Link>
                    ))}
            </ul>
        </div>
    )
}