import React from "react";
import DownloadButton from "../Download";
import classNames from "classnames";
import { downloads } from "./instructions.module.css";
import * as styles from "./instructions.module.css";
import { StaticImage } from "gatsby-plugin-image";

export default function WindowsMSI() {
    return (
        <ol className={classNames(styles.instructions)}>
            <li>Download Processing for Windows
                <div className={classNames(downloads)}>
                    <DownloadButton id="CIMDWXJV" format="msi" arch="x64">Download</DownloadButton>
                </div>
            </li>
            <li>
                Open the <strong>.msi</strong> file to launch the installation dialog
                <StaticImage width={400} src="../../../images/mac-installation.png" />
            </li>
        </ol>
    )
}