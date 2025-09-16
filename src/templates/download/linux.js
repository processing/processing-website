import Donate from "components/Donate";
import LinuxSnap from "components/download/instructions/LinuxSnap";
import LinuxZip from "components/download/instructions/LinuxZip";
import PreviousReleases from "components/download/PreviousReleases";
import { useAssets } from "components/download/Releases";
import WhatsNew from "components/download/WhatsNew";
import React from "react";


export default function LinuxDownloadPage() {
    const [preferPortable, setPreferPortable] = React.useState(false);

    const assets = useAssets();

    const containsMultiple = assets.filter(asset => asset.name.includes('aarch64')).length > 1;

    let InstructionComponent = LinuxZip;
    if (assets.find(asset => asset.name.endsWith('.snap'))) {
        InstructionComponent = LinuxSnap;
    }
    if (preferPortable) {
        InstructionComponent = LinuxZip;
    }

    return (
        <>
            <InstructionComponent />
            <Donate />
            <WhatsNew />
            <PreviousReleases />
        </>
    );
}