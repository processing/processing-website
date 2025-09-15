import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useVersion } from "./Version";

export default function WhatsNew() {
    // TODO Set up version fallback
    const version = useVersion();

    const descriptions = useStaticQuery(graphql`
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
`)
    const description = descriptions.allFile.edges.find(edge => edge.node.childrenJson[0].tagName.includes(version))?.node.childrenJson[0].description;


    return (
        <details>
            <summary>What's New?</summary>
            <pre>{description}</pre>
        </details>
    );
}