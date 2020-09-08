import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

const SubcategoryList = (props) => {
  const { subcategory, subcategoryRefs, link } = props;
  const { locale } = useLocalization();

  return (
    <div>
      <h3>{subcategory}</h3>
      {locale}
      <ul>
        {subcategoryRefs.map((node, key) => {
          return (
            <li key={key}>
              <Link to={link + node.name.split('.')[0] + '.html'}>
                {node.childJson.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubcategoryList;
