import { titleCase as _titleCase } from 'title-case';

// applies title case after replacing _ by spaces
export const titleCase = (slug) => _titleCase(slug.replace(/_/g, ' '));

//filters the references/examples based on a search text
export const filterItems = (items, searchTerm) => {
  if (searchTerm && searchTerm !== '') {
    const searchTerms = searchTerm.split(' ');
    return items.filter((item) => {
      try {
        return item.childJson
          ? searchTerms.every((term) =>
              JSON.stringify(Object.values(item.childJson))
                .toLowerCase()
                .includes(term.toLowerCase())
            )
          : searchTerms.every((term) =>
              JSON.stringify(item).toLowerCase().includes(term.toLowerCase())
            );
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

    let categoryIndex = tree.findIndex(
      (cat) => cat.slug.toLowerCase() === category.toLowerCase()
    );

    if (categoryIndex === -1) {
      tree.push({
        slug: category.toLowerCase(),
        name: titleCase(category),
        children: [],
      });
      categoryIndex = tree.length - 1;
    }

    let subcategoryIndex = tree[categoryIndex].children.findIndex(
      (subcat) => subcat.slug.toLowerCase() === subcategory.toLowerCase()
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
      slug: item.name,
      dir: item.relativeDirectory,
      ...item.childJson,
    });
  });

  return tree;
};

export const organizeExampleItems = (items, images) => {
  const tree = [];

  items.forEach((item) => {
    const image = images
      ? images.find((img) => img.relativeDirectory === item.relativeDirectory)
      : '';
    const category = item.relativeDirectory.split('/')[0];
    const subcategory = item.relativeDirectory.split('/')[1];

    let categoryIndex = tree.findIndex((cat) => cat.slug === category);

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
      slug: item.relativeDirectory.split('/')[2],
      name: item.childJson.name,
      dir: item.relativeDirectory,
      img: image,
      ...item.childJSON,
    });
  });

  return tree;
};

export const subcategoryFromDirectory = (relDir) => {
  const category = relDir.split('/')[1];
  return category.charAt(0).toUpperCase() + category.slice(1);
};
