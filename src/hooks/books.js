import { useMemo } from 'react';
import { months } from '../utils';

/**
  Hook to find turn a books GraphQL array into an array of objects
  to use on the books page
**/
export const usePreparedBooks = (books, images) => {
  return useMemo(() => {
    const prepared = [];

    for (let i = 0; i < books.length; i++) {
      const book = books[i];

      // Find the image
      let image;
      if (Array.isArray(images)) {
        for (let j = 0; j < images.length; j++) {
          if (images[j].name === book.relativeDirectory) {
            image = images[j];
            break;
          }
        }
      }

      const publishedDate = new Date(book.childMdx.frontmatter.published);

      const preparedBook = Object.assign({}, book.childMdx.frontmatter, {
        published: `${
          months[publishedDate.getMonth()]
        } ${publishedDate.getFullYear()}`,
        body: book.childMdx.body,
        image
      });

      if (preparedBook.buy && preparedBook.buy !== '') {
        preparedBook.buyList = preparedBook.buy.split(',').map((ord) => {
          const [label, link] = ord.split('-');
          return { label, link };
        });
      }

      prepared.push(preparedBook);
    }

    return prepared;
  }, [books, images]);
};
