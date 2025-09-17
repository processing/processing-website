import React from "react";
import DownloadButton from "../Download";
import Share from "../Share";
import classNames from "classnames";
import { downloads } from "./instructions.module.css";
import * as styles from "./instructions.module.css";
import { useAssets } from "../Releases";

export default function RaspiTGZ() {

    const assets = useAssets();
    // Offer 32 and 64 bit downloads if available
    const hasArm64 = !!assets.find(asset => asset.name.includes('arm64') || asset.name.includes('aarch64'));
    const hasArm32 = !!assets.find(asset => asset.name.includes('arm32') || asset.name.includes('armv6hf'));
    if (!hasArm64 && !hasArm32) {
        return (
            <p>No Raspberry Pi distribution is available for this version.</p>
        )
    }
    const archIndicator = assets.some(a => a.name.includes("arm64")) ? "arm64" : "aarch64";
    const arch32Indicator = assets.some(a => a.name.includes("arm32")) ? "arm32" : "armv6hf";

    return (
        <ol className={classNames(styles.instructions)}>
            <li>Download Processing
                <div className={classNames(downloads)}>
                    {hasArm64 && <DownloadButton id="TXVODVYO" arch={archIndicator} format="tgz">Raspberry PI (64 Bit)</DownloadButton>}
                    {hasArm32 && <DownloadButton id="TXVODVYO" arch={arch32Indicator} format="tgz">Raspberry PI (32 Bit)</DownloadButton>}
                </div>
            </li>
            <li>Open the .msi file</li>
            <li>Run the installer</li>
            <Share />
        </ol>
    )
}