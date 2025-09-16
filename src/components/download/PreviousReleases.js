import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import * as semver from "semver";
import { usePlatform } from "./Platform";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';



export default function PreviousReleases() {
    const platform = usePlatform();

    const releases = useStaticQuery(
        graphql`query FindReleases {
        allFile(
          filter: {sourceInstanceName: {eq: "download"}, relativeDirectory: {eq: "releases"}}
        ) {
          edges {
            node {
              childJson {
                tagName
              }
            }
          }
        }
      }
`)
    const versions = releases.allFile.edges
        .map(e => e.node.childJson.tagName.replace(/^processing-(\d+-)?/, ''))
        .map(e => [semver.coerce(e, { includePrerelease: true }), e])
        .reverse()
        .sort((a, b) => semver.compare(b[0], a[0]))
        // conver to object by major version
        .reduce((acc, cur) => {
            const major = cur[0].major;
            if (!acc[major]) acc[major] = [];
            acc[major].push(cur[1]);
            return acc;
        }, [])
        .reverse()
        ;



    return (
        <details style={{ flexBasis: 'var(--col8)' }} className={classNames(grid.col)}>
            <summary>Looking for older versions?</summary>
            {versions.map((v, i) => (
                <details key={i}>
                    <summary>Version {v[0].split('.')[0]} (latest {v[0]})</summary>
                    <ul>
                        {v.map((ver, j) => (
                            <li key={j}>
                                <a href={`/download/${platform.name}/${ver}`}>Processing {ver}</a>
                            </li>)
                        )}
                    </ul>
                </details>
            ))}
            <details>
                <pre>{versions}</pre>
            </details>
        </details>
    )
}