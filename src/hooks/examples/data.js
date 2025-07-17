import { useStaticQuery, graphql } from "gatsby"

export const useExampleDataFiles = (sketchName) => {
  const data = useStaticQuery(
    graphql`
query GetExampleDataFiles {
  allFile(
    filter: {sourceInstanceName: {eq: "examples"}, name: {}, relativePath: {regex: "/data/"}}
  ) {
    edges {
      node {
        relativePath
        publicURL
      }
    }
  }
}`
  )
  return data.allFile.edges
    .map((edge) => edge.node)
    .filter(node => node.relativePath.includes(sketchName))
    ;
}