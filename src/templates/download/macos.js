import classNames from "classnames";
import Donate from "components/Donate";
import { ArchitectureInfo } from "components/download/Architecture";
import MacOSDMG from "components/download/instructions/MacOSDMG";
import MacOSZip from "components/download/instructions/MacOSZip";
import PortableIndicator, { PortableContext } from "components/download/Portable";
import PreviousReleases from "components/download/PreviousReleases";
import { useAssets } from "components/download/Releases";
import WhatsNew from "components/download/WhatsNew";
import React from "react";
import * as grid from 'styles/grid.module.css';
import * as styles from 'styles/templates/platform.module.css';

export default function MacOSDownloadPage() {
    const { preferPortable } = React.useContext(PortableContext);

    const assets = useAssets();

    let InstructionComponent = MacOSZip;
    if (assets.find(asset => asset.name.endsWith('.dmg'))) {
        InstructionComponent = MacOSDMG;
    }
    if (preferPortable) {
        InstructionComponent = MacOSZip;
    }

    return (
        <>
            <div className={classNames(grid.col, styles.instructions)}>
                <h3>Instructions</h3>
                <InstructionComponent />
                <PortableIndicator />
            </div>
            <Donate />
            <WhatsNew />
            <PreviousReleases />
            <ArchitectureInfo />
        </>
    );
}