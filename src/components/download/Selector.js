import React, { useEffect, useState } from "react"

import { useStaticQuery } from "gatsby"
import { graphql } from "gatsby"
import Button from "components/Button";


export default function Selector() {
    const data = useStaticQuery(graphql`
        query{
            allMdx(filter: {frontmatter: {platform: {glob: "*"}}}) {
                nodes {
                    frontmatter {
                        platform
                        slug
                        userAgent
                    }
                }
            }
        }
    `);

    const [selected, setSelected] = useState(data.allMdx.nodes.find(node => node.frontmatter.platform === "Windows"));
    useEffect(() => {
        const { userAgent } = navigator;
        for (let node of data.allMdx.nodes) {
            if (userAgent.search(node.frontmatter.userAgent) === -1) continue
            setSelected(node);
            break;
        }
    }, [data])
    const rest = data.allMdx.nodes.filter(node => node !== selected);

    return (
        <div>
            <details>
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </details>
            <Button href={`/download/${selected.frontmatter.slug}`}>Download for {selected.frontmatter.platform}</Button>
            <div>Also available for</div>
            <div>
                {rest.map(node => (
                    <div key={node.frontmatter.platform}>
                        <Button secondary href={`/download/${node.frontmatter.slug}`}>Download for {node.frontmatter.platform}</Button>
                    </div>
                ))}
            </div>
        </div>
    )
}