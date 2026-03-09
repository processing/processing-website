import React from "react";
import { useVersionOrLatest } from "./Version";
import Button from "components/Button";
import { usePlatform } from "./Platform";
import { useAssets } from "./Releases";
import { useGoal } from "gatsby-plugin-fathom";

export default function DownloadButton({ arch, variant = "animate1", format = "zip", id, children }) {
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
            <Button href={downloadUrl} variant={variant} size="large" download>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 16.25V3.25M13 16.25L7.58333 10.8333M13 16.25L18.4167 10.8333M22.75 16.25V20.5833C22.75 21.158 22.5217 21.7091 22.1154 22.1154C21.7091 22.5217 21.158 22.75 20.5833 22.75H5.41667C4.84203 22.75 4.29093 22.5217 3.8846 22.1154C3.47827 21.7091 3.25 21.158 3.25 20.5833V16.25" stroke="white" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {children || <>
                    Download {version} for {platform.title} ({arch})
                </>}
            </Button>
        </div>
    )
}