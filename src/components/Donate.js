import classNames from "classnames"
import React from "react"
import * as grid from 'styles/grid.module.css';

export default function Donate() {
    return (
        <div style={{ flexBasis: 'var(--col4)', minHeight: 400, background: "#eee" }} className={classNames(grid.col)}>
            Donate
        </div>
    )
}