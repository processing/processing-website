import React from "react";
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { useLocalization } from "gatsby-theme-i18n"

const ReferenceList = (props) => {
  const { locale } = useLocalization()
  const { data } = props;

  return (
    <div>
      <h1>Lang {locale}</h1>
      <ul>
        {data.allFile.edges.map((edge, key) => {
          return (
            <li key={key}>
              <Link to={"/references/" + edge.node.name} language={locale}>{edge.node.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReferenceList;
