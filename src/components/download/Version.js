import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import * as semver from 'semver';

export const VersionContext = React.createContext();

export const VersionProvider = VersionContext.Provider;

export const useVersion = () => React.useContext(VersionContext);

export function useVersionOrLatest() {


    const version = useVersion();
    const latest = useLatestVersion();
    if (version) {
        return version
    }
    return latest;
}

export function useLatestVersion() {
    const versions = useStaticQuery(graphql`
        query {
            allFile(filter: {sourceInstanceName: {eq: "download"}, relativeDirectory: {eq: "releases"}}) {
                edges {
                    node {
                        childJson {
                            name
                            isPrerelease
                            tagName
                        }
                    }
                }
            }
        }`);

    const releases = versions.allFile.edges
        .filter(e => e.node.childJson.isPrerelease === false)
        .map(e => e.node.childJson.tagName.replace(/^processing-(\d+-)?/, ''))
        .map(e => semver.coerce(e, { includePrerelease: true, raw: e }))
        .reverse()
        .sort((a, b) => semver.compare(b, a))
        ;

    return releases[0].options.raw;
}