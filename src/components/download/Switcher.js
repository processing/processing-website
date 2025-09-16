import React from "react"
import { usePlatform, usePlatforms } from "./Platform";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';

export default function Switcher() {
    const platforms = usePlatforms();
    const current = usePlatform();

    return (

        <ul style={{ flexBasis: 'var(--col8)', flexDirection: "row", display: "flex", gap: 20 }} className={classNames(grid.col)}>
            {platforms.map(node => (
                <li key={node.name}>
                    <a href={`/download/${node.name}`}>{node.title}</a>
                </li>
            ))}
        </ul>
    )
}