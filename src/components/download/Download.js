import React from "react";
import { useVersionOrLatest } from "./Version";
import Button from "components/Button";
import { usePlatform } from "./Platform";
import { useAssets } from "./Releases";
import { useGoal } from "gatsby-plugin-fathom";

export default function DownloadButton({ arch, format = "zip", id, children }) {
    const version = useVersionOrLatest();
    const platform = usePlatform();

    const submitEvent = useGoal(id)

    const assets = useAssets();

    const downloadUrl = assets
        .filter(asset => !arch || asset.name.includes(arch))
        .find(asset => asset.name.includes(format))
        ?.downloadUrl;


    return (
        <div onClick={() => submitEvent()} >
            <Button href={downloadUrl} variant="animate1" size="large" download>
                {children || <>
                    Download {version} for {platform.title} ({arch})
                </>}
            </Button>
        </div>
    )
}