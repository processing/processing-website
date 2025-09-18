import React from "react"
import { PlatformIcon, usePlatform, usePlatforms } from "./Platform";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import * as styles from './Switcher.module.css';
import { useVersion } from "./Version";
import { Link } from "gatsby";

export default function Switcher() {
    const platforms = usePlatforms();
    const current = usePlatform();

    const version = useVersion() ?? "";

    return (
        <div className={classNames(grid.grid, grid.container, styles.container)}>
            <ul className={classNames(grid.col, styles.bar)}>
                {platforms.map(node => (
                    // TODO: Convert to button and add extra variants to the button + hover states
                    <Link to={`/download/${node.name}/${version}`} key={node.name}>
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