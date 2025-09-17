import classNames from "classnames";
import Donate from "components/Donate";
import RaspiSnap from "components/download/instructions/RaspiSnap";
import RaspiTGZ from "components/download/instructions/RaspiTGZ";
import RaspiZip from "components/download/instructions/RaspiZip";
import PortableIndicator, { PortableContext } from "components/download/Portable";
import PreviousReleases from "components/download/PreviousReleases";
import { useAssets } from "components/download/Releases";
import WhatsNew from "components/download/WhatsNew";
import React, { useContext } from "react";
import * as grid from 'styles/grid.module.css';


export default function RaspberryPIDownloadPage() {
    const { preferPortable } = useContext(PortableContext);

    const assets = useAssets();

    let InstructionComponent = RaspiZip;
    if (assets.find(asset => asset.name.endsWith('.snap'))) {
        InstructionComponent = RaspiSnap;
    }
    if (assets.find(asset => asset.name.endsWith('.tgz'))) {
        InstructionComponent = RaspiTGZ;
    }
    if (preferPortable) {
        InstructionComponent = RaspiZip;
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