import React from "react";
import { useVersionOrLatest } from "./Version";
import Button from "components/Button";
import { usePlatform } from "./Platform";
import { useAssets, useReleases } from "./Releases";

export default function DownloadButton({ arch, format = "zip", children }) {
    const version = useVersionOrLatest();
    const platform = usePlatform();

    // TODO: Report the download to analytics

    const assets = useAssets();

    const downloadUrl = assets
        .filter(asset => !arch || asset.name.includes(arch))
        .find(asset => asset.name.includes(format))
        ?.downloadUrl;


    return (
        <Button href={downloadUrl} variant="primary" size="lg" download>
            {children || <>
                Download {version} for {platform.title} ({arch})
            </>}
        </Button>
    )
}