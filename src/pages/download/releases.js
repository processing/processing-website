import classnames from "classnames";
import Button from "components/Button";
import { useGuessedPlatform } from "components/download/Platform";
import { useReleasesByMajor } from "components/download/PreviousReleases";

import HeadMatter from "components/HeadMatter";
import Layout from "components/Layout";
import { Link } from "gatsby";
import React from "react";
import * as css from "styles/pages/releases.module.css";
import * as grid from 'styles/grid.module.css';


export default function ReleasesPage() {
    const versionByMajor = useReleasesByMajor();
    const { selected } = useGuessedPlatform();

    return (
        <Layout>
            <HeadMatter
                title={"All Releases"}
                description={"Find all previous releases of Processing, the open source programming environment for artists, designers, and educators."}
            />
            <div className={classnames(grid.grid, grid.container)}>
                <div className={classnames(grid.col)}>
                    <h1>All Releases</h1>
                    <p>Here you can find all previous releases of Processing. For the latest stable release, please visit the <Link to="/download">main download page</Link>.</p>
                    <div className={css.releasesList}>
                        {versionByMajor.map((versions, i) => (
                            <div key={i} className={css.releaseGroup}>
                                <h3>Processing {versions[0].major}</h3>
                                <table className={css.releasesTable}>
                                    <tr>
                                        <th>Version</th>
                                        <th>Published Date</th>
                                        <th>Release Page</th>
                                        <th>Download Page</th>
                                    </tr>
                                    {versions.map(v => (
                                        <tr key={v.options.raw} className={css.releaseRow}>
                                            <td>{v.options.raw}</td>
                                            <td>{new Date(v.options.options.publishedAt).toLocaleDateString()}</td>
                                            <td><a href={`https://github.com/processing/processing4/releases/tag/${v.options.options.tagName}`}>{v.options.options.tagName}</a></td>
                                            <td>
                                                <Button href={`/download/${selected?.name}/${v.options.raw}`} variant="animate1">Download {v.options.raw}</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                                <ul>

                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </Layout>
    )
}