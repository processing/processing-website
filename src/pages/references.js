import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import ReferenceList from "../components/referenceList"

const References = () => (
  <Layout>
    <h1>References</h1>
    <ReferenceList/>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default References
