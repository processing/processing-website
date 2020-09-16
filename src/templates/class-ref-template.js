import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

import Layout from '../components/Layout';

const ClassRefTemplate = ({ data, pageContext }) => {
  let ref, link;

  if (data.json !== null) {
    ref = data.json.childJson;
  }

  if (pageContext.libraryName === 'processing') {
    link = '/reference/' + pageContext.name + '.html';
  } else {
    link =
      '/reference/libraries/' +
      pageContext.libraryName +
      '/' +
      pageContext.name +
      '.html';
  }

  return (
    <Layout>
      {data.json !== null ? (
        <div>
          <h1>Classname: {ref.name}</h1>
          <p>Description: {ref.description}</p>
          Constructors:
          {ref.constructors.map((cons, key) => {
            return <p key={'f' + key}>{cons}</p>;
          })}
          Fields:
          {ref.classFields.map((field, key) => {
            return (
              <p key={'f' + key}>
                <a href={field.anchor + '.html'}>{field.name} </a>
                {field.desc}
              </p>
            );
          })}
          Methods:
          {ref.methods.map((method, key) => {
            return (
              <p key={'m' + key}>
                <a href={method.anchor + '.html'}>{method.name} </a>
                {method.desc}
              </p>
            );
          })}
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
          <p>Related: {ref.related.join(', ')} </p>
        </div>
      ) : (
        <div>
          This page is not translated, please refer to the
          <Link to={link}> english page</Link>
        </div>
      )}
    </Layout>
  );
};

export default ClassRefTemplate;

export const query = graphql`
  query($name: String!, $assetsName: String!, $locale: String!) {
    json: file(fields: { name: { eq: $name }, lang: { eq: $locale } }) {
      childJson {
        name
        description
        constructors
        classFields {
          anchor
          name
          desc
        }
        methods {
          anchor
          name
          desc
        }
        related
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
