import React from "react";
import DownloadButton from "../Download";
import Share from "../Share";


export default function MacOSDMG() {
    return (
        <div>
            <ol>
                <li>Download Processing (dmg)
                    <div>
                        <DownloadButton format="dmg" arch="aarch64">Apple Silicon</DownloadButton>
                        <DownloadButton format="dmg">Intel</DownloadButton>
                    </div>
                </li>
                <li>
                    Open the .dmg file
                </li>
                <li>Drag to applications folder</li>
                <Share />
            </ol>
        </div>
    )
}