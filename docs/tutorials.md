# Tutorials

Tutorials are `.mdx` files that can be edited as explained in the [markdown pages](/docs/markdown-pages.md) guide. However, here's a bit more information that applies specifically to the tutorials.

## Using custom components

All `.mdx` files can use custom React Components that are globally available with the following tags:

- `<FixedImage>{image in MDX}</FixedImage>` wraps an image in a container to give it a fixed size. The style can be overriden through the style attribute.
- `<HighlightBlock>{content}</HighlightBlock>` wraps content in a gray block to highlight a block of content.
- `<Intro>{content}</Intro>` changes text styling for the introduction of pages.
- `<Note>{content}</Note>` a small note with smaller font-size for disclaimer of a certain content.

## Cover images

Each tutorial has a cover image for the index pages that needs to be declared in the header of its `.mdx` file as a `coverImage` key with the filename of the cover that must be placed in the same folder. This image should have a `3:1` ratio with a minimum width of `600px`.
