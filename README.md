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

3) `/books`

   Every book has its own folder with an `.mdx` file that includes the data of the book and a body text description. The cover of the book should be named after the folder.

4) `/tools`

   The tools are `.json` files that include the name and the description of the tool.

5) `/pages`

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
