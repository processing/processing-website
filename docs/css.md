# CSS

## Using the grid system

The CSS grid system in the website uses flexbox to achieve a 8-column layout, reflecting the 8-column grid in the logo system. It consists of two classes and a number of CSS variables.

To create a column layout:

1. Import the `grid.module.css` file in your React component and add the `.grid` class to the element that needs to have columns.
2. On the child elements that need to be shown in columns, use the `.col` class alongside a custom class that sets the `flex-basis` property using the CSS variables `var(--col1)` – `var(--col8)`. You can code responsive designs by reassigning the `var(--col1)` – `var(--col8)` variables.

The `.grid` class can be used on either a `.col` element or on a child of a `.col` element for nested grids.
