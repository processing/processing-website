import classnames from "classnames";
import { useReleasesByMajor } from "components/download/PreviousReleases";

import HeadMatter from "components/HeadMatter";
import Layout from "components/Layout";
import { Link } from "gatsby";
import React from "react";
import * as grid from 'styles/grid.module.css';
import * as styles from 'styles/pages/download.module.css';


export default function ReleasesPage() {
    const versionByMajor = useReleasesByMajor();

    return (
        <Layout>
            <HeadMatter 
                title={"All Releases"}
                description={"Find all previous releases of Processing, the open source programming environment for artists, designers, and educators."}
            />
            <div className={classnames(grid.grid, grid.container)}>
                <div className={classnames(grid.col, styles.cta)}>
                    <h1>All Releases</h1>
                    <p>Here you can find all previous releases of Processing. For the latest stable release, please visit the <Link to="/download">main download page</Link>.</p>
                    <div style={{ display: "flex", flexDirection: 'row', gap: '2em' }}>
                        {versionByMajor.map((versions, i) => (
                            <div key={i} style={{ marginBottom: '1em' }}>
                                <h3>Processing {versions[0].major}</h3>
                                <ul>
                                    {versions.map(v => (
                                        <li key={v.options.raw}>
                                            <Link to={`/download/windows/${v.options.raw}`}>Processing {v.options.raw}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </Layout>
    )
}