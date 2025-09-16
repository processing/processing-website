import React from "react"
import { usePlatform, usePlatforms } from "./Platform";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import * as styles from './Switcher.module.css';

export default function Switcher() {
    const platforms = usePlatforms();
    const current = usePlatform();

    return (

        <ul className={classNames(grid.col, styles.container)}>
            {platforms.map(node => (
                <li key={node.name} className={node.name === current.name ? classNames(styles.active) : undefined}>
                    <a href={`/download/${node.name}`}>{node.title}</a>
                </li>
            ))}
        </ul>
    )
}