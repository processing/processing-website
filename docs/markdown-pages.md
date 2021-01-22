# Markdown pages

Some pages on the website are created via `.mdx` files. These are traditional markdown files that can embed React components for more interactive content. The following pages are all created this way, and the guide in this document works for all of these pages.

- Environment (in the `/src/pages/environment` folder)
- About (in the `/src/pages/about` folder)
- Libraries (in the `/src/pages/libraries` folder. Does not apply to Contributions on the same page)

## Editing the english version of a page

1. Find the `.mdx` file in a folder above and edit the content
2. [Publish the website](/docs/publish)

## Translating a markdown page

1. Find the `.mdx` file in a folder above
2. Make a copy by adding the language name in the filename (e.g. `index.mdx` becomes `index.de.mdx`)
3. [Publish the website](/docs/publish)

If you are running the website locally with `npm run dev`, you might need to stop the development server and run `npm run clean` to clear the cache before seeing the changes on localhost.
