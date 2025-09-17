import classNames from "classnames"
import React from "react"
import * as styles from "./Share.module.css"

export default function Share() {
    return (
        <li>
            Make something great, post with the hashtag <span className={classNames(styles.hashtag)}>#BuiltWithProcessing</span>, and @ us on
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "0 1em", paddingLeft: "1em", marginTop: "0.5em", background: "var(--lightgray)" }}>
                <li>Twitter: <a href="https://twitter.com/processingorg" target="_blank" rel="noreferrer">@processingorg</a></li>
                <li>Instagram: <a href="https://www.instagram.com/processingorg/" target="_blank" rel="noreferrer">@processingorg</a></li>
                <li>Facebook: <a href="https://www.facebook.com/processingfoundation" target="_blank" rel="noreferrer">Processing Foundation</a></li>
                <li>LinkedIn: <a href="https://www.linkedin.com/company/processing-foundation/" target="_blank" rel="noreferrer">Processing Foundation</a></li>
            </ul>
        </li>
    )
}