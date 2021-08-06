# Download

In order to specify which releases that should be featured on the website, edit the [`content/download/selected.json`](/content/download/selected.json) file. This file has a list of all featured releases and pre-releases indicated by the `tagName` of the release on GitHub.

In order to not require an API token on GitHub in development, there is a separate script in [`scripts/fetchReleases.js`](/scripts/fetchReleases.js) that can be run to fetch the releases from GitHub. This script needs to be run before you update the `selected.json` file.

## How to show a new release on the download page

1. Make sure that the release has been published on GitHub
1. Run the script with a GitHub token: `$ GITHUB_TOKEN=SOMETOKENHERE npm run fetchReleases`
1. Edit the [`selected.json`](/content/download/selected.json) file to include the new release tag
1. Make a PR to the `master` branch.
