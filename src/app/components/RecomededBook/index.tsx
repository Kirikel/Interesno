import React, { FC } from 'react';
import styles from './recomededBook.module.css';
import { BookItem } from '../../core/types';
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';

interface Props {
  book: BookItem;
}

export const RecomededBook: FC<Props> = ({ book }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Рекомендованная книга</h2>
      <NavLink to={`book/${book.id}`} className={styles.book}>
        <h3 className={styles.name} title={book.name}>
          {book.name}
        </h3>
        <div className={styles.author}>
          Автор{Number(book.author?.length) > 1 ? 'ы' : ''}: {book.author?.map(author => <p className={styles.authorItem}>{author}</p>)}
        </div>
        <p className={styles.property}>
          Дата публикации:{' '}
          {book.date
            ? format(new Date(book.date?.seconds * 1000), 'dd/MM/yyyy')
            : '---'}
        </p>
        <p className={styles.property}>Рейтинг: {book.rate}</p>
      </NavLink>
    </div>
  );
};
