# Download

The content on the download page is automatically pulled from GitHub on build time. This means that if a new release is published on GitHub, the website needs to be built and deployed in order to pull in those changes.

In order to give us the ability to filter which releases are shown on the page, the [`utils/constants.js`](src/utils/constants.js) file has a list of the releases and pre-releases that is used to filter content on the page.

## How to show a new release of Processing

1. Make sure that the release has been published on GitHub
2. Edit the [`utils/constants.js`](src/utils/constants.js) file to reflect which releases the download page should feature.
3. Publish the website
