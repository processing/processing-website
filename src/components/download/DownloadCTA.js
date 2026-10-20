import React from "react";
import classnames from 'classnames'
import * as grid from '../../styles/grid.module.css';
import * as styles from './DownloadCTA.module.css';
import { StaticImage } from "gatsby-plugin-image"
import Button from '../Button';
import { Link } from 'gatsby';
import { PlatformIcon, useGuessedPlatform, usePlatforms } from './Platform';


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
                <div className={classnames(styles.cta_buttons)}>
                    <div className={classnames(styles.actions)}>
                        <Button variant="dark" size="large" to="/download">
                            Download Processing
                        </Button>
                        <Button variant="outline" size="large" to={`/reference`}>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 22.5V7.5C7 6.83696 7.26339 6.20107 7.73223 5.73223C8.20107 5.26339 8.83696 5 9.5 5H22C22.2652 5 22.5196 5.10536 22.7071 5.29289C22.8946 5.48043 23 5.73478 23 6V24C23 24.2652 22.8946 24.5196 22.7071 24.7071C22.5196 24.8946 22.2652 25 22 25H9.5C8.83696 25 8.20107 24.7366 7.73223 24.2678C7.26339 23.7989 7 23.163 7 22.5ZM7 22.5C7 21.837 7.26339 21.2011 7.73223 20.7322C8.20107 20.2634 8.83696 20 9.5 20H23M11 14H19M11 10H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            Read the docs
                        </Button>
                    </div>
                    <div className={classnames(styles.otherPlatforms)}>
                        <h4>Runs on</h4>
                        <ul>
                            {platforms.map(node => (
                                <li key={node.name}>
                                    <Link to={`/download/${node.name}`} aria-label={node.title}>
                                        <PlatformIcon platform={node} className={classnames(styles.icon)} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {selected && <div className={classnames(grid.col, styles.screenshot)}>
                {selected?.name === "macos" && <StaticImage src={`../../images/download-macos.png`} alt="The Processing Desktop Editor on macOS" quality={100} objectFit="contain" objectPosition="right center" />}
                {selected?.name === "linux" && <StaticImage src={`../../images/download-linux.png`} alt="The Processing Desktop Editor on linux" quality={100} objectFit="contain" objectPosition="right center" />}
                {selected?.name === "windows" && <StaticImage src={`../../images/download-windows.png`} alt="The Processing Desktop Editor on windows" quality={100} objectFit="contain" objectPosition="right center" />}
            </div>}
        </div>
    )
}