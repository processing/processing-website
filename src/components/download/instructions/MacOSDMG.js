import React from "react";
import DownloadButton from "../Download";
import Share from "../Share";
import classNames from "classnames";
import * as styles from "./instructions.module.css";
import { StaticImage } from "gatsby-plugin-image";


export default function MacOSDMG() {
    return (
        <ol>
            <li>Download Processing
                <div className={classNames(styles.downloads)}>
                    <DownloadButton format="dmg" arch="aarch64">Apple Silicon</DownloadButton>
                    <DownloadButton format="dmg" arch="x64">Intel</DownloadButton>
                </div>
                <a href="#faq-architecture" style={{ color: "var(--darkgray)" }}>Which version do I need?</a>
            </li>
            <li>
                Open the .dmg file
            </li>
            <li>
                Drag to applications folder<br />
                <StaticImage width={400} src="../../../images/mac-installation.png" />
            </li>
            <Share />
        </ol>
    )
}