import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useVersionOrLatest } from "./Version";
import { usePlatform } from "./Platform";



const query = graphql`
      query FindReleaseAssets {
        allFile(filter: {childJson: {tagName: {glob: "*"}}}) {
          edges {
            node {
              childrenJson {
                tagName
                releaseAssets {
                    edges {
                      node {
                          downloadUrl
                          name
                          size
                      }
                    }
                }
              }
            }
          }
        }
      }
    `

export function useReleases() {
  return useStaticQuery(query).allFile.edges.map(edge => edge.node.childrenJson[0]);
}

export function useAssets() {
  const version = useVersionOrLatest();
  const platform = usePlatform();
  const releases = useReleases();
  const release = releases.find(release => release.tagName.includes(version));

  return release.releaseAssets.edges.map(edge => edge.node).filter(asset => asset.name.includes(platform.assets ?? platform.name));
}
