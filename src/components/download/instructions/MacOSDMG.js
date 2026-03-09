import React from "react";
import DownloadButton from "../Download";
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
                    <DownloadButton format="dmg" variant="download1" id="IWSPGL5F" arch="aarch64">Apple Silicon</DownloadButton>
                    <DownloadButton format="dmg" variant="download2" id="VQUBVEQR" arch="x64">Intel</DownloadButton>

                </div>
                <Architecture />
            </li>
            <li>
                Open the <strong>.dmg</strong> file and move <strong>Processing.app</strong> to the <strong>Applications</strong> folder<br />
                <StaticImage width={400} src="../../../images/mac-installation.png" />
            </li>
        </ol>
    )
}