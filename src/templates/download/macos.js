import classNames from "classnames";
import Donate from "components/Donate";
import { ArchitectureInfo } from "components/download/Architecture";
import MacOSDMG from "components/download/instructions/MacOSDMG";
import MacOSZip from "components/download/instructions/MacOSZip";
import PreviousReleases from "components/download/PreviousReleases";
import { useAssets } from "components/download/Releases";
import WhatsNew from "components/download/WhatsNew";
import React from "react";
import * as grid from 'styles/grid.module.css';
import * as styles from 'styles/templates/platform.module.css';

export default function MacOSDownloadPage() {
    const [preferPortable, setPreferPortable] = React.useState(false);

    const assets = useAssets();

    const containsMultipleDistributions = assets
        .filter(asset => asset.name.includes('x64'))
        .length > 1;

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
                {/* TODO: Move to reusable component */}
                {containsMultipleDistributions && <a style={{ color: 'var(--darkgray)' }} onClick={() => setPreferPortable(!preferPortable)}>Looking for the portable version?</a>}
            </div>
            <Donate />
            <WhatsNew />
            <PreviousReleases />
            <ArchitectureInfo />
        </>
    );
}