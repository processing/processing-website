import React from "react"
import { PlatformIcon, usePlatform, usePlatforms } from "./Platform";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import * as styles from './Switcher.module.css';
import { useVersion } from "./Version";

export default function Switcher() {
    const platforms = usePlatforms();
    const current = usePlatform();

    const version = useVersion() ?? "";

    return (

        <ul className={classNames(grid.col, styles.container)}>
            {platforms.map(node => (
                <a href={`/download/${node.name}/${version}`} key={node.name}>
                    <li className={node.name === current.name ? classNames(styles.active) : undefined}>
                        <PlatformIcon platform={node} />
                        {node.title}
                    </li>
                </a>
            ))}
        </ul>
    )
}