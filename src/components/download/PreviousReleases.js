import { graphql, useStaticQuery } from "gatsby"
import React, { version } from "react"
import * as semver from "semver";
import { usePlatform } from "./Platform";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import Button from "components/Button";



export default function PreviousReleases() {
    const platform = usePlatform();

    const releases = useStaticQuery(graphql`
    query FindReleases {
        allFile(filter: {sourceInstanceName: {eq: "download"}, relativeDirectory: {eq: "releases"}}) {
            edges {
                node {
                    childJson {
                        tagName
                        isPrerelease
                    }
                }
            }
        }
    }
`)
    const versionByMajor = releases.allFile.edges
        .filter(e => e.node.childJson.isPrerelease !== true)
        .map(e => e.node.childJson.tagName.replace(/^processing-(\d+-)?/, ''))
        .map(e => semver.coerce(e, { includePrerelease: true, raw: e }))
        .reverse()
        .sort((a, b) => semver.compare(b, a))
        // conver to object by major version
        .reduce((acc, cur) => {
            const major = cur.major;
            if (!acc[major]) acc[major] = [];
            acc[major].push(cur);
            return acc;
        }, [])
        .reverse()
        ;



    return (
        <div style={{ flexBasis: 'var(--col8)' }} className={classNames(grid.col)}>
            <details>
                <summary><h3 style={{ display: "inline-block" }}>Looking for other versions of Processing?</h3></summary>
                <details open>
                    <summary><h4 style={{ display: "inline-block" }}>Stable Releases</h4></summary>
                    <div>
                        {versionByMajor.map((versions, i) => (
                            <div key={i} style={{ marginBottom: '1em' }}>
                                <Button href={`/download/${platform.name}/${versions[0].options.raw}`}>Processing {versions[0].major} ({versions[0].options.raw})</Button>
                            </div>
                        ))}
                    </div>
                </details>
                <details>
                    <summary><h3 style={{ display: "inline-block" }}>All releases</h3></summary>
                    <div>
                        {versionByMajor.map((versions, i) => (
                            <div key={i} style={{ marginBottom: '1em' }}>
                                <h4>Processing {versions[0].major}</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
                                    {versions.map((v, j) => (
                                        <Button key={j} href={`/download/${platform.name}/${v.options.raw}`}>{v.options.raw}</Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </details>
            </details>
        </div>
    )
}