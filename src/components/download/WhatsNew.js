import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useVersionOrLatest } from "./Version";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import * as styles from './WhatsNew.module.css';
import { MDXRenderer } from "gatsby-plugin-mdx";

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
        <h2>{notes.frontmatter.title}</h2>
        <MDXRenderer>{notes.body}</MDXRenderer>
      </div>
    </div>
  );
}