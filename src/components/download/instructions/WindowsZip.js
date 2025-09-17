import React from "react";
import DownloadButton from "../Download";
import classNames from "classnames";
import { downloads } from "./instructions.module.css";
import * as styles from "./instructions.module.css";
import Share from "../Share";
import { useAssets } from "../Releases";

export default function WindowsZip() {
    // TODO: Add support for 32bit distribution if available
    const assets = useAssets();
    const has32bit = assets.some(a => a.name.includes("windows32.zip"));

    return (
        <ol className={classNames(styles.instructions)}>
            <li>Download Processing
                <div className={classNames(downloads)}>
                    {!has32bit && <DownloadButton id="CIMDWXJV">Windows Zip</DownloadButton>}
                    {has32bit && <>
                        <DownloadButton id="CIMDWXJV" arch="x64">Windows 64-bit Zip</DownloadButton>
                        <DownloadButton id="CIMDWXJV" arch="x86">Windows 32-bit Zip</DownloadButton>
                    </>}
                </div>
            </li>
            <li>Extract the contents of the zip file</li>
            <li>Run processing.exe</li>
            <Share />
        </ol>
    )
}