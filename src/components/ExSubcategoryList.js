import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

const ExSubcategoryList = (props) => {
  const { subcategory, subcategoryRefs, link } = props;
  const { locale } = useLocalization();

  return (
    <div>
      <h3>{subcategory}</h3>
      <ul>
        {subcategoryRefs.map((node, key) => {
          return (
            <li key={key}>
              <Link to={node.childMdx.frontmatter.slug} language={locale}>
                {node.childMdx.frontmatter.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExSubcategoryList;
