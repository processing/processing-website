import React from "react";
import DownloadButton from "../Download";
import { useAssets } from "../Releases";
import classNames from "classnames";
import * as styles from "./instructions.module.css";
import Share from "../Share";


export default function LinuxZip() {
    const assets = useAssets();

    return (
        <ol>
            <li>Download Processing
                {assets.length > 1 &&
                    <div className={classNames(styles.downloads)}>
                        <DownloadButton arch="aarch64">Apple Silicon</DownloadButton>
                        <DownloadButton arch="x64">Intel</DownloadButton>
                    </div>
                }
                {assets.length == 1 &&
                    <div className={classNames(styles.downloads)}>
                        <DownloadButton>Intel Only</DownloadButton>
                    </div>
                }
            </li>
            <li>Open the .zip file</li>
            <li>Drag to applications folder</li>
            <Share />
        </ol>
    )
}
