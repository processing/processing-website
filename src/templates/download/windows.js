import classNames from "classnames";
import Donate from "components/Donate";
import WindowsMSI from "components/download/instructions/WindowsMSI";
import WindowsZip from "components/download/instructions/WindowsZip";
import PortableIndicator, { PortableContext } from "components/download/Portable";
import PreviousReleases from "components/download/PreviousReleases";
import { useAssets } from "components/download/Releases";
import WhatsNew from "components/download/WhatsNew";
import React, { useContext } from "react";
import * as grid from 'styles/grid.module.css';


export default function WindowsDownloadPage() {
    const { preferPortable } = useContext(PortableContext);

    const assets = useAssets();

    let InstructionComponent = WindowsZip;
    if (assets.find(asset => asset.name.endsWith('.msi'))) {
        InstructionComponent = WindowsMSI;
    }
    if (preferPortable) {
        InstructionComponent = WindowsZip;
    }

    return (
        <>
            <div style={{ flexBasis: 'var(--col4)' }} className={classNames(grid.col)}>
                <InstructionComponent />
                <PortableIndicator />
            </div>
            <Donate />
            <WhatsNew />
            <PreviousReleases />
        </>
    );
}