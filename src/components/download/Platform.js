import Button from 'components/Button';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useMemo, useState } from 'react';


export const PlatformContext = React.createContext();

export const PlatformProvider = PlatformContext.Provider;

export const usePlatform = () => React.useContext(PlatformContext);

export function usePlatforms() {
    const queryResults = useStaticQuery(
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

    const sorted = useMemo(() => queryResults
        .allFile.edges
        .map(e => {
            const { childJson, ...rest } = e.node;
            return { ...childJson, ...rest };
        })
        .sort((a, b) => (a.sort || 0) - (b.sort || 0))
        , [queryResults]);

    return sorted;
}


export function useGuessedPlatform() {
    const platforms = usePlatforms();
    const [selected, setSelected] = useState(platforms.find(node => node.name === "windows"));
    useEffect(() => {
        const { userAgent } = navigator;
        for (let node of platforms) {
            if (userAgent.search(node.userAgent) === -1) continue
            setSelected(node);
            break;
        }
    }, [platforms])
    const rest = platforms.filter(node => node !== selected);
    return { selected, rest };
}