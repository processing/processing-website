import { graphql, Link, useStaticQuery } from "gatsby"
import React, { version } from "react"

import { usePlatform } from "./Platform";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import * as styles from './PreviousReleases.module.css';
import Button from "components/Button";

import * as semver from "semver";



export default function PreviousReleases() {
    const platform = usePlatform();
    const versionByMajor = useReleasesByMajor();

    // First version of each major is the LTS version plus 4.3.4
    const ltsVersions = versionByMajor.flatMap(versions => [versions[0], versions.find(v => v.raw === '4.3.4')]).filter(Boolean);


    return (
        <div className={classNames(styles.container, grid.col)}>
            <div className={styles.box}>
                <h3 className={styles.title}>Looking for other versions of Processing?</h3>
                <h4 className={styles.title}>Stable Releases</h4>
                <div className={styles.releasesContainer}>
                    {ltsVersions.map((versions, i) => (
                        <Button key={i} href={`/download/${platform.name}/${versions.options.raw}`}>Processing {versions.major} ({versions.options.raw})</Button>
                    ))}
                    <Link to="/download/releases">See all previous releases</Link>
                </div>
            </div>
        </div>
    )
}


export function useReleasesByMajor() {
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
    return versionByMajor;
}