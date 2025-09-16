import React from "react";
import DownloadButton from "../Download";
import Share from "../Share";


export default function WindowsMSI() {
    return (
        <div>
            <ol>
                <li>Download Processing (dmg)
                    <div>
                        <DownloadButton format="msi" arch="x64">Download</DownloadButton>
                    </div>
                </li>
                <li>
                    Open the .msi file
                </li>
                <li>Drag to applications folder</li>
                <Share />
            </ol>
        </div>
    )
}