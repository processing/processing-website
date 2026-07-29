import React from "react";
import DownloadButton from "../Download";
import { useAssets } from "../Releases";
import classNames from "classnames";
import * as styles from "./instructions.module.css";
import Architecture from "../Architecture";
import { StaticImage } from "gatsby-plugin-image";
import { useVersionOrLatest } from "../Version";


export default function MacOSZip() {
    const assets = useAssets();
    const version = useVersionOrLatest()

    return (
        <ol className={classNames(styles.instructions)}>
            <li>
                Download Processing {version} (Portable) for macOS.
                {assets.length > 1 &&
                    <>
                        <div className={classNames(styles.downloads)}>
                            <DownloadButton id="IWSPGL5F" variant="download1" arch="aarch64">Apple Silicon</DownloadButton>
                            <DownloadButton id="VQUBVEQR" variant="download2" arch="x64">Intel</DownloadButton>
                        </div>
                        <Architecture />
                    </>
                }
                {assets.length == 1 &&
                    <div className={classNames(styles.downloads)}>
                        <DownloadButton id="VQUBVEQR">Intel</DownloadButton>
                    </div>
                }
            </li>
            <li>
                Uncompress the <strong>.zip</strong> file and drag the .app to the applications folder
                <StaticImage style={{ boxShadow: "0px 5px 12px rgba(0,0,0,0.25)", borderRadius: 18, margin: 24 }} width={600} src="../../../images/mac-portable-installation.png" />
            </li>
        </ol>
    )
}