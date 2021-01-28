# Content script

Because the website relies on external data in order to populate the content, it relies on a script to copy over the content. The following folder, with all its subfolders, needs the content script to be updated:

`/content/references/translations/en`

The subfolders:

* `/content/references/translations/en/io`
* `/content/references/translations/en/net`
* `/content/references/translations/en/processing`
* `/content/references/translations/en/serial`

are generated from the [Processing 4](https://github.com/processing/processing4) source code.

The subfolder `/content/references/translations/en/sound` is generated from the [Sound](https://github.com/processing/processing-sound) source code.

The subfolder `/content/references/translations/en/video` is generated from the [Video](https://github.com/processing/processing-video) source code.


## Running the content script

For setting up the environment and running the script please read [this](https://github.com/processing/processing4/tree/master/doclet).
