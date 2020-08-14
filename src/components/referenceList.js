import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const ReferenceList = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "json" } }) {
        edges {
          node {
            name
          }
        }
      }
    }
  `);

  return (
    <div>
      <ul>
        {data.allFile.edges.map((edge, key) => {
          return (
            <li key={key}>
              <a href={edge.node.name}>{edge.node.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReferenceList;
