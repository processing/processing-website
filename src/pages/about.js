import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"

const About = ({data}) => {
	  const { mdx } = data
  	const { frontmatter, body } = mdx
  	return (
    	<Layout>
    		<h2> {frontmatter.title}</h2>
        <MDXRenderer>{body}</MDXRenderer>
    	</Layout>
  	)
};

export const query = graphql`
  query {
    mdx(frontmatter: { slug: { eq: "/about" } }) {
      body
      frontmatter {
        slug
        title
      }
    }
  }
`

export default About