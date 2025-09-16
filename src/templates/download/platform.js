import React from 'react';

import classnames from 'classnames';
import HeadMatter from 'components/HeadMatter';
import Layout from 'components/Layout';
import * as grid from 'styles/grid.module.css';
import { PlatformProvider } from 'components/download/Platform';
import { VersionProvider } from 'components/download/Version';
import Switcher from 'components/download/Switcher';
import LinuxDownloadPage from './linux';
import WindowsDownloadPage from './windows';
import MacOSDownloadPage from './macos';
import RaspberryPIDownloadPage from './raspi';

export default function PlatformDownloadPage({ pageContext }) {
    const { platform, version } = pageContext;

    const versionText = version ? ` (${version})` : '';


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
                        <div style={{ flexBasis: 'var(--col8)' }} className={classnames(grid.col)}>
                            <h1>Install Processing {versionText} for {platform.title}</h1>
                        </div>
                        <Switcher />
                    </div>
                    <div className={classnames(grid.grid, grid.container)}>
                        <PlatformComponent />
                    </div>
                </Layout>
            </VersionProvider>
        </PlatformProvider>
    )
}