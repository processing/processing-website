import React from "react";
import DownloadButton from "../Download";
import { useAssets } from "../Releases";
import classNames from "classnames";
import { downloads } from "./instructions.module.css";


export default function WindowsZip() {
    const assets = useAssets();

    return (
        <ol>
            <li>Download Processing (zip)
                <div className={classNames(downloads)}>
                    <DownloadButton id="CIMDWXJV">Download</DownloadButton>
                </div>
            </li>
        </ol>
    )
}