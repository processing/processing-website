import React from 'react';

import classnames from 'classnames';
import HeadMatter from 'components/HeadMatter';
import Layout from 'components/Layout';
import * as grid from 'styles/grid.module.css';
import { PlatformProvider } from 'components/download/Platform';
import { useVersionOrLatest, VersionProvider } from 'components/download/Version';
import Switcher from 'components/download/Switcher';
import LinuxDownloadPage from './linux';
import WindowsDownloadPage from './windows';
import MacOSDownloadPage from './macos';
import RaspberryPIDownloadPage from './raspi';
import * as styles from 'styles/templates/platform.module.css';
import Button from 'components/Button';

export default function PlatformDownloadPage({ pageContext }) {
    const { platform, version } = pageContext;

    const versionText = version ? ` (${version})` : '';

    const latestVersion = useVersionOrLatest();


    const PlatformComponent = {
        windows: WindowsDownloadPage,
        macos: MacOSDownloadPage,
        linux: LinuxDownloadPage,
        "raspberry-pi": RaspberryPIDownloadPage
    }[platform.name] ?? WindowsDownloadPage

    return (
        <PlatformProvider value={platform}>
            <VersionProvider value={version}>
                <Layout>
                    <HeadMatter
                        title={"Download Processing"}
                        description={"Download Processing, the open source programming environment for artists, designers, and educators."}
                    />
                    <div className={classnames(grid.grid, grid.container)}>
                        <div className={classnames(grid.col, styles.title)}>
                            <h1>Install Processing {versionText} for {platform.title}</h1>
                        </div>
                        <Switcher />
                    </div>
                    {version !== undefined && version !== latestVersion && <div className={classnames(grid.grid, grid.container)} style={{ fontWeight: "bold", background: "var(--processing-blue)", color: "white", paddingBlock: 20 }}>
                        (!) This is not the latest release of Processing. <Button href={`/download/${platform.name}`}>Go Back</Button>
                    </div>}
                    <div className={classnames(grid.grid, grid.container, styles.container)}>
                        <PlatformComponent />
                    </div>
                </Layout>
            </VersionProvider>
        </PlatformProvider>
    )
}