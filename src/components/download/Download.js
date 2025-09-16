import React from "react";
import { useVersionOrLatest } from "./Version";
import Button from "components/Button";
import { usePlatform } from "./Platform";

export default function DownloadButton({ version: versionOverride, platform: platformOverride, arch = "x64", children }) {
    let version = useVersionOrLatest();
    if (versionOverride) {
        version = versionOverride;
    }
    let platform = usePlatform().frontmatter.platform;
    if (platformOverride) {
        platform = platformOverride;
    }



    return (
        <Button>
            {children || <>
                Download {version} for {platform} ({arch})
            </>}
        </Button>
    )
}