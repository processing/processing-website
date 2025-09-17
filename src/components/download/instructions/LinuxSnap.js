import React from "react";
import DownloadButton from "../Download";
import { useAssets } from "../Releases";
import classNames from "classnames";
import * as styles from "./instructions.module.css";
import Share from "../Share";


export default function LinuxSnap() {
    const assets = useAssets();

    return (
        <>
            <div>
                <h3>Install with one command</h3>
                <pre>
                    sudo snap install processing --classic
                </pre>
            </div>
            <div>
                <h3>
                    Manually install on
                    <select>
                        <option>Ubuntu</option>
                        <option>Fedora</option>
                        <option>Arch Linux</option>
                        <option>Other</option>
                    </select>
                </h3>
                <pre>
                    sudo snap install processing --classic
                </pre>
            </div>
        </>
        // <ol className={classNames(styles.instructions)}>
        //     <li>Download Processing
        //         {assets.length > 1 &&
        //             <div className={classNames(styles.downloads)}>
        //                 <DownloadButton id="TXVODVYO" arch="aarch64">ARM</DownloadButton>
        //                 <DownloadButton id="HHYWFK7G" arch="x64">x64</DownloadButton>
        //             </div>
        //         }
        //         {assets.length == 1 &&
        //             <div className={classNames(styles.downloads)}>
        //                 <DownloadButton id="HHYWFK7G">x64</DownloadButton>
        //             </div>
        //         }
        //     </li>
        //     <li>Open the .zip file</li>
        //     <li>Drag to applications folder</li>
        //     <Share />
        // </ol>
    )
}