import classNames from "classnames";
import Donate from "components/Donate";
import LinuxZip from "components/download/instructions/LinuxZip";
import RaspiSnap from "components/download/instructions/RaspiSnap";
import RaspiTGZ from "components/download/instructions/RaspiTGZ";
import RaspiZip from "components/download/instructions/RaspiZip";
import PortableIndicator, { PortableContext } from "components/download/Portable";
import PreviousReleases from "components/download/PreviousReleases";
import { useAssets } from "components/download/Releases";
import WhatsNew from "components/download/WhatsNew";
import React, { useContext } from "react";
import * as grid from 'styles/grid.module.css';
import * as styles from 'styles/templates/platform.module.css';


export default function RaspberryPIDownloadPage() {
    const { preferPortable } = useContext(PortableContext);

    const assets = useAssets();

    let InstructionComponent = RaspiZip;
    if (assets.find(asset => asset.name.endsWith('.snap'))) {
        InstructionComponent = RaspiSnap;
    }
    if (assets.find(asset => asset.name.endsWith('.tgz'))) {
        InstructionComponent = LinuxZip;
    }
    if (preferPortable) {
        InstructionComponent = LinuxZip;
    }
    return (
        <>
            <div className={classNames(grid.grid, grid.container)}>
                <div className={classNames(grid.col, styles.instructions)}>
                    <InstructionComponent />
                    <PortableIndicator />
                </div>
                <Donate />
            </div>
            <div className={classNames(grid.grid, grid.container)}>
                <WhatsNew />
                <PreviousReleases />
            </div>
        </>
    );
}