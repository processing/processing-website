import React from "react";
import classnames from 'classnames'
import * as grid from 'styles/grid.module.css';
import * as styles from 'styles/pages/download.module.css';
import { StaticImage } from "gatsby-plugin-image"
import Button from 'components/Button';
import { Link } from 'gatsby';
import { PlatformIcon, useGuessedPlatform } from 'components/download/Platform';


export default function DownloadCTA() {
    const { selected, rest } = useGuessedPlatform();

    return (
        <div className={classnames(grid.grid, grid.container)}>
            <div className={classnames(grid.col, styles.cta)}>
                <h1 className={classnames(styles.title)}>Download <span className={classnames(styles.software)}>Processing</span>,<br /> your friendly creative coding sketchbook.</h1>
                <div>
                    <Button variant="animate1" size="large" to={`/download/${selected?.name}`}>
                        Download for Processing
                    </Button>
                    <Button variant="gray" size="large" to={`/reference`}>
                        Read the docs
                    </Button>
                    <div className={classnames(styles.otherPlatforms)}>

                        <ul>
                            {rest.map(node => (
                                <li key={node.name}>
                                    <Link to={`/download/${node.name}/`} >
                                        <PlatformIcon platform={node} className={classnames(styles.icon)} />
                                        {node.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <h4>Runs on Windows, macOS, Linux, Raspberry PI</h4>
                    </div>
                </div>
            </div>
            {selected && <div className={classnames(grid.col, styles.screenshot)}>
                {selected?.name == "macos" && <StaticImage src={`../images/download-macos.png`} alt="The Processing Desktop Editor on macOS" />}
                {selected?.name == "linux" && <StaticImage src={`../images/download-linux.png`} alt="The Processing Desktop Editor on linux" />}
                {selected?.name == "windows" && <StaticImage src={`../images/download-windows.png`} alt="The Processing Desktop Editor on windows" />}
            </div>}
        </div>
    )
}