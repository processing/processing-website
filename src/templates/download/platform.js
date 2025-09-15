import React from 'react';

import classnames from 'classnames';
import HeadMatter from 'components/HeadMatter';
import Layout from 'components/Layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import * as grid from 'styles/grid.module.css';
import * as css from 'styles/pages/donate.module.css';
import { PlatformProvider } from 'components/download/Platform';
import Selector from 'components/download/Selector';
import Donate from 'components/Donate';
import DownloadButton from 'components/download/Download';
import PreviousReleases from 'components/download/PreviousReleases';
import { VersionProvider } from 'components/download/Version';
import WhatsNew from 'components/download/WhatsNew';

export default function PlatformDownloadPage({ pageContext }) {
    const { platform, version } = pageContext;

    const versionText = version ? ` (${version})` : '';
    return (
        <PlatformProvider value={platform}>
            <VersionProvider value={version}>
                <Layout>
                    <HeadMatter
                        title={"Download Processing"}
                        description={"Download Processing, the open source programming environment for artists, designers, and educators."}
                    />
                    <Selector />
                    <div className={classnames(grid.grid, grid.container, css.root)}>
                        <h1>Install Processing {versionText} For {platform.frontmatter.platform}</h1>
                    </div>
                    <div>
                        <MDXProvider components={{ Donate, DownloadButton, PreviousReleases, WhatsNew }}>
                            <MDXRenderer>{platform.body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </Layout>
            </VersionProvider>
        </PlatformProvider>
    )
}