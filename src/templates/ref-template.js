import React from "react";
import {graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

const RefTemplate = ({ data, pageContext }) => {
	return (
		<Layout>
			<h1>{data.json.name}</h1>
			<p>Description: {data.json.description}</p>
			<p>Syntax: {data.json.syntax}</p>
			Parameters:
			{data.json.parameters.map((param, key) => {
				return (
					<p key={"param" + key}>
						{param.name +
							": " +
							param.type +
							" - " +
							param.description}
					</p>
				);
			})}
			<p>Return: {data.json.returns}</p>
			Examples:
			<ul>
				{data.allFile.edges.map((edge, key) => {
					return (
						<li key={"ex" + key}>
							{edge.node.extension === "pde" && (
								<p>
									{edge.node.name}
									{edge.node.internal.content}
								</p>
							)}
							{edge.node.extension === "png" && (
								<Img
									fixed={edge.node.childImageSharp.fixed}
								/>
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
	query($name: String!) {
		json(name: { eq: $name }) {
			name
			description
			syntax
			parameters {
				name
				description
				type
			}
			returns
		}
		allFile(filter: { relativeDirectory: { eq: $name } }) {
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
