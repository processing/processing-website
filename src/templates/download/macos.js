import classNames from "classnames";
import Donate from "components/Donate";
import MacOSDMG from "components/download/instructions/MacOSDMG";
import MacOSZip from "components/download/instructions/MacOSZip";
import PreviousReleases from "components/download/PreviousReleases";
import { useAssets } from "components/download/Releases";
import WhatsNew from "components/download/WhatsNew";
import React from "react";
import * as grid from 'styles/grid.module.css';


export default function MacOSDownloadPage() {
    const [preferPortable, setPreferPortable] = React.useState(false);

    const assets = useAssets();

    const containsMultiple = assets.filter(asset => asset.name.includes('aarch64')).length > 1;

    let InstructionComponent = MacOSZip;
    if (assets.find(asset => asset.name.endsWith('.dmg'))) {
        InstructionComponent = MacOSDMG;
    }
    if (preferPortable) {
        InstructionComponent = MacOSZip;
    }

    return (
        <>
            <div style={{ flexBasis: 'var(--col4)' }} className={classNames(grid.col)}>
                <h3>Instructions</h3>
                <InstructionComponent />
                {containsMultiple && <a style={{ color: 'var(--darkgray)' }} onClick={() => setPreferPortable(!preferPortable)}>Looking for the portable version?</a>}
            </div>
            <Donate />
            <WhatsNew />
            <PreviousReleases />
            <div id="faq-architecture" style={{ flexBasis: 'var(--col8)' }} className={classNames(grid.col)}>
                explain....
            </div>
        </>
    );
}