import React, { useState } from "react";
import classNames from "classnames";
import * as styles from "./instructions.module.css";
import Command from "components/Command";
import { useVersionOrLatest } from "../Version";
import LogoLinux from 'images/logo-linux.svg';


export default function LinuxUniversal() {
    const distributions = {
        // universal: {
        //     label: "Universal",
        //     Icon: LogoLinux,
        //     Component: LinuxUniversalCLI
        // },
        ubuntu: {
            label: "Ubuntu",
            Icon: LogoLinux,
            Component: UbuntuInstructions
        }
    }

    const distributionEntries = Object.entries(distributions);
    const [selectedDistribution, setSelectedDistribution] = useState(distributionEntries[0][0]);
    const distribution = distributions[selectedDistribution] ?? distributionEntries[0][1];
    const SelectedInstructions = distribution.Component;


    return (
        <>
            <ol className={classNames(styles.instructions)}>
                <div className={classNames(styles.platformPicker)}>
                    <distribution.Icon className={classNames(styles.platformIcon)} aria-hidden="true" />
                    <select
                        className={classNames(styles.platforms)}
                        value={selectedDistribution}
                        onChange={(event) => setSelectedDistribution(event.target.value)}
                    >
                        {distributionEntries.map(([name, option]) => (
                            <option key={name} value={name}>{option.label}</option>
                        ))}
                    </select>
                    <svg className={classNames(styles.platformChevron)} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                        <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </div>
                <SelectedInstructions />
            </ol>
        </>
    )
}


function UbuntuInstructions() {
    const version = useVersionOrLatest();
    // TODO: show instruction for using the .snap file if the version doesnt equal latest
    
    return (

        <>
            <li>
                Download Processing {version} for Ubuntu
                <div>Use snap to install the latest version of Processing</div>
                <Command command="sudo snap install processing --classic" />
            </li>
            <li>
                Then run Processing using the command
                <Command command="processing" />
            </li>
        </>
    )
}

function LinuxUniversalCLI() {
    const version = useVersionOrLatest();

    return (
        <>
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
        </>
    )
    
}