import React from "react";
import DownloadButton from "../Download";
import { useAssets } from "../Releases";
import classNames from "classnames";
import * as styles from "./instructions.module.css";
import Share from "../Share";
import Architecture from "../Architecture";


export default function MacOSZip() {
    const assets = useAssets();

    return (
        <ol className={classNames(styles.instructions)}>
            <li>Download Processing
                {assets.length > 1 &&
                    <>
                        <div className={classNames(styles.downloads)}>
                            <DownloadButton id="IWSPGL5F" arch="aarch64">Apple Silicon</DownloadButton>
                            <DownloadButton id="VQUBVEQR" arch="x64">Intel</DownloadButton>
                            <Architecture />
                        </div>
                    </>
                }
                {assets.length == 1 &&
                    <div className={classNames(styles.downloads)}>
                        <DownloadButton id="VQUBVEQR">Intel Only</DownloadButton>
                    </div>
                }
            </li>
            <li>Open the .zip file</li>
            <li>Drag to applications folder</li>
            <Share />
        </ol>
    )
}