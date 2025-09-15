import classnames from 'classnames'
import React from 'react'
import HeadMatter from 'components/HeadMatter'
import Layout from 'components/Layout'
import * as grid from 'styles/grid.module.css';
import * as css from 'styles/pages/donate.module.css';
import { StaticImage } from "gatsby-plugin-image"
import Selector from 'components/download/Selector';


export default function DownloadPage() {
    return (
        <Layout>
            <HeadMatter
                title={"Download Processing"}
                description={"Download Processing, the open source programming environment for artists, designers, and educators."}
            />
            <div className={classnames(grid.grid, grid.container, css.root)}>
                <div className={classnames(grid.col, css.left)}>
                    <h1>Download <span style={{ color: "blue" }}>Processing</span>,<br /> your friendly creative coding sketchbook.</h1>
                    <Selector />
                </div>
                <div className={classnames(grid.col, css.right)}>
                    <StaticImage src="../images/download-screenshot.png" alt="A dinosaur" />
                </div>

            </div>
            <div className={classnames(grid.grid, grid.container, css.root)}>
                <div className={classnames(grid.col, css.left)}>
                    Pls donate
                </div>
            </div>
        </Layout>
    )
}