import React from "react";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import * as styles from "./Architecture.module.css";
import { useAssets } from "./Releases";

export default function Architecture() {


    return (
        <a href="#faq-architecture" className={classNames(styles.architecture)}>Which version do I need?</a>
    )

}

export function ArchitectureInfo() {
    const assets = useAssets();

    if (!assets.find(asset => asset.name.includes('x64')) || !assets.find(asset => asset.name.includes('aarch64'))) {
        return null;
    }

    return (
        <div id="faq-architecture" className={classNames(grid.col, styles.explainer)}>
            <h3>Which version do I need?</h3>
            Put an FAQ entry about the different architectures here.
        </div>
    )
}