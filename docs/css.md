# CSS

## Using the grid system

The CSS grid system in the website uses flexbox to achieve a 8-column layout, reflecting the 8-column grid in the logo system. It consists of a number of mixins (using PostCSS mixins) and CSS variables.

To create a column layout:

1. Add a class to the parent element and use `@mixin grid;` in the CSS of that class.
2. On the child elements that need to be shown in columns, use `@mixin column` in the same way. You can pass the number of columns that the element should span such as `@mixin column 4` or `@mixin column 7`.
3. Whn you want to change the column widths in responsive designs, use the `var(--col1)` – `var(--col8)` variables. You can also use the mixins for this, but it will add repetitive CSS to the final CSS file and using the variables is encouraged.
