import React from "react";
import DownloadButton from "../Download";
import { useAssets } from "../Releases";


export default function MacOSZip() {
    const assets = useAssets();

    return (
        <div>
            <ol>
                <li>Download Processing (zip)
                    {assets.length > 1 &&
                        <div>
                            <DownloadButton arch="aarch64">Apple Silicon</DownloadButton>
                            <DownloadButton arch="x64">Intel</DownloadButton>
                        </div>
                    }
                    {assets.length == 1 &&
                        <div>
                            <DownloadButton>Intel Only</DownloadButton>
                        </div>
                    }
                </li>
            </ol>
        </div>
    )
}