import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import "./reference.css";

const Reference = ({ children }) => {
	return (
		<div>
			<main>{children}</main>
		</div>
	);
};

export default Reference;
