# Editing content

In order to edit the content on the website, it's important to understand how the translation and internationalization frameworks are set up. For this, we distinguish between two things:

## UI language

This content is more static, such as page headings and the descriptions on the front page. This is controlled by the `react-intl` package, and all definitions of UI language can be found in the [`i18n/react-intl`](/i18n/react-intl) folder. Each language will have its own `.json` file in this folder, and this is where edits to the UI language should happen.

## Content lists

This content changes more often, and is often shown in list form. This includes most of the content on the website such as the individual items under reference, tutorials, tools, etc. Each content type has its own setup based on where the source lives. As an example, the reference is generated from the Processing source code and has its own way of translating those generated files. The following guides explain how to change the content on the website by section.

- [Download](/docs/download.md)
- Documentation
  - [Reference](/docs/reference.md)
  - [Environment](/docs/markdown-pages.md)
  - [Libraries](/docs/libraries.md)
  - [Tools](/docs/tools.md)
- Learn
  - [Tutorials](/docs/tutorials.md)
  - [Examples](/docs/examples.md)
  - [Books](/docs/markdown-pages.md)
- Teach (External link)
- [About](/docs/markdown-pages.md)
- Donate (External link)
