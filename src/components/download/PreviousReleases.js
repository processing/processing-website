import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import * as semver from "semver";
import { usePlatform } from "./Platform";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import Button from "components/Button";



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
    const versionByMajor = releases.allFile.edges
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
        <div style={{ flexBasis: 'var(--col8)', background: "var(--lightgray);", paddingBlock: 20 }}>
            <h4 style={{ paddingInline: 40 }}>Looking for older versions of Processing?</h4>
            <details className={classNames(grid.col)}>
                <summary style={{ paddingInline: 20 }}>Show</summary>
                <div style={{ display: "flex", flexDirection: "row", gap: 20, paddingBlock: 10 }}>
                    {versionByMajor.map((versions, i) => (
                        <div key={i} style={{ paddingInline: 40, }}>
                            <h4>Processing {versions[0].major}</h4>
                            <Button href={`/download/${platform.name}/${versions[0].options.raw}`}>Processing {versions[0].options.raw}</Button>
                            <details style={{ marginTop: 20 }}>
                                <summary>More releases</summary>
                                <ul>
                                    {versions.map((version, j) => (
                                        <li key={j}>
                                            <a href={`/download/${platform.name}/${version.options.raw}`}>Processing {version.options.raw}</a>
                                        </li>)
                                    )}
                                </ul>
                            </details>
                        </div>
                    ))}
                </div>
            </details>
        </div>
    )
}