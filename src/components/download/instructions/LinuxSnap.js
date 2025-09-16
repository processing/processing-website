import React from "react";
import DownloadButton from "../Download";
import { useAssets } from "../Releases";
import classNames from "classnames";
import * as styles from "./instructions.module.css";
import Share from "../Share";


export default function LinuxSnap() {
    const assets = useAssets();

    return (
        <ol>
            <li>Download Processing
                {assets.length > 1 &&
                    <div className={classNames(styles.downloads)}>
                        <DownloadButton arch="aarch64">ARM</DownloadButton>
                        <DownloadButton arch="x64">x64</DownloadButton>
                    </div>
                }
                {assets.length == 1 &&
                    <div className={classNames(styles.downloads)}>
                        <DownloadButton>x64</DownloadButton>
                    </div>
                }
            </li>
            <li>Open the .zip file</li>
            <li>Drag to applications folder</li>
            <Share />
        </ol>
    )
}