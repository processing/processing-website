import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useVersionOrLatest } from "./Version";
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';

const query = graphql`
      query FindDescriptions {
        allFile(filter: {childJson: {tagName: {glob: "*"}}}) {
          edges {
            node {
              childrenJson {
                tagName
                description
              }
            }
          }
        }
      }
    `

export default function WhatsNew() {
  const version = useVersionOrLatest();

  const descriptions = useStaticQuery(query)
  const description = descriptions.allFile.edges.find(edge => edge.node.childrenJson[0].tagName.includes(version))?.node.childrenJson[0].description;


  return (
    <div style={{ flexBasis: 'var(--col8)' }} className={classNames(grid.col)}>
      <details>
        <summary><h3 style={{ display: "inline-block" }}>What's New?</h3></summary>
        <div style={{ whiteSpace: "pre-wrap", background: "var(--lightgray)", padding: "var(--gutter-double)" }}>{description}</div>
      </details>
    </div>
  );
}