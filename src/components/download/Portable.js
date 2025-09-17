import React from "react";
import { useAssets } from "./Releases";


export const PortableContext = React.createContext({ preferPortable: false, setPreferPortable: () => { } });

export default function PortableIndicator() {
    const { preferPortable, setPreferPortable } = React.useContext(PortableContext);

    const assets = useAssets();

    const containsMultipleDistributions = assets
        .filter(asset => asset.name.includes('x64'))
        .length > 1;
    if (!containsMultipleDistributions) {
        return null;
    }
    if (preferPortable) {
        return (
            <a style={{ color: 'var(--darkergray)' }} onClick={() => setPreferPortable(!preferPortable)}>Looking for the standard version?</a>
        )
    }

    return (
        <a style={{}} onClick={() => setPreferPortable(!preferPortable)}>Looking for the portable version?</a>
    )
}