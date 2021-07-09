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

## Writing code

Please refer to the [guides](/docs/README.md).

## Deploying the site

The website is set up to deploy itself whenever a new GitHub release is created from the `master` branch:

1. Go to [Releases](https://github.com/processing/processing-website/releases)
2. Click "Create a new release"
3. Choose a tag for this release. This value is not used for much, so you can just use `DD-MM-YYYY`
4. Create the release. A GitHub action will run, which will build the website and upload to the S3 bucket.

## Links:

1. [list of codes under 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
