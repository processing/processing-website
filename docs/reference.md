# Reference

The content for the reference lives inside the `/content/references` folder. This folder has two subfolders:

- The `/translations` folder contains a separate folder for every language with `en` being the default one. **The `en` folder should never be edited manually since it is auto-generated from the Processing and core libraries source codes.**. This folder is divided into subfolders that correspond to each of the processing libraries and a `processing` folder that contains the core processing reference.
- The `/examples` folder contains all the examples used inside the references. They are organized in the same folder structure as the `translations` folder. These folders contain all the `.pde` and `.png` files necessary for the examples. Each example image should have a size of `400x400px` and should be named after the corresponding example, e.g. the `bezier_0.pde` example has an image named `bezier_0.png`.

## Adding content to the english reference

You should never edit the `/content/references/translations/en` folder, since it is generated directly from JavaDoc comments in the `processing`, `sound` and `video` repo. Instead, make the changes in those repos as explained below.

_TODO: Explain how to use JavaDoc, including "in use"_

Then run the following steps:

1. [Run the content script](/docs/content-script.md)
2. [Publish the website](/docs/publish.md)

If you are adding content to the reference that does not live in the `processing` source code (such as some Java functions and `=;<>` symbols), do the following steps.

_TODO_

## Adding examples for references

The examples live inside the `/content/references/examples/` folder. The main processing references are inside the folder `processing` and references for the libraries are in separate folders named as the library. For each reference (both for processing and libraries) there needs to be a folder, named exactly as the corresponding json file without the `.json` part (those files are in `/content/references/translations/en/processing`). The file should contain .pde files containing the code for the example and .png files if examples produce images. The .pde and .png file for the same example should be named the same as the reference with the number of the example starting from 0 (e.g. for reference `ammbientLight_` there are `ammbientLight_0.pde` and `ammbientLight_1.pde` and `ammbientLight_0.png` and `ammbientLight_1.png`). The code for the .pde files could be found either on the reference pages on the current website or in the .xml files [here](https://github.com/processing/processing-docs/tree/master/content/api_en) under the tag `<example>` (each example is under separate tag). Each library has its own folder starting with `LIB_`. Images can be found [here](https://github.com/processing/processing-docs/tree/master/content/api_media). 

## Translating the reference

If you want to add a translation, copy the `en` folder, rename it to the language code<sup>1</sup> and translate away. The individual files should also be renamed to include the code e.g. if the english reference file is bezier_.json, the german would be bezier_.de.json.
