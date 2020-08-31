import React from 'react';
import { graphql } from 'gatsby';

import Img from 'gatsby-image';
import { useLocalization } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';

const RefTemplate = ({ data, pageContext }) => {
  const { locale } = useLocalization();

  return (
    <Layout>
      <div>Current locale: {locale}</div>
      <h1>{data.json.childJson.name}</h1>
      <p>Description: {data.json.childJson.description}</p>
      Parameters:
      {data.json.childJson.parameters.map((param, key) => {
        return (
          <p key={'param' + key}>
            {param.name + ': ' + param.type + ' - ' + param.description}
          </p>
        );
      })}
      <p>Return: {data.json.childJson.returns}</p>
      Examples:
      <ul>
        {data.allFile.edges.map((edge, key) => {
          return (
            <li key={'ex' + key}>
              {edge.node.extension === 'pde' && (
                <p>
                  {edge.node.name}
                  {edge.node.internal.content}
                </p>
              )}
              {edge.node.extension === 'png' && (
                <Img fixed={edge.node.childImageSharp.fixed} />
              )}
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default RefTemplate;

export const query = graphql`
  query($name: String!, $assetsName: String!) {
    json: file(fields: { name: { eq: $name } }) {
      childJson {
        name
        description
        parameters {
          name
          description
          type
        }
        returns
      }
    }
    allFile(filter: { relativeDirectory: { eq: $assetsName } }) {
      edges {
        node {
          name
          internal {
            content
          }
          extension
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
