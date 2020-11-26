# processing-website

Repository for the new processing.org

## Folder structure

### Content

This folder contains all the content on the website and it is divide into:

1. Examples

   Examples are divided into category folders and each example has its own folder named like the example with files for every language. The english file is `index.mdx` and the other languages have their code before .mdx (e.g. `index.de.mdx`). Each example has to have a cover image for the index named liked the example file with a 16:9 ratio (minimum width 288px) and a cover image named `Cover.png/Cover.png` for the homepage with 1:1 ratio (minimum width 600px) placed on the same folder.

2. References

   This folder contains all the files necessary for creating the reference pages and it is divided into two folders:

   - translations folder contain a separate folder for every language with "en" being the base one (this should not be changed manually). The language folder is divided into folders that correspond to each of the processing libraries and a processing folder that contains all the core processing references.
   - examples folder contains all the examples that correspond to the references. They are organized in the same folder structure as translations and contain folders named as the references. These folders contain all the .pde and .png files that are necessary for the examples. Each example image should have a size of 400x400px and named after the corresponding example, e.g., for the example `bezier_0.pde` the related image should be named `bezier_0.png` inside the `bezier_` folder.

   By combining files from the translations and examples we create the pages for the references.

   If you want to add a translation just copy the "en" folder rename it to the code<sup>1</sup> of the new language and translate away.

3. Tutorials

   Every text tutorial has its own folder named like the tutorial with files for every language. The english file is index.mdx and the other languages have their code<sup>1</sup> before .mdx (e.g. index.de.mdx). All .mdx files can use custom MDX Components that are globally available with the following tags:

   - `<FixedImage>{image in MDX}</FixedImage>` wraps an image in a container to give it a fixed size. The style can be override through the style attibute.
   - `<HighlightBlock>{content}</HighlightBlock>` wraps content in a gray block to highlight a block of content.
   - `<Intro>{content}</Intro>` changes text styling for the introduction of pages.
   - `<Note>{content}</Note>` a small note with smaller font-size for disclaimer of a certain content.
   
   The current tutorials needs to be translated from their current format (.html) to MDX, see [Table of Components](https://mdxjs.com/table-of-components) for furtherd details. The custom MDX Components are meant to be used to accomplish formatting than the standard MDX components don't support.
   
   Each tutorial has a cover image for the Tutorial index view that needs to be declared in the header of its .mdx file as a `coverImage` with the filename of the cover that must be placed on the same folder. This image should have a 3:1 ratio with a minimum width of 600px.

4. Books

   Every book has its own folder with the .mdx file that includes the data of the book and a description on the body. The cover of the book should be named after the folder.

5. Tools

   The tools are .json files that includes the name and the description of the tool.

6. Pages

   This folder contains all the singular pages (pages that don't belong to any template). Every page has its own folder and inside that folder files for every language. The english file is index.mdx and the other languages have their code before.mdx (e.g. index.de.mdx)

   If you want to add translation copy the english folder rename it so that it contains the code<sup>1</sup> of the language to which you are translating and then translate the inside of the document.

### i18n

This folder contains files necessary for localization (language control).

- config.json file contains all the language information that is necessary for all the pages on the website. When adding a language first copy one of the existing language and then change all the fields to correspond to the language you are adding.

- react-intl folder contains separate json files for every language and this is responsible for the localization of all the UI elements of the webpages. When adding a language first copy en.json file, rename it into the code<sup>1</sup> of the language you are adding and translate all the fields inside (just the right side)

### src

Contains all the logic of the website in several folders:

- templates: contains template files for references (separate for classes and functions), index page for all the libraries and the main processing references, tutorials, and examples.

- pages: all the individual pages

- images: all the images for the website that are not for references, examples, or tutorials

## Links:

1. [list of codes under 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
