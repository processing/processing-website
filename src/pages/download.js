import classnames from 'classnames'
import React from 'react'
import HeadMatter from 'components/HeadMatter'
import Layout from 'components/Layout'
import * as grid from 'styles/grid.module.css';
import * as styles from 'styles/pages/download.module.css';
import { StaticImage } from "gatsby-plugin-image"
import Button from 'components/Button';
import { useGuessedPlatform } from 'components/download/Platform';
import Donate from 'components/Donate';
import LogoWindows from '../images/logo-windows.svg';
import LogoMac from '../images/logo-macos.svg';
import LogoLinux from '../images/logo-linux.svg';
import LogoRaspberry from '../images/logo-raspberry.svg';

export default function DownloadPage() {
    const { selected, rest } = useGuessedPlatform();


    return (
        <Layout>
            <HeadMatter
                title={"Download Processing"}
                description={"Download Processing, the open source programming environment for artists, designers, and educators."}
            />
            <div className={classnames(grid.grid, grid.container)}>
                <div className={classnames(grid.col, styles.cta)}>
                    <h1 className={classnames(styles.title)}>Download <span className={classnames(styles.software)}>Processing</span>,<br /> your friendly creative coding sketchbook.</h1>
                    <div>
                        <Button variant="animate1" size="large" href={`/download/${selected.name}`}>
                            Download for {selected.title} <PlatformIcon platform={selected} />
                        </Button>
                        <div className={classnames(styles.otherPlatforms)}>
                            <h4>Also available for</h4>
                            <ul>
                                {rest.map(node => (
                                    <a href={`/download/${node.name}`} key={node.name}>
                                        <PlatformIcon platform={node} />
                                        <li>{node.title}</li>
                                    </a>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={classnames(grid.col, styles.screenshot)}>
                    {selected.name == "macos" && <StaticImage src={`../images/download-macos.png`} alt="The Processing Desktop Editor on macOS" />}
                    {selected.name == "linux" && <StaticImage src={`../images/download-linux.png`} alt="The Processing Desktop Editor on linux" />}
                    {selected.name == "windows" && <StaticImage src={`../images/download-windows.png`} alt="The Processing Desktop Editor on windows" />}
                </div>

            </div>
            <div className={classnames(grid.grid, grid.container)}>
                <div className={classnames(grid.col)}>
                    <Donate />
                </div>
            </div>
        </Layout>
    )
}

function PlatformIcon({ platform }) {
    if (platform.name === "macos") {
        return <LogoMac className={classnames(styles.icon)} />;
    } else if (platform.name === "windows") {
        return <LogoWindows className={classnames(styles.icon)} />;
    } else if (platform.name === "linux") {
        return <LogoLinux className={classnames(styles.icon)} />;
    } else if (platform.name === "raspberry-pi") {
        return <LogoRaspberry className={classnames(styles.icon)} />;
    }
    else {
        return null;
    }
}