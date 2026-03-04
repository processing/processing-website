import React from 'react'
import HeadMatter from 'components/HeadMatter'
import Layout from 'components/Layout'
import DownloadCTA from 'components/download/DownloadCTA';


export default function DownloadPage() {

    // TODO: Start preloading selected platform download

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
