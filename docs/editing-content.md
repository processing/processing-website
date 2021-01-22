# Editing content

In order to edit the content on the website, it's important to understand how the translation and internationalization frameworks are set up. For this, we distinguish between two things:

- **UI language**. This content is more static, such as page headings and the descriptions on the front page. This is controlled by the `react-intl` package, and all definitions of UI language can be found in the [`i18n/react-intl`](/i18n/react-intl) folder. Each language will have its own `.json` file in this folder, and this is where edits to the UI language happens.
- **Content** that changes more often, such as the individual items under reference, tutorials, etc. Each content type has its own translation setup based on where the source lives. As an example, the reference is generated from the Processing source code and has its own way of translating those generated files. You can read about how to change this content under the guide for each content item below.

The following guides explain how to change the content on the website by section.

- [Download](/docs/download.md)
- Documentation
  - [Reference](/docs/reference.md)
  - [Environment](/docs/markdown-pages.md)
  - [Libraries](/docs/libraries.md)
  - [Tools](#)
- Learn
  - [Tutorials](#)
  - [Examples](#)
  - [Books](#)
- [Teach](#)
- [About](#)
- [Donate](#)
