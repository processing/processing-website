import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import HeadMatter from 'components/HeadMatter'
import Layout from 'components/Layout'
import DownloadCTA from 'components/download/DownloadCTA';
import { useGuessedPlatform } from 'components/download/Platform'


export default function DownloadPage() {
    const { selected } = useGuessedPlatform();

    useEffect(() => {
        if (selected?.name) {
            navigate(`/download/${selected.name}`, { replace: true });
        }
    }, [selected]);

    return (
        <Layout>
            <HeadMatter
                title={"Download Processing"}
                description={"Download Processing, the open source programming environment for artists, designers, and educators."}
            />
            <DownloadCTA />
        </Layout>
    )
}
