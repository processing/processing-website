import React from "react";
import { useAssets } from "../Releases";
import classNames from "classnames";
import * as styles from "./instructions.module.css";


export default function LinuxSnap() {
    const assets = useAssets();

    return (
        <>
            <ol className={classNames(styles.instructions)}>
                <li>
                    Install Processing for Linux using the universal command
                    <pre>
                        curl -fsSL  https://processing.org/install.sh | sh
                    </pre>
                    This will automatically detect your architecture and install the correct version of Processing using the most applicable method.
                </li>
                <li>
                    Then run Processing using the command
                    <pre>
                        processing
                    </pre>
                </li>
            </ol>
        </>
    )
}