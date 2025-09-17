import classNames from "classnames";
import Donate from "components/Donate";
import LinuxSnap from "components/download/instructions/LinuxSnap";
import LinuxZip from "components/download/instructions/LinuxZip";
import PortableIndicator, { PortableContext } from "components/download/Portable";
import PreviousReleases from "components/download/PreviousReleases";
import { useAssets } from "components/download/Releases";
import WhatsNew from "components/download/WhatsNew";
import React from "react";
import * as grid from 'styles/grid.module.css';


export default function LinuxDownloadPage() {
    const { preferPortable } = React.useContext(PortableContext);

    const assets = useAssets();


    let InstructionComponent = LinuxZip;
    if (assets.find(asset => asset.name.endsWith('.snap'))) {
        InstructionComponent = LinuxSnap;
    }
    if (preferPortable) {
        InstructionComponent = LinuxZip;
    }

    return (
        <>
            <div style={{ flexBasis: 'var(--col8)' }} className={classNames(grid.col)}>
                <InstructionComponent />
                <PortableIndicator />
            </div>
            <Donate />
            <WhatsNew />
            <PreviousReleases />
        </>
    );
}