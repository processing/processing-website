# Processing Website

This repo holds the code for the [processing.org](https://processing.org) website. The website is built with [Gatsby](https://www.gatsbyjs.com/).

## Running the site locally

To run the site locally, make sure that you have Node.js installed (`v12` minimum).

1. Clone down this repo and `cd` into the folder via the command-line
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to run the development server

Now open [localhost:8000](http://localhost:8000) in your browser of choice.

## Editing content

Please refer to the [guides](/docs/README.md).

## Folder structure

### `/content`

This folder contains all the content on the website and it is divided into:

1. `/examples`

   Examples are divided into category folders and each example has its own folder named like the example with files for every language. The english file is named `index.mdx` and the other languages have their language code before the `.mdx` file type (e.g. `index.de.mdx`). Each example has to have a cover image for the index named liked the example file with a `16:9` ratio (minimum width 288px) and a cover image named `Cover.png\.jpg` for the homepage with 1:1 ratio (minimum width 600px) placed in the same folder.

2. `/tutorials`

   Every text tutorial has its own folder named after the tutorial with files for every language. The english file is index.mdx and the other languages have their language code<sup>1</sup> before `.mdx` (e.g. index.de.mdx). All `.mdx` files can use custom MDX Components that are globally available with the following tags:

   - `<FixedImage>{image in MDX}</FixedImage>` wraps an image in a container to give it a fixed size. The style can be overriden through the style attribute.
   - `<HighlightBlock>{content}</HighlightBlock>` wraps content in a gray block to highlight a block of content.
   - `<Intro>{content}</Intro>` changes text styling for the introduction of pages.
   - `<Note>{content}</Note>` a small note with smaller font-size for disclaimer of a certain content.

   The current tutorials need to be translated from their current format (`.html`) to MDX, see [Table of Components](https://mdxjs.com/table-of-components) for further details.

   Each tutorial has a cover image for the index pages that needs to be declared in the header of its .mdx file as a `coverImage` key with the filename of the cover that must be placed in the same folder. This image should have a `3:1` ratio with a minimum width of `600px`.

3. `/books`

   Every book has its own folder with an `.mdx` file that includes the data of the book and a body text description. The cover of the book should be named after the folder.

4. `/tools`

   The tools are `.json` files that include the name and the description of the tool.

5. `/pages`

   This folder contains all the singular pages that don't belong to any template. Every page has its own folder and inside that folder, files for every language. The english file is named `index.mdx` and the other languages have their code before `.mdx` (e.g. `index.de.mdx`)

   If you want to add a translation, copy the english folder, rename it so that it contains the language code<sup>1</sup> and then translate the document.

### `/i18n`

This folder contains files necessary for localization (language control).

- The `config.json` file contains a list of the languages used throughout the website. If a language is not in this file, it is not available in the language selector. When adding a language, first copy one of the existing languages and then change all the fields to correspond to the language you are adding.

- The `/react-intl` folder contains separate `.json` files for every language and these files are responsible for the localization of the UI elements in the website. When adding a language, first copy the `en.json` file, rename it into the language code<sup>1</sup>and translate all the JSON values (not the keys).

### `/src`

The `src` folder contains all the logic of the website in several folders:

- `/templates`: contains template files for references (separate for classes and functions), index page for all the libraries and the main processing references, tutorials, and examples.

- `/pages`: all the individual pages

- `/images`: all the images for the website that are not for references, examples, or tutorials

## Links:

1. [list of codes under 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
