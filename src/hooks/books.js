import { useMemo } from 'react';

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

      const preparedBook = Object.assign({}, book.childMdx.frontmatter, {
        body: book.childMdx.body,
        image
      });

      if (preparedBook.order && preparedBook.order !== '') {
        preparedBook.orderList = preparedBook.order.split(',').map((ord) => {
          const [label, link] = ord.split('-');
          return { label, link };
        });
      }

      prepared.push(preparedBook);
    }

    return prepared;
  }, [books, images]);
};
