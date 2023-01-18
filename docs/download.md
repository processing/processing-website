# Download

In order to specify which releases that should be featured on the website, edit the [`content/download/selected.json`](/content/download/selected.json) file. This file has a list of all featured releases and pre-releases indicated by the `tagName` of the release on GitHub.

In order to not require an API token on GitHub in development, there is a separate script in [`scripts/fetchReleases.js`](/scripts/fetchReleases.js) that can be run to fetch the releases from GitHub. This script needs to be run before you update the `selected.json` file.

## How to show a new release on the download page

1. Make sure `npm` is up to date. (Check Node.js version with `node -v` and make sure it corresponds to the version in [`/.github/workflows/deploy.yml`](https://github.com/processing/processing-website/blob/main/.github/workflows/deploy.yml). For example, if the version specified in the deploy.yml file is `node-version: 16.x` then `v16.17.0` would be a match.)
1. Make sure that the release has been published on GitHub
1. Create a [GitHub access token](https://github.com/settings/tokens)
1. Create a git branch to hold your changes
1. Run the script with: `npm run fetchReleases`
1. Enter your GitHub access token when prompted
1. Edit the [`/content/download/selected.json`](/content/download/selected.json) file to include the new release tag
1. Make a pull request to the `main` branch
