import React from "react"
import { Link } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"

import Layout from "../components/layout"
import ReferenceList from "../components/referenceList"

const References = ({data}) => {

	return (
  		<Layout>
    		<h1>References</h1>
    		<ReferenceList data={data}/>
    		<Link to="/">Go back to the homepage</Link>
  		</Layout>
	);
};

	

export default References

export const query = graphql`
    query($locale: String!) {
      allFile(filter: {fields: {lang: {eq: $locale}}, sourceInstanceName: {eq: "json"}}) {
        edges {
          node {
            name
          }
        }
      }
    }
  `;