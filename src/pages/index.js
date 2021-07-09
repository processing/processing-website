import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const IndexPage = ({ data }) => {
  return (
    <div>
      {data.exampleImages.nodes.map((image, i) => (
        <GatsbyImage key={`img-${i}`} image={getImage(image)} alt="" />
      ))}
    </div>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    exampleImages: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        extension: { regex: "/(jpg)|(jpeg)|(png)|(gif)/" }
      }
    ) {
      nodes {
        childImageSharp {
          gatsbyImageData(width: 800)
        }
      }
    }
  }
`;
