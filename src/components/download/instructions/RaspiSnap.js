import React from "react";
import DownloadButton from "../Download";
import Share from "../Share";
import classNames from "classnames";
import { downloads } from "./instructions.module.css";
import * as styles from "./instructions.module.css";

export default function RaspiSnap() {
    return (
        <ol className={classNames(styles.instructions)}>
            <li>Go to start &gt; accessories &gt; Terminal
            </li>
            <li>Run these commands
                <pre>
                    <div>$ sudo apt update</div>
                    <div>$ sudo apt install snapd</div>
                    <div>$ sudo snap install processing --classic</div>
                </pre>
            </li>
            <li>Reboot the raspberry pi</li>
            <li>Go to start &gt; programming &gt; Processing</li>
            <Share />
        </ol>
    )
}