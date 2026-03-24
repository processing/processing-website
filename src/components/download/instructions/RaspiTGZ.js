import React from "react";
import { useAssets } from "../Releases";
import LinuxZip from "./LinuxZip";

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

    return (
        <LinuxZip noIntel={true} />
    )
}