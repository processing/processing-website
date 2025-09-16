import React from "react";
import DownloadButton from "../Download";
import { useAssets } from "../Releases";


export default function WindowsZip() {
    const assets = useAssets();

    return (
        <div>
            <ol>
                <li>Download Processing (zip)
                    <div>
                        <DownloadButton>Download</DownloadButton>
                    </div>
                </li>
            </ol>
        </div>
    )
}