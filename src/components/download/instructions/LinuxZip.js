import React from "react";
import DownloadButton from "../Download";
import { useAssets } from "../Releases";
import classNames from "classnames";
import * as styles from "./instructions.module.css";
import { useVersionOrLatest } from "../Version";
import * as semver from "semver";
import Command from "components/Command";


export default function LinuxZip({ noIntel = false }) {
    const version = useVersionOrLatest()
    const v = semver.coerce(version, { includePrerelease: true });
    const assets = useAssets();

    const hasArm = assets.some(a => a.name.includes("aarch64") || a.name.includes("arm64"));
    const hasIntel = !noIntel && assets.some(a => a.name.includes("x64") || a.name.includes("x86_64"));
    const hasArm32 = assets.some(a => a.name.includes("arm32") || a.name.includes("armv6hf"));
    const hasIntel32 = !noIntel && assets.some(a => a.name.includes("32"));
    const format = assets.some(a => a.name.includes(".tgz")) ? "tgz" : "zip";
    const archIndicator = assets.some(a => a.name.includes("arm64")) ? "arm64" : "aarch64";
    const arch32Indicator = assets.some(a => a.name.includes("arm32")) ? "arm32" : "armv6hf";

    return (
        <ol className={classNames(styles.instructions)}>
            <li>Download Processing
                <div className={classNames(styles.downloads)}>
                    {hasIntel && <DownloadButton id="HHYWFK7G" variant="download1" format={format} arch="x64">Intel</DownloadButton>}
                    {hasIntel32 && <DownloadButton id="HHYWFK7G" variant="download1" format={format} arch="x64">Intel (32 Bit)</DownloadButton>}
                    {hasArm && <DownloadButton id="TXVODVYO" variant="download2" format={format} arch={archIndicator}>ARM</DownloadButton>}
                    {hasArm32 && <DownloadButton id="ZKSBBVWD" variant="download2" format={format} arch={arch32Indicator}>ARM (32 Bit)</DownloadButton>}
                </div>
                {assets.length == 1 &&
                    <div className={classNames(styles.downloads)}>
                        <DownloadButton id="VQUBVEQR" format={format}>Intel</DownloadButton>
                    </div>
                }
            </li>
            {v.major >= 4 && v.minor >= 4 &&
                <li>Open the .{format} file
                    <div>The executable file is in bin/Processing</div>
                </li>
            }
            {v.major <= 4 && v.minor <= 3 &&
                <li>
                    Install Processing with the install script

                    <Command command="./install.sh" />
                </li>
            }
        </ol>
    )
}
