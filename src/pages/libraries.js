import React from "react"
import { graphql } from "gatsby"

import { LocalizedLink as Link } from "gatsby-theme-i18n"

import Layout from "../components/layout"
import { useLocalization } from "gatsby-theme-i18n"

const Libraries = ({data}) => {
  const { locale } = useLocalization()

	return (
  		<Layout>
    		<h1>Libraries</h1>
        <ul>
        {data.allDirectory.nodes.map((node, key) => {
          return (
            <li key={key}>
              <Link to={"/libraries/" + node.name} language={locale}>{node.name}</Link>
            </li>
          );
        })}
      </ul>
  		</Layout>
	);
};

	

export default Libraries

export const query = graphql`
    query($locale: String!) {
      allDirectory(filter: {relativeDirectory: {eq: $locale}, name: {ne: "processing"}}) {
        nodes {
          name
        }
      }
    }
  `;