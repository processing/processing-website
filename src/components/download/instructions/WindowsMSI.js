import React from "react";
import DownloadButton from "../Download";
import classNames from "classnames";
import { downloads } from "./instructions.module.css";
import * as styles from "./instructions.module.css";
import { StaticImage } from "gatsby-plugin-image";
import { useVersionOrLatest } from "../Version";

export default function WindowsMSI() {
    const version = useVersionOrLatest()
    return (
        <ol className={classNames(styles.instructions)}>
            <li>Download Processing {version} for Windows
                <div className={classNames(downloads)}>
                    <DownloadButton id="CIMDWXJV" variant="download1" format="msi" arch="x64">Download</DownloadButton>
                </div>
            </li>
            <li>
                Open the <strong>.msi</strong> file to launch the installation dialog<div >The installer will add Processing to your Start menu</div>
                <StaticImage style={{ boxShadow: "3px 3px 8px rgba(0,0,0,0.125)", border: "1px solid rgba(0,0,0,0.125)", margin: 24 }} width={400} src="../../../images/windows-installation.png" />
            </li>
        </ol>
    )
}