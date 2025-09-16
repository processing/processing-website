import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import * as semver from 'semver';

export const VersionContext = React.createContext('1.0.0');

export const VersionProvider = VersionContext.Provider;

export const useVersion = () => React.useContext(VersionContext);

export function useVersionOrLatest() {
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

    const version = useVersion();
    if (version) {
        return version
    }

    const releases = versions.allFile.edges
        .map(e => e.node.childJson.tagName.replace(/^processing-(\d+-)?/, ''))
        .map(e => [semver.coerce(e, { includePrerelease: true }), e])
        .reverse()
        .sort((a, b) => semver.compare(b[0], a[0]))
        ;

    return releases[0][1];
}