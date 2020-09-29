//filters the references based on a search text
export const filterItems = (items, searchTerm) => {
  if (searchTerm && searchTerm !== '') {
    let filteredItems = { nodes: '' };
    filteredItems.nodes = items.nodes.filter((item) =>
      JSON.stringify(item).includes(searchTerm)
    );
    return filteredItems;
  }
  return items;
};
