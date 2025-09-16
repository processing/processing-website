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
                <li key={node.name} className={node.name === current.name ? classNames(styles.active) : undefined}>
                    <PlatformIcon platform={node} />
                    <a href={`/download/${node.name}/${version}`}>{node.title}</a>
                </li>
            ))}
        </ul>
    )
}