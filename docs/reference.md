# Reference

The content for the reference lives inside the `/content/references` folder. This folder has two subfolders:

- The `/translations` folder contains a separate folder for every language with `en` being the default one. **The `en` folder should never be edited manually since it is auto-generated from the Processing and core libraries source codes**. This folder is divided into subfolders that correspond to each of the processing libraries and a `processing` folder that contains the core processing reference.
- The `/examples` folder contains all the examples used inside the references. They are organized in the same folder structure as the `translations` folder. These folders contain all the `.pde` and `.png` files necessary for the examples. Each example image should have a size of `400x400px` and should be named after the corresponding example, e.g. the `bezier_0.pde` example has an image named `bezier_0.png`.

## Adding content to the english reference

You should never edit the `/content/references/translations/en` folder, since it is generated directly from JavaDoc comments in the `processing`, `sound` and `video` repo. Instead, make the changes in those repos as explained below.

_TODO: Explain how to use JavaDoc, including "in use"_

Then run the following steps:

1. [Run the content script](/docs/content-script.md)
2. [Publish the website](/docs/publish.md)

If you are adding content to the reference that does not live in the `processing` source code (such as some Java functions and `=;<>` symbols), do the following steps.

_TODO_

## Translating the reference

If you want to add a translation, copy the `en` folder, rename it to the language code<sup>1</sup> and translate away.
