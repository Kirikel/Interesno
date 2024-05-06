import React, { FC, useEffect, useState } from 'react';
import styles from './booksList.module.css';
import { BookItem, BooksListSortedByYear } from '../../core/types';
import { BooksItem } from '../BookItem';
import { Loader } from '../Loader';
import { deleteBook, fetchBooks, fetchRecommendedBooks } from '../../api';
import { RecomededBook } from '../RecomededBook';

interface Props {}

export const BooksList: FC<Props> = () => {
  const [books, setBooks] = useState<BooksListSortedByYear | []>([]);
  const [recomendedBook, setRecomendedBook] = useState<BookItem>(
    {} as BookItem
  );
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = fetchBooks(setBooks, setIsLoading);
    fetchRecommendedBooks(setRecomendedBook, setIsLoading);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {<RecomededBook book={recomendedBook} />}

          {books.map((book, i) => (
            <div key={i} className={styles.card}>
              <h2 className={styles.year}>{book.year}</h2>
              <div key={i} className={styles.content}>
                {book?.books?.map((book) => (
                  <BooksItem
                    key={book.id}
                    deleteBook={deleteBook}
                    book={book}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
