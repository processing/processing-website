import React from "react";
import { useAssets } from "../Releases";
import classNames from "classnames";
import * as styles from "./instructions.module.css";
import Command from "components/Command";
import { useVersionOrLatest } from "../Version";


export default function LinuxSnap() {
    const assets = useAssets();
    const version = useVersionOrLatest();

    return (
        <>
            <ol className={classNames(styles.instructions)}>
                <li>
                    Install Processing {version} for Linux using the universal command
                    <div>This will automatically detect your architecture and install the correct version of Processing using the most applicable method.</div>
                    <Command command="curl -fsSL https://processing.org/install.sh | sh" />
                    <a href="https://github.com/processing/processing4/blob/main/app/linux/install.sh" style={{ fontSize: "var(--text-small)", display: "block", textAlign: "right" }}>view source</a>
                </li>
                <li>
                    Then run Processing using the command
                    <Command command="processing" />
                </li>
            </ol>
        </>
    )
}