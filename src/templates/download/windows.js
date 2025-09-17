import classNames from "classnames";
import Donate from "components/Donate";
import WindowsMSI from "components/download/instructions/WindowsMSI";
import WindowsZip from "components/download/instructions/WindowsZip";
import PreviousReleases from "components/download/PreviousReleases";
import { useAssets } from "components/download/Releases";
import WhatsNew from "components/download/WhatsNew";
import React from "react";
import * as grid from 'styles/grid.module.css';


export default function WindowsDownloadPage() {
    const [preferPortable, setPreferPortable] = React.useState(false);

    const assets = useAssets();

    const containsMultiple = assets.length > 1;

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
                {containsMultiple && <a onClick={() => setPreferPortable(!preferPortable)}>Prefer the portable version?</a>}
            </div>
            <Donate />
            <WhatsNew />
            <PreviousReleases />
        </>
    );
}