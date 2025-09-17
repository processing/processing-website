import React from "react";
import DownloadButton from "../Download";
import { useAssets } from "../Releases";
import classNames from "classnames";
import * as styles from "./instructions.module.css";
import Share from "../Share";
import { downloads } from "./instructions.module.css";


export default function LinuxZip() {
    const assets = useAssets();

    const hasArm = assets.some(a => a.name.includes("aarch64") || a.name.includes("arm64"));
    const hasIntel = assets.some(a => a.name.includes("x64") || a.name.includes("x86_64"));
    const hasArm32 = assets.some(a => a.name.includes("arm32") || a.name.includes("armv6hf"));
    const hasIntel32 = assets.some(a => a.name.includes("32"));
    const format = assets.some(a => a.name.includes(".tgz")) ? "tgz" : "zip";
    const archIndicator = assets.some(a => a.name.includes("arm64")) ? "arm64" : "aarch64";
    const arch32Indicator = assets.some(a => a.name.includes("arm32")) ? "arm32" : "armv6hf";

    return (
        <ol className={classNames(styles.instructions)}>
            <li>Download Processing
                <div className={classNames(downloads)}>
                    {hasArm && <DownloadButton id="TXVODVYO" format={format} arch={archIndicator}>ARM</DownloadButton>}
                    {hasArm32 && <DownloadButton id="ZKSBBVWD" format={format} arch={arch32Indicator}>ARM (32 Bit)</DownloadButton>}
                    {hasIntel && <DownloadButton id="HHYWFK7G" format={format} arch="x64">Intel</DownloadButton>}
                    {hasIntel32 && <DownloadButton id="HHYWFK7G" format={format} arch="x64">Intel (32 Bit)</DownloadButton>}
                </div>
            </li>
            <li>Open the .{format} file</li>
            <li>Drag to applications folder</li>
            <Share />
        </ol>
    )
}
