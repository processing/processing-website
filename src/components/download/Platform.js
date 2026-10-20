import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useMemo, useState } from 'react';
import LogoWindows from '../../images/logo-windows.svg';
import LogoMac from '../../images/logo-macos.svg';
import LogoLinux from '../../images/logo-linux.svg';
import LogoRaspberry from '../../images/logo-raspberry.svg';
import LogoLinuxWhite from '../../images/logo-linux-white.svg';
import LogoRaspberryWhite from '../../images/logo-raspberry-white.svg';

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
        const override = window.location.search.match(/platform=([^&]+)/)?.[1];
        if (override) {
            const node = platforms.find(node => node.name === override);
            if (node) {
                setSelected(node);
                return;
            }
        }

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


export function PlatformIcon({ platform, white, ...rest }) {
    if (platform?.name === "macos") {
        return <LogoMac  {...rest} />;
    } else if (platform?.name === "windows") {
        return <LogoWindows {...rest} />;
    } else if (platform?.name === "linux") {
        return white ? <LogoLinuxWhite {...rest} /> : <LogoLinux {...rest} />;
    } else if (platform?.name === "raspberry-pi") {
        return white ? <LogoRaspberryWhite {...rest} /> : <LogoRaspberry {...rest} />;
    }
    else {
        return null;
    }
}

