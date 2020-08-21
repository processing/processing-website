import React from "react";
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { useLocalization } from "gatsby-theme-i18n"

const ReferenceList = (props) => {
  const { locale } = useLocalization()
  const { data, library } = props;

  let link;

  if (library === "processing")
    link = "/references/";
  else 
    link = "/libraries/" + library + "/";

  return (
    <div>
      <ul>
        {data.allFile.edges.map((edge, key) => {
          return (
            <li key={key}>
              <Link to={link + edge.node.name} language={locale}>{edge.node.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReferenceList;
