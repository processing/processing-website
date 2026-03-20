import React from "react";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import * as styles from "./Architecture.module.css";
import { useAssets } from "./Releases";

export default function Architecture() {


    return (
        <a href="https://github.com/processing/processing4/wiki/How-do-I-know-if-my-Mac-has-Intel-Processor-or-Apple-Silicon%3F" className={classNames(styles.architecture)}>Which version should I download?</a>
    )

}

export function ArchitectureInfo() {
    const assets = useAssets();

    if (!assets.find(asset => asset.name.includes('x64')) || !assets.find(asset => asset.name.includes('aarch64'))) {
        return null;
    }

    return (
        <div id="faq-architecture" className={classNames(grid.col, styles.explainer)}>
            <h3>Which version should I download?</h3>
            Put an FAQ entry about the different architectures here.
        </div>
    )
}