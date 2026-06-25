import React from "react";
import DownloadButton from "../Download";
import Share from "../Share";
import classNames from "classnames";
import { downloads } from "./instructions.module.css";
import * as styles from "./instructions.module.css";
import Command from "components/Command";

export default function RaspiSnap() {
    return (
        <ol className={classNames(styles.instructions)}>
            <li>Go to start &gt; accessories &gt; Terminal
            </li>
            <li>Run these commands
                <Command command="sudo apt update" />
                <Command command="sudo apt install snapd" />
                <Command command="sudo snap install processing --classic" />
            </li>
            <li>Reboot the raspberry pi</li>
            <li>Go to start &gt; programming &gt; Processing</li>
        </ol>
    )
}