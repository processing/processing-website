# Reference

The content for the reference lives inside the `/content/references` folder. This folder has two subfolders:

- The `/translations` folder contains a separate folder for every language with `en` being the default one. 

**The `en` folder should never be edited manually since it is auto-generated from the Processing and core libraries source codes.**. This folder is divided into subfolders that correspond to each of the processing libraries and a `processing` folder that contains the core processing reference.

The subfolders:

* `/content/references/translations/en/io`
* `/content/references/translations/en/net`
* `/content/references/translations/en/processing`
* `/content/references/translations/en/serial`

are generated from the [Processing 4](https://github.com/processing/processing4) source code.

The subfolder `/content/references/translations/en/sound` is generated from the [Sound](https://github.com/processing/processing-sound) source code.

The subfolder `/content/references/translations/en/video` is generated from the [Video](https://github.com/processing/processing-video) source code.

Libraries DFX Export, PDF Export and SVG Export don't have individual references so their pages are created from [here](https://github.com/processing/processing-website/tree/master/content/pages/libraries).

- The `/examples` folder contains all the examples used inside the references. They are organized in the same folder structure as the `translations` folder. These folders contain all the `.pde` and `.png` files necessary for the examples. Each example image should have a size of `800x800px` and should be named after the corresponding example, e.g. the `bezier_0.pde` example has an image named `bezier_0.png`.

## Adding content to the english reference

You should never edit the `/content/references/translations/en` folder, since it is generated directly from JavaDoc comments in the `processing`, `sound` and `video` repo. Instead, make the changes in those repos as explained below.

In each source file, look for the `@webref` tag in the block comments. If the tag is there it means that the reference below the comment needs to be on the website so the block comment should be changed to fit the new structure. 

```
/*
* Description
*
* Advanced description
*
* @webref category:subcategory
* @webBrief 
* ...
*/
```

**Description:** this should be the main description of the reference. The description might already be there however it might not be correct (the newest version) so you need to copy it from the XML files located [here](https://github.com/processing/processing-docs/tree/master/content/api_en) under the `<description>` tag. 

**Advanced description:** this is the advanced description that doesn't go on the webpage but in the in the expanded Java documentation. The advance description starts with an html heading (e.g. `<h3>Advanced:</h3>`). Not every reference contains this part, it case it is there you do not need to change it in any way, just leave it as it is. Advanced description always goes below the Description.

**@webref:** tag that implies the reference goes on the website. It is followed by category and subcategory, if they exist, in the format category:subcategory. The category and subcategory are also in the XML files [here](https://github.com/processing/processing-docs/tree/master/content/api_en) under the <category> and <subcategory> tag. If they don't exist you do not have to add anything.
  
**@webBrief:** this is the short version of description, just one sentence which is usually the first sentence of the Description. If the first sentence is too long or doesn't explain the reference, you can change it for a summary of the whole description.

**...:** everything else that was already in the comment should stay there below the @webBrief tag

When you finish adding all the information, run the following steps:

1. Set up the environment and run the content script following [this instruction](https://github.com/processing/processing-doclet/blob/main/README.md).

2. [Publish the website](/docs/publish.md)

If you are adding content to the reference that does not live in the `processing` source code (such as some Java functions and `=;<>` symbols), do the following steps.

_TODO_

## Adding examples and examples images for references

The examples live inside the `/content/references/examples/` folder. The main processing references are inside the folder `processing` and references for the libraries are in separate folders named as the library. For each reference (both for processing and libraries) there needs to be a folder, named exactly as the corresponding json file without the `.json` part (those files are in `/content/references/translations/en/processing`). The file should contain:
- *.pde files* containing the code for the example. The code for the .pde files could be found either on the reference pages on the current website or in the .xml files [here](https://github.com/processing/processing-docs/tree/master/content/api_en) under the tag `<example>` (each example is under separate tag). Each library has its own folder starting with `LIB_`.
- *.png files* if examples produce images. Images can be found [here](https://github.com/processing/processing-docs/tree/master/content/api_media). Each example image should have a size of `800x800px`. If the example has an image, then the code used to generate the images needs to be also updated on the corresponding .pde file with the new scales. The .pde and .png file for the same example should be named the same as the reference with the number of the example starting from 0 (e.g. for reference `ammbientLight_` there are `ammbientLight_0.pde` and `ammbientLight_1.pde` and `ammbientLight_0.png` and `ammbientLight_1.png`).

For re-scaling the images and updating the examples codes the workflow should be:
1. Modifying the scales of the example code on each of the .pde files (consider not only the canvas size but also the coordinates of the elements if any).
2. Running the sketch on Processing and saving the new image (you can use a `keyPressed` handler and the native `save` function for this).
3. Uploading the new images and the updated code on the corresponding foler.

## Translating the reference

If you want to add a translation, copy the `en` folder, rename it to the language code<sup>1</sup> and translate away. The individual files should also be renamed to include the code e.g. if the english reference file is `bezier_.json`, the german would be `bezier_.de.json`.

<sup>1</sup> [Language codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
