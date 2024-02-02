# Processing Website

This repo holds the code for the [processing.org](https://processing.org) website. The website is built with [Gatsby](https://www.gatsbyjs.com/).

## Running the site locally

To run the site locally, make sure that you have Node.js installed (`v12` minimum).

1. Clone down this repo and `cd` into the folder via the command-line
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to run the development server

Now open [localhost:8000](http://localhost:8000) in your browser of choice.

## Editing content

In order to edit the content on the website, it's important to understand how the translation and internationalization frameworks are set up. For this, we distinguish between two things:

### UI language

This content is more static, such as page headings and the descriptions on the front page. This is controlled by the `react-intl` package, and all definitions of UI language can be found in the [`i18n/react-intl`](/i18n/react-intl) folder. Each language will have its own `.json` file in this folder, and this is where edits to the UI language should happen.

### Page content

This content includes most of the content on the website such as the individual items under reference, tutorials, tools, etc. Each content type has its own setup based on where the source lives. As an example, the reference is generated from the Processing source code and has its own way of translating those generated files. The following guides explain how to change the content on the website by section.

- [Download](/docs/download.md)
- Documentation
  - [Reference](/docs/reference.md)
  - [Environment](/docs/markdown-pages.md)
  - [Libraries](/docs/libraries.md)
  - [Tools](/docs/tools.md)
- Learn
  - [Tutorials](/docs/tutorials.md)
  - [Examples](/docs/examples.md)
  - [Books](/docs/books.md)
- Teach (External link)
- [About](/docs/markdown-pages.md)
- Donate (External link)

When translating the content to a new language you need to edit the [`i18n/config.json`](/i18n/config.json) file and add your language information. Then follow the instructions for each Content list (same links as above).

## Writing code

- [Writing CSS](/docs/css.md)

## Deploying the site

The website is set up to deploy itself whenever the "Deploy Website" GitHub action is run. This triggers a new deploy from the `main` branch where the website is built, uploaded, and a new GitHub Release is created with a `reference.zip` file containing the contents of the website for loading in the IDE.

1. Go to [Actions](https://github.com/processing/processing-website/actions)
2. Click "Deploy Website" in the left sidebar
3. Click "Run workflow" on the right
4. Fill in the details and click the green "Run workflow" button.

Note that it's possible to deploy the website with or without making a GitHub release. For this, toggle the checkbox under "Run workflow".

## `keywords.txt`

The website repo has a script that generates the `keywords.txt` file into the `processing4` repo to use for syntax highlighting the PDE. Follow these steps in order to generate that file:

1. Make sure you have this `processing-website` repo and the `processing4` repo next to each other on your computer
2. Make sure the [JavaDoc and reference](https://github.com/processing/processing-website/blob/main/docs/reference.md) are up to date with the latest version of Processing. Otherwise make the necessary updates to the JavaDoc in the `processing4` repo then [run the Doclet script](https://github.com/processing/processing-doclet/blob/main/README.md). _(note: this step is only necessary if new keywords were added to the Processing API)_
3. Run `npm run updateKeywords`

The `processing4` repo now has an updated `java/keywords.txt` file.

## Building the site

If you need to manually build the site, you can do it by running `npm run build` from the project source. This command is that runs behind the scenes when deploying a release.

It will build from the source and produce the static website in a folder `public`. Once built, the site can run in any static file server.

## Join the Processing community
We proudly host an active and vibrant community on our [Processing Discourse Forum](https://discourse.processing.org/). Here you can find engaging discussions, ask questions, share your projects, and interact with like-minded Processing enthusiasts of all experience levels.

[![Discourse Users](https://img.shields.io/discourse/users?server=https%3A%2F%2Fdiscourse.processing.org)](https://discourse.processing.org/)
