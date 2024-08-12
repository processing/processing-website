# Examples

The content for the examples lives in `/content/examples` and are nested in folders named after the main category and the subcategory. The actual `.pde` files and the data associated with the Processing sketch are automatically copied from the [`processing-examples`](https://github.com/processing/processing-examples) repo while the rest of the content only live in this repo and should be edited here.

Here is a quick overview of these files for the `Basic Examples > Image > BackgroundImage` example:

- `/content/examples/BackgroundImage/BackgroundImage.json` - This is the metadata for the example, and this file should be edited in this repo.
- `/content/examples/BackgroundImage/BackgroundImage.png` - This is the image use on page listings and this file should be edited in this repo.
- `/content/examples/BackgroundImage/liveSketch.js` - This is the P5.js live sketch code that runs on the example page, and this file should be edited in this repo.
- `/content/examples/BackgroundImage/BackgroundImage.pde` - This file is synced from the `processing-examples` repo via a script and should \**not** be edited in this repo.
- `/static/livesketch/backgroundimage` - This folder is the `data` folder for the example from the `processing-examples` repo and should \**not** be edited in this repo.

## Updating examples via script

The Processing code for each example is copied via a script from the [`processing-examples`](https://github.com/processing/processing-examples) repo to website. The script will do two things: It will copy all `.pde` files into the `content/examples/TOPIC/SUBTOPIC/EXAMPLE` folder and it will copy all files in the `data` folder of the example into a `static/livesketch/EXAMPLE` folder. This makes it possible for the `liveSketch.js` sketch to load the original data. Some live sketches differ slightly from the original example (such as the AlphaMask example requiring a `.png` file instead of a `.jpg` file) and these files are manually place in the `static/livesketch-manual` folder.

**Note**: The script will only copy examples into the website that already have an existing `.pde` file. This means that the script will only update examples, not add new ones.

This is what you need to run the script:

1. Make sure that you have the `processing-examples` repo next to this `processing-website` repo on your computer
1. Pull the latest `main` from the `processing-examples` repository
1. From the root of this repo, run `npm run updateExamples`. The script will prompt you with an overview of the changes before it does anything.

You should now have the updated example files in your repo ready to be committed. Please submit the changes as a PR to the `main` branch of `processing-website`.

## Adding a new example

When adding a new example, copy/paste an existing example folder and change the content of all files to reflect the example. Remember to put any files inside the `data` folder into `/static/livesketch/EXAMPLE` and write the `liveSketch.js` file to read from this folder.

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
