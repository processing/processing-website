# Download

In order to specify which releases that should be featured on the website, edit the [`content/download/selected.json`](/content/download/selected.json) file. This file has a list of all featured releases and pre-releases indicated by the `tagName` of the release on GitHub.

In order to not require an API token on GitHub in development, there is a separate script in [`scripts/fetchReleases.js`](/scripts/fetchReleases.js) that can be run to fetch the releases from GitHub. This script is automatically run when the website is deployed via GitHub, but you will need to manually run it in case you're running the website on `localhost`.

## How to show a new release on the download page

1. Make sure that the release has been published on GitHub
2. Edit the [`selected.json`](/content/download/selected.json) file to include the new release tag
3. Make a PR to the `master` branch. When this PR is merged and a new GitHub release is created, a GitHub action will take care of fetching the release data from GitHub and redeploy the website.

If you want to see the changes on your local machine before merging the PR, you can run the fetching script like this:

```
$ GITHUB_TOKEN=SOMETOKENHERE npm run fetchReleases
```
