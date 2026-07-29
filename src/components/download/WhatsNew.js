import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useVersionOrLatest } from "./Version";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import * as styles from './WhatsNew.module.css';
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

const GITHUB_PULL_REQUEST_PATH = /^https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/(\d+)(?:[/?#].*)?$/i;

const releaseNoteShortcodes = {
  a: ({ href = "", children, ...props }) => {
    const pullRequest = href.match(GITHUB_PULL_REQUEST_PATH);
    const label = pullRequest ? `#${pullRequest[1]}` : children;

    return (
      <a href={href} {...props}>
        {label}
      </a>
    );
  }
};

const query = graphql`
query FindDescriptions {
  allMdx(filter: {frontmatter: {release: {eq: true}}}) {
    edges {
      node {
        body
        frontmatter {
          title
          tagName
        }
      }
    }
  }
}`

export default function WhatsNew() {
  const version = useVersionOrLatest();

  const descriptions = useStaticQuery(query)
  const notes = descriptions.allMdx.edges.find(edge => edge.node.frontmatter.tagName.includes(version))?.node


  return (
    <div className={classNames(styles.container, grid.col)}>
      <div className={styles.content}>
        <h2>Release Notes</h2>
        <MDXProvider components={releaseNoteShortcodes}>
          <MDXRenderer>{notes.body}</MDXRenderer>
        </MDXProvider>
      </div>
    </div>
  );
}