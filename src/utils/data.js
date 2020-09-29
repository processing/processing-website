import { titleCase as _titleCase } from 'title-case';

// applies title case after replacing _ by spaces
export const titleCase = (slug) => _titleCase(slug.replace(/_/g, ' '));

//filters the references based on a search text
export const filterItems = (items, searchTerm) => {
  if (searchTerm && searchTerm !== '') {
    return items.filter((item) => {
      try {
        return JSON.stringify(Object.values(item.childJson))
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } catch (e) {
        return false;
      }
    });
  } else {
    return items;
  }
};

export const organizeReferenceItems = (items) => {
  const tree = [];

  items.forEach((item) => {
    const { category, subcategory } = item.childJson;

    let categoryIndex = tree.findIndex((cat) => cat.slug == category);

    if (categoryIndex === -1) {
      tree.push({
        slug: category,
        name: titleCase(category),
        children: [],
      });
      categoryIndex = tree.length - 1;
    }

    let subcategoryIndex = tree[categoryIndex].children.findIndex(
      (subcat) => subcat.slug === subcategory
    );

    if (subcategoryIndex === -1) {
      tree[categoryIndex].children.push({
        slug: subcategory ? subcategory : '',
        name: subcategory ? titleCase(subcategory) : '',
        children: [],
      });
      subcategoryIndex = tree[categoryIndex].children.length - 1;
    }
    tree[categoryIndex].children[subcategoryIndex].children.push({
      slug: item.name.replace('_', ''),
      dir: item.relativeDirectory,
      ...item.childJson,
    });
  });
  return tree;
};
