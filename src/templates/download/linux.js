import classNames from "classnames";
import Donate from "components/Donate";
import LinuxUniversal from "components/download/instructions/LinuxUniversal";
import LinuxZip from "components/download/instructions/LinuxZip";
import PortableIndicator, { PortableContext } from "components/download/Portable";
import PreviousReleases from "components/download/PreviousReleases";
import { useAssets } from "components/download/Releases";
import WhatsNew from "components/download/WhatsNew";
import React from "react";
import * as grid from 'styles/grid.module.css';
import * as styles from 'styles/templates/platform.module.css';


export default function LinuxDownloadPage() {
    const { preferPortable } = React.useContext(PortableContext);

    const assets = useAssets();


    let InstructionComponent = LinuxZip;
    if (assets.find(asset => asset.name.endsWith('.snap'))) {
        InstructionComponent = LinuxUniversal;
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