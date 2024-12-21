# Books

The books page contains all the processing books. This page doesn't get translated since it wouldn't make sense to translate the description of books that only exist in one language. However, the page does contain books in different languages so you can add a book in any language to it.

Each book has its own folder which contains the `index.mdx` file and a `.png` image that has the same name as the folder.

To add a book create a folder in `content/books`. The name of the book should correspond to the image name from [here](https://github.com/processing/processing-docs/tree/master/img/learning/books).

Add the image to the folder.

Then, create the `index.mdx` file in the folder with a structure like this:

```
---
title: ''
author: ''
details: ''
buy: ""
language: ''
---

description
```

Fill in the empty `''` and change 'description' with the appropriate information for the book that you can find [here](https://github.com/processing/processing-docs/blob/master/content/static/books.html).
