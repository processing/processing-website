import React from "react"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { useIntl } from "react-intl"

import Layout from "../components/layout"

const IndexPage = () => {
	const intl = useIntl();
	return (
  <Layout>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
    </div>
    <Link to="/references/">{intl.formatMessage({ id: "references" })}</Link> <br />
  </Layout>
  );
};

export default IndexPage
