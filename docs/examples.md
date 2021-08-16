# Examples

The content for the examples lives in `/content/examples` split into 2 folders corresponding to the categories: `basic` and `topic`. Each example has a subfolder inside one of those folders. The subfolder contains all the files necessary to build the individual example page: a `.json` that has the content, `.pde` files containing the code and `.png` file for the image.

The actual Processing code is copied from [`processing-examples`](https://github.com/processing/processing-examples) via a script and the rest of the content is updated directly in this repo. Here is a breakdown for `Baisc Examples > Image > AlphaMask` example:

- `AlphaMask.json` - Edit in this repo
- `AlphaMask.png` - Edit in this repo
- `liveSketch.js` - Edit in this repo
- `AlphaMask.pde` - Copied from `processing-examples` via script
- `data/moonwalk.jpg` - Copied from `processing-examples` via script
- `data/mask.jpg` - Copied from `processing-examples` via script

## Updating via script

The Processing code for each example is copied via a script from the [`processing-examples`](https://github.com/processing/processing-examples) repo to the `/content/examples` folder in this repo. The script will only copy examples into example folders that already exist, but it will output a summary of the update before it happens.

This is what you need to run the script:

1. Make sure that you have the `processing-examples` repo next to this `processing-website` repo on your computer
1. Pull the latest `main` from the `processing-examples` repository
1. From the root of this repo, run `npm run updateExamples`

You should now have the updated example files in your repo ready to be committed. Please submit the changes as a PR to the `main` branch of `processing-website`.

## Content file

Each example has to have a `.json` file in this format:

```
{
  "name": "",
  "title": "",
  "author": "",
  "description": "",
  "featured": ["", "", ""]
}
```

All empty `""` should be filled with the information for that examples.

The name is the name that will go to the url and the title is the title of the example shown on the page. You can find the name, title, author and description in the comments of the pde files [here](https://github.com/processing/processing-docs/tree/master/content/examples).

### Featured functions

This is a new feature of the example pages so you should choose no more than 6 functions that appear in the example (in the `.pde` files) and put them in the `.json` file in the "features" field. The name of the functions should be the same as the name of their `.json` files located in `/content/references/translations/en`.

## Cover image

Each example has an image or animation that comes from P5.js code. The cover should be exported as a `.png` from the original p5.js code from [here](https://github.com/processing/processing-docs/tree/master/content/examples_p5) to a size of `1280px720` (keeping the same proportions than the original sketch). If the example doesn't have a p5.js file, then the upscaling has to be done from the `.pde` files from [here](https://github.com/processing/processing-docs/tree/master/content/examples). The naming of the image it's the same than the content file.
