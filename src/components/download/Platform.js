import Button from 'components/Button';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useMemo, useState } from 'react';
import LogoWindows from 'images/logo-windows.svg';
import LogoMac from 'images/logo-macos.svg';
import LogoLinux from 'images/logo-linux.svg';
import LogoRaspberry from 'images/logo-raspberry.svg';

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
                                assets
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
    const [selected, setSelected] = useState();
    useEffect(() => {
        const { userAgent } = navigator;
        for (let node of platforms) {
            if (userAgent.search(node.userAgent) === -1) continue
            setSelected(node);
            return;
        }
        setSelected(platforms.find(node => node.name === "windows"))
    }, [platforms])
    const rest = platforms.filter(node => node !== selected);
    return { selected, rest };
}


export function PlatformIcon({ platform, ...rest }) {
    if (platform?.name === "macos") {
        return <LogoMac  {...rest} />;
    } else if (platform?.name === "windows") {
        return <LogoWindows {...rest} />;
    } else if (platform?.name === "linux") {
        return <LogoLinux  {...rest} />;
    } else if (platform?.name === "raspberry-pi") {
        return <LogoRaspberry {...rest} />;
    }
    else {
        return null;
    }
}

