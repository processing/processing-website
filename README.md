# processing-website

Repository for the new processing.org

## Folder structure

### Content

This folder contains all the content on the website and it is divide into

1. Examples
   Examples are divided into category folders and each example has its own folder named like the example with files for every language. The english file is index.mdx and the other languages have their code before .mdx (e.g. index.de.mdx)

2. Pages
   This folder contains all the singular pages (pages that don't belong to any template). Every page has its own folder and inside that folder files for every language. The english file is index.mdx and the other languages have their code before.mdx (e.g. index.de.mdx)

   If you want to add translation copy the english folder rename it so that it contains the code<sup>1</sup> of the language to which you are translating and then translate the inside of the document.

3. References
   This folder contains all the files necessary for creating the reference pages and it is divided into two folders:

   - translations folder contain a separate folder for every language with "en" being the base one (this should not be changed manually). The language folder is divided into folders that correspond to each of the processing libraries + folder processing that contains all the core processing references.
   - examples folder contains all the examples that correspond to the references. They are organized in the same folder structure as translations and contain folders named as the references. These folders contain all the pde and png files that are necessary for the examples

   By combining files from the translations and examples we create the pages for the references.

   If you want to add a traslation just copy the "en" folder rename it to the code<sup>1</sup> of the new language and translate away.

4. Tutorials
   Every text tutorial has its own folder named like the tutorial with files for every language. The english file is index.mdx and the other languages have their code<sup>1</sup> before .mdx (e.g. index.de.mdx)

### i18n

This folder contains files necessary for localization (language control).

- config.json file contains all the language information that is necessary for all the pages on the website. When adding a language first copy one of the existing language and then change all the fields to correspond to the language you are adding.

- react-intl folder contains separate json files for every language and this is responsible for the localization of all the UI elements of the webpages. When adding a language first copy en.json file, rename it into the code<sup>1</sup> of the language you are adding and translate all the fields inside (just the right side)

### src

Contains all the logic of the website in several folders:

- templates: contains template files for references (separate for classes and functions), index page for all the libraries and the main processing references, tutorials, and examples.

- pages: all the singular pages

- images: all the images for the website that are not for references, examples, or tutorials

- components:

## Links:

1. [list of codes under 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
