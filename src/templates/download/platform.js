import React, { useState } from 'react';
import classnames from 'classnames';
import HeadMatter from 'components/HeadMatter';
import Layout from 'components/Layout';
import * as grid from 'styles/grid.module.css';
import { PlatformProvider, usePlatforms } from 'components/download/Platform';
import { VersionProvider } from 'components/download/Version';
import Switcher from 'components/download/Switcher';
import LinuxDownloadPage from './linux';
import WindowsDownloadPage from './windows';
import MacOSDownloadPage from './macos';
import RaspberryPIDownloadPage from './raspi';
import * as styles from 'styles/templates/platform.module.css';
import VersionWarning from 'components/download/VersionWarning';
import { PortableContext } from 'components/download/Portable';

export default function PlatformDownloadPage({ pageContext }) {
    const { platform: platformName, version } = pageContext;
    const [preferPortable, setPreferPortable] = useState(false);

    const platforms = usePlatforms();
    const platform = platforms.find(p => p.name === platformName) || platforms[0];

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
                <PortableContext.Provider value={{ preferPortable, setPreferPortable }}>
                    <Layout>
                        <HeadMatter
                            title={`Processing ${versionText} for ${platform.title}`}
                            description={"Download Processing, the open source programming environment for artists, designers, and educators."}
                        />
                        <Switcher />
                        <VersionWarning />
                        <div className={classnames(grid.grid, grid.container)}>
                            <div className={classnames(grid.col, styles.title)}>
                                <h1>Download <span className={classnames(styles.software)}>Processing</span> {versionText} for {platform.title}</h1>
                            </div>
                        </div>
                        <div className={classnames(grid.grid, grid.container, styles.container)}>
                            <PlatformComponent />
                        </div>
                    </Layout>
                </PortableContext.Provider>
            </VersionProvider>
        </PlatformProvider>
    )
}