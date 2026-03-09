import React from "react";
import DownloadButton from "../Download";
import Share from "../Share";
import classNames from "classnames";
import * as styles from "./instructions.module.css";
import { StaticImage } from "gatsby-plugin-image";
import Architecture from "../Architecture";


export default function MacOSDMG() {
    return (
        <ol className={classNames(styles.instructions)}>
            <li>
                Download Processing for macOS
                <div className={classNames(styles.downloads)}>
                    <DownloadButton format="dmg" id="IWSPGL5F" arch="aarch64">Apple Silicon</DownloadButton>
                    <DownloadButton format="dmg" id="VQUBVEQR" arch="x64">Intel</DownloadButton>
                    <Architecture />
                </div>
            </li>
            <li>
                Open the <strong>.dmg</strong> file and move <strong>Processing.app</strong> to the <strong>Applications</strong> folder<br />
                <StaticImage width={400} src="../../../images/mac-installation.png" />
            </li>
        </ol>
    )
}