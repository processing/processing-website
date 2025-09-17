import React from "react";
import DownloadButton from "../Download";
import Share from "../Share";
import classNames from "classnames";
import { downloads } from "./instructions.module.css";
import * as styles from "./instructions.module.css";

export default function WindowsMSI() {
    return (
        <ol className={classNames(styles.instructions)}>
            <li>Download Processing
                <div className={classNames(downloads)}>
                    <DownloadButton id="CIMDWXJV" format="msi" arch="x64">Windows Installer</DownloadButton>
                </div>
            </li>
            <li>Open the .msi file</li>
            <li>Run the installer</li>
            <Share />
        </ol>
    )
}