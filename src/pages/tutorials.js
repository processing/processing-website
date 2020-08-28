import React from "react"
import { graphql } from "gatsby"

import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { LocalesList } from "gatsby-theme-i18n"

import Layout from "../components/layout"
import { useLocalization } from "gatsby-theme-i18n"

const Tutorials = ({data}) => {
  const { locale, defaultLang } = useLocalization()


	return (
  		<Layout>
      <LocalesList />
      <div>Current locale: {locale}</div>
      <div>Current defaultLang: {defaultLang}</div>
    		<h1>Tutorials</h1>
        <ul>
        {data.allFile.nodes.map((node, key) => {
          return (
            <li key={key}>
              <Link to={node.childMdx.frontmatter.slug}>{node.name}</Link>
            </li>
          );
        })}
      </ul>
  		</Layout>
	);
};

	

export default Tutorials

export const query = graphql`
    query ($locale: String!){
      	allFile(filter: {sourceInstanceName: {eq: "tutorials"}, childMdx: {fields: {locale: {eq: $locale}}}}) {
    		nodes {
      			name
      			childMdx {
        			frontmatter {
          				slug
        			}
      			}
    		}
  		}
    }
  `;