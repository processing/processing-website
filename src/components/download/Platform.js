import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';


export const PlatformContext = React.createContext();

export const PlatformProvider = PlatformContext.Provider;

export const usePlatform = () => React.useContext(PlatformContext);

export function usePlatforms() {
    return useStaticQuery(
        graphql`
            query FindPlatforms {
                allFile(filter: {sourceInstanceName: {eq: "download"}, relativeDirectory: {eq: "platforms"}}) {
                    edges {
                        node {
                            name
                            childJson {
                                title
                                userAgent
                                sort
                            }
                        }
                    }
                }
            }
        `)
        .allFile.edges.map(e => {
            const { childJson, ...rest } = e.node;
            return { ...childJson, ...rest };
        })
        .sort((a, b) => (a.sort || 0) - (b.sort || 0));
}
