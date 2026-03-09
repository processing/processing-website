import React from "react";
import classnames from 'classnames'
import * as grid from 'styles/grid.module.css';
import * as styles from 'components/download/DownloadCTA.module.css';
import { StaticImage } from "gatsby-plugin-image"
import Button from 'components/Button';
import { Link } from 'gatsby';
import { PlatformIcon, useGuessedPlatform, usePlatforms } from 'components/download/Platform';


export default function DownloadCTA() {
    const { selected } = useGuessedPlatform();
    const platforms = usePlatforms();

    return (
        <div className={classnames(grid.grid, grid.container, styles.cta_container)}>
            <div className={classnames(grid.col, styles.cta_text)}>
                <h1 className={classnames(styles.title)}>
                    Welcome to Processing
                </h1>
                <p className={classnames(styles.intro)}>
                    Processing is a flexible software sketchbook and a language for learning how to code. Since 2001, it's been where artists, designers, researchers, and learners go to bring ideas to life with code.
                </p>
                <div>
                    <div className={classnames(styles.actions)}>
                        <Button variant="animate1" size="large" to={`/download/${selected?.name}`}>
                            Download for Processing
                        </Button>
                        <Button variant="gray" size="large" to={`/reference`}>
                            Read the docs
                        </Button>
                    </div>
                    <div className={classnames(styles.otherPlatforms)}>
                        <ul>
                            {platforms.map(node => (
                                <li key={node.name}>
                                    <Link to={`/download/${node.name}/`} >
                                        <PlatformIcon platform={node} className={classnames(styles.icon)} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <h4 className={classnames(styles.runs_on)}>
                            Runs on
                            <ul>
                                {platforms.map(node => (
                                    <Link key={node.name} to={`/download/${node.name}/`} style={{ display: "inline-flex" }}>
                                        {node.title}
                                    </Link>
                                ))}
                            </ul>
                        </h4>
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