# Reference

The content for the reference lives inside [`/content/references`](https://github.com/processing/processing-website/tree/main/content/references). This folder has two subfolders, `translations` and `examples`:

## `/translations`

This folder contains a separate folder for every language, with `en` being the default one. Each json file within the folders will be rendered as a web reference page.

**Most of the files in the `en` folder should not be edited manually since they are auto-generated from Javadoc annotations in the Processing and core libraries source codes using the [Doclet script](https://github.com/processing/processing-doclet/blob/main/README.md).** Web reference files within `en` that are created and edited manually generally fall into one of two categories:

- Java documentation: This includes keywords that are NOT part of the Processing API but good to include as a reference for learners. The `+=` or `/=` operators and some Java keywords like `void` or `static` fall into that category for example, as well as Java primitives such as [`int`](https://github.com/processing/processing-website/blob/main/content/references/translations/en/processing/int.json), [`String`](https://github.com/processing/processing-website/blob/main/content/references/translations/en/processing/String.json) etc. The corresponding json files must be edited manually within the `processing-website` repo.
- event callback methods which need to be implemented in sketches (and which don't have corresponding methods inside the processing source code that could be annotated with Javadoc), for example [`captureEvent()`](https://github.com/processing/processing-website/blob/main/content/references/translations/en/video/captureEvent_.json)

The folder is divided into subfolders that correspond to each of the core libraries and a `processing` folder that contains the core processing reference.

- Generated from the [`processing4`](https://github.com/processing/processing4) source code:
  - `/content/references/translations/en/io`
  - `/content/references/translations/en/net`
  - `/content/references/translations/en/processing`
  - `/content/references/translations/en/serial`
- Generated from the [`processing-sound`](https://github.com/processing/processing-sound) source code:
  - `/content/references/translations/en/sound` 
- Generated from the [`processing-video`](https://github.com/processing/processing-video) source code:
  - `/content/references/translations/en/video`

Libraries DFX Export, PDF Export and SVG Export don't have individual references so their pages are created from Markdown files in [`content/pages/libraries`](https://github.com/processing/processing-website/tree/master/content/pages/libraries). The intro blurbs to each of the core libraries are also found in this folder.

See the [`processing-doclet`](https://github.com/processing/processing-doclet/blob/main/README.md) instructions on how to generate the json files after having made changes to the reference in any of the Java source files.

### Javadoc annotations

The doclet script converts the Javadoc annotations to a json file for every class, field or method annotated with a `@webref` tag. (Note: [GitHub search only works for files smaller than 384 KB](https://docs.github.com/en/search-github/searching-on-github/searching-code#considerations-for-code-search) which means [PApplet.java](https://github.com/processing/processing4/blob/main/core/src/processing/core/PApplet.java) is NOT searchable using GitHub's code search feature.)

Unlike standard Javadoc (where every method signature gets its own documentation), all methods with the same name are pooled together into one reference page (even static and non-static methods of the same name only get one json file!). Only one of the overloaded methods needs to have a `@webref` tag. The `@` annotations of all methods with the same name will be pooled together in one json file.

A typical Javadoc block will look like this:

```
/**
* This is a full length description of this method or field, and what it does. It can be as long or short as you want.
*
* Line breaks are <em>ignored</em>, so the first sentence and this one are displayed in the same paragraph. If you want to split the descriptions into paragraphs, use line break tags, like so:
* <br/><br/>
* It is not unusual for descriptions to have more than one paragraph, so go for it.
*
* <h3>Advanced</h>
* Advanced description
*
* @webref category:subcategory
* @webBrief This is a <em>short</em> description of the method that's shown on the reference index page, and also on the method listing of the class page if this is a class method.
* @param someArg the meaning or purpose of this method argument, allowed range etc.
* @param anotherArg same thing but for another argument
* @return <b>true</b> if one thing is the case, <b>false</b> otherwise
* @see AnotherClass#anotherField
* @see YetAnotherClass#anotherMethod()
* ...
*/
public boolean someMethod(int someArg, float anotherArg) {
...
```

- **Description:** this should be the main description of the reference. Note: if necessary you can look up the previous reference in the archived XML files located [here](https://github.com/processing/processing-docs/tree/master/content/api_en) under the `<description>` tag.
- **Advanced description:** this is the advanced description that doesn't go on the webpage but in the in the expanded Java documentation. The advanced description starts with an html heading (e.g. `<h3>Advanced:</h3>`). Advanced description always goes below the Description, though not every reference has an advanced description.
- **@webref:** only classes, methods and fields with this tag will have a json file generated for them, and therefore go on the website. It is followed by category and subcategory, if they exist, in the format category:subcategory (the subcategory is optional). The category and subcategory are also in the XML files [here](https://github.com/processing/processing-docs/tree/master/content/api_en) under the <category> and <subcategory> tag.
  - for methods that are tagged with `@webref ...:method` a reference page will be created and linked to from the class constructor page, but it will not be included in the web reference index (see for example the methods of [`PVector`](https://processing.org/reference/PVector.html))
- **@webBrief:** this is the short version of description, just one sentence which is usually the same or very similar to the first sentence of the Description. If the first sentence is too long or doesn't explain the reference, you can change it for a summary of the whole description.
- **@see Classname**, **@see Classname#field**, **@see Classname#method()**: these will be linked to from the *Related* section at the bottom of the reference page.
- **...:** everything else that was already in the comment should stay there below the @webBrief tag

### Markup tags to use in the Javadoc

For code-like (i.e. `looking like this`) styling, use `<b></b>` tags. For emphasis (currently rendered as italics) use `<em></em>`.

Javadoc tags such as `@inheritDoc` and `@link` are not currently supported.

## `/examples`

This folder contains all the examples used inside the references. They are organized in the same folder structure as the `translations` folder. These folders contain all the `.pde` and `.png` files necessary for the examples. Each example image should have a size of `800x800px` and should be named after the corresponding example, e.g. the `bezier_0.pde` example has an image named `bezier_0.png`.

## Adding examples and examples images for references

The examples live inside the `/content/references/examples/` folder. The main processing references are inside the folder `processing` and references for the libraries are in separate folders named as the library. For each reference (both for processing and libraries) there needs to be a folder, named exactly as the corresponding json file without the `.json` part (those files are in `/content/references/translations/en/processing`). The file should contain:

- _.pde files_ containing the code for the example. (The original code for the .pde files migrated from the old web reference could be found either on the reference pages on the current website or in the .xml files [here](https://github.com/processing/processing-docs/tree/master/content/api_en) under the tag `<example>` (each example is under separate tag). Each library has its own folder starting with `LIB_`.)
- _.png files_ if examples produce images. Images can be found [here](https://github.com/processing/processing-docs/tree/master/content/api_media). Each example image should have a size of `800x800px`. If the example has an image, then the code used to generate the images needs to be also updated on the corresponding .pde file with the new scales. The .pde and .png file for the same example should be named the same as the reference with the number of the example starting from 0 (e.g. for reference `ammbientLight_` there are `ammbientLight_0.pde` and `ammbientLight_1.pde` and `ammbientLight_0.png` and `ammbientLight_1.png`).

For re-scaling the images and updating the examples codes the workflow should be:

1. Modifying the scales of the example code on each of the .pde files (consider not only the canvas size but also the coordinates of the elements if any).
2. Running the sketch on Processing and saving the new image (you can use a `keyPressed` handler and the native `save` function for this).
3. Uploading the new images and the updated code on the corresponding foler.

## Translating the reference

If you want to add a translation, copy the `en` folder, rename it to the language code<sup>1</sup> and translate away. The individual files should also be renamed to include the code e.g. if the english reference file is `bezier_.json`, the german would be `bezier_.de.json`.

Translations of the `.pde` example files in the reference should be added next to the english version `.pde` files in `content/references/examples`.

<sup>1</sup> [Language codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
