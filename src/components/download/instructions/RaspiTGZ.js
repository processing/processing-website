import React from "react";
import { useAssets } from "../Releases";
import LinuxZip from "./LinuxZip";
import classNames from "classnames";
import * as styles from "./instructions.module.css";

export default function RaspiTGZ() {

    const assets = useAssets();
    // Offer 32 and 64 bit downloads if available
    const hasArm64 = !!assets.find(asset => asset.name.includes('arm64') || asset.name.includes('aarch64'));
    const hasArm32 = !!assets.find(asset => asset.name.includes('arm32') || asset.name.includes('armv6hf'));
    if (!hasArm64 && !hasArm32) {
        return (
            <ol className={classNames(styles.instructions)}>
                <h2>No Raspberry Pi distribution is available for this version.</h2>
            </ol>
        )
    }

    return (
        <LinuxZip noIntel={true} />
    )
}