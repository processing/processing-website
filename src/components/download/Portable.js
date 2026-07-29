import React from "react";
import { useAssets } from "./Releases";
import classNames from "classnames";
import * as styles from "./Portable.module.css";


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
            <a className={classNames(styles.link)} onClick={() => setPreferPortable(!preferPortable)}><strong>OR</strong> get the installable version</a>
        )
    }

    return (
        <a className={classNames(styles.link)} onClick={() => setPreferPortable(!preferPortable)}><strong>OR</strong> get the portable version</a>
    )
}