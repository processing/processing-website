# Processing Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/e1d72dc4-ad96-4b12-bc25-4ec2aa532ad7/deploy-status)](https://app.netlify.com/sites/java-processing-faf822/deploys)

This repo holds the code for the [processing.org](https://processing.org) website. The website is built with [Gatsby](https://www.gatsbyjs.com/) and hosted on [Netlify](https://www.netlify.com/).

We welcome contributions from the community to help improve the site!

## How To Contribute

By contributing to this repository you agree to follow our community guidelines. Before getting started, please read our [Code of Conduct](https://github.com/processing/processing-website/blob/main/CODE-OF-CONDUCT.md). 

To contribute to the Processing website, you'll need to set up the project on your local machine, make and test your changes, and then submit a pull request.

### Step 1. Pick an Issue (or create one)

Look at the [issues page](https://github.com/processing/processing-website/issues) for existing issues you can help with. Issues [labelled Good First Issue or Help Wanted](https://github.com/processing/processing-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22Help+Wanted%22%2C%22Good+First+Issue%22+) are a good place to start. If you noticed an issue with the processing.org website and it hasn't been reported yet, please [open a new issue](https://github.com/processing/processing-website/issues/new/choose).

### Step 2. Fork the Repository

Before you begin, you’ll need to create a copy of this repository in your GitHub account.

1. Click the "Fork" button in the top-right corner and follow the instructions.
2. Clone the forked repository to your local machine.
3. Navigate to the project folder using the command line, or open the project in your editor of choice and open the built-in terminal.

### Step 3. Set up Your Local Environment

Before you start, make sure to [install Node.js](https://nodejs.org/en/download/package-manager) (`v12` or higher) if it is not already installed.

1. Run `npm install` to install the necessary dependencies.
2. Run `npm run dev` to start the development server.
3. Once the build process is complete, open [localhost:8000](http://localhost:8000) in your browser to view the site.
4. Make your changes to the code. Saving your files will automatically trigger a rebuild and update the local site.

### Step 4. Submit Your Changes

Make sure your changes are working locally and that you made only the changes necessary to solve the issue. This will improve your chances of your PR getting merged.

Once you’ve made and tested your changes locally, you can submit them for review.

1. Commit your changes with a descriptive message.
2. Push the changes to your forked repository on GitHub.
3. Go to the original [Processing website repository](https://github.com/processing/processing-website) on GitHub and click the "Compare & pull request" button.
4. Give your Pull Request a descriptive title.
5. Write a clear description of the changes you made and why they should be merged. Link to the issue you are solving.
6. Submit the pull request for review.

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

- **CSS:** [read about our stylesheets](/docs/css.md)

## Deploying the site

Since 2024, this repository is deployed and built automatically on Netlify. Merged Pull Requests to main will trigger a deployment. No further action is necessary.

## Join the Processing community
We proudly host an active and vibrant community on our [Processing Discourse Forum](https://discourse.processing.org/). Here you can find engaging discussions, ask questions, share your projects, and interact with like-minded Processing enthusiasts of all experience levels.

[![Discourse Users](https://img.shields.io/discourse/users?server=https%3A%2F%2Fdiscourse.processing.org)](https://discourse.processing.org/)

## Licenses

The content and the code of the Processing website are separately licensed.

- The **content**, including the reference, is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License ([CC-BY-NC-SA-4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)).
- The **code** that structures the website is licensed under the GNU General Public License version 2 ([GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html)). This applies to the website code written by our team and contributors from the Processing community.
- The **examples** without a credit line or credited to Daniel Shiffman are in the public domain. Copyright for other credited examples remain with the original authors. See the [processing-examples](https://github.com/processing/processing-examples/) repo for details.
- **Gatsby**, the framework used for this website, is licensed under the Zero-Clause BSD License ([0BSD](https://opensource.org/license/0BSD)).

For licensing information about the Processing core library and software, see https://github.com/processing/processing4/blob/main/LICENSE.md

## Thanks!

<img width="200" alt="image" src="https://github.com/user-attachments/assets/4f4d55f1-6bb1-4657-a448-bac125e50a79">

[Design Systems International](https://designsystems.international/) designed and built the current website and the new Processing family of logos through a year of dedicated volunteer work. 

A remarkable group of volunteers converted all of the content from the prior Processing website to the new formats. A hearty round of applause for: Tetsu Kondo, Mark Webster, Lionel Radisson, Chris Coleman, Justin Gitlin, Seenahm Suriyasat, Shobhit Sharma, Karan Dudeja, Mark Hancock, Peter Jacobson, Oğuzhan Göregen, Bryan Ma, Ashley James Brown 💙

![image](https://github.com/user-attachments/assets/da687f3b-f839-4036-8d14-453b354ca40c)

Thanks to [Netlify](https://www.netlify.com/) for providing hosting, automation, and deploy previews!

---
> [!NOTE]
> The following is included in the processing-website repository for historical reasons but it is not related to the functioning of the Processing website itself. It should eventually be moved to a more suitable location.

## `keywords.txt`

This repo contains a script [`updateKeywords.js`](https://github.com/processing/processing-website/blob/main/scripts/updateKeywords.js) that generates the [`keywords.txt`](https://github.com/processing/processing4/blob/6a2cf8cda35552c62a1a794bb1e20f43fe8ffcda/java/keywords.txt) file used for syntax highlighting in the Processing IDE. 

Follow these steps in order to generate the `keywords.txt` file:

1. Make sure you have this `processing-website` repo and the `processing4` repo next to each other on your computer
2. Make sure the [JavaDoc and reference](https://github.com/processing/processing-website/blob/main/docs/reference.md) are up to date with the latest version of Processing. Otherwise make the necessary updates to the JavaDoc in the `processing4` repo then [run the Doclet script](https://github.com/processing/processing-doclet/blob/main/README.md). _(note: this step is only necessary if new keywords were added to the Processing API)_
3. Run `npm run updateKeywords`

The `processing4` repo now has an updated `java/keywords.txt` file.
