import React, { FC } from 'react';
import styles from './booksItem.module.css';
import { BookItem } from '../../core/types';
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';

interface Props {
  book: BookItem;
  deleteBook: (bookId: string) => void;
}

export const BooksItem: FC<Props> = ({ book, deleteBook }) => {
  return (
    <div className={styles.container}>
      <NavLink to={`book/${book.id}`} className={styles.link}>
        <h3 className={styles.title} title={book.name}>
          {book.name}
        </h3>
        <p className={styles.author} title={book.author}>
          Автор: {book.author}
        </p>
        <p className={styles.property}>
          Дата публикации:{' '}
          {book.date
            ? format(new Date(book.date?.seconds * 1000), 'dd/MM/yyyy')
            : '---'}
        </p>
        <p className={styles.property}>Рейтинг: {book.rate}</p>
      </NavLink>
      <button onClick={() => deleteBook(book?.id)} className={styles.removeBtn}>
        Удалить книгу
      </button>
    </div>
  );
};
