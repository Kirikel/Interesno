import React, { FC, useEffect, useState } from 'react';
import styles from './bookDetail.module.css';
import { NavLink } from 'react-router-dom';
import { BookItem } from '../../core/types';
import { fetchBookById } from '../../api';
import { format } from 'date-fns';
import { Loader } from '../Loader';

interface Props {
  id: string;
}

export const BookDetail: FC<Props> = ({ id }) => {
  const [book, setBook] = useState<BookItem>();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await fetchBookById(id);
      await setBook(data as BookItem);
      setIsLoading(false);
    })();
  }, []);

  if ((!id || !book) && !loading) {
    return (
      <h2 className={styles.title}>
        Что то пошло не так, вернитесь на <NavLink to='/'>главную</NavLink> и
        повторите попытку
      </h2>
    );
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.content}>
            <h2 className={styles.title} title={book?.name}>
              {book?.name}
            </h2>
            <p className={styles.author}>
              Автор{Number(book?.author?.length) > 1 ? 'ы' : ''}: {book?.author?.map(author => <p className={styles.authorItem}>{author}</p>)}
            </p>
            <p className={styles.property}>
              Дата публикации:{' '}
              {book?.date ? format(book?.date.toDate(), 'dd/MM/yyyy') : '---'}
            </p>
            <p className={styles.property}>Рейтинг: {book?.rate}</p>
            <p className={styles.property}>ISBN: {book?.ISBN || '---'}</p>

            <NavLink to={`/book/${id}/edit`} className={styles.editLink}>
              <span className={styles.editText}>Редактировать</span>
              <img
                src={require('../../assets/icon/edit.png')}
                alt='edit'
                className={styles.editIcon}
              />
            </NavLink>
          </div>

          <img
            src={require('../../assets/images/book.jpg')}
            alt='image'
            className={styles.bookImage}
          />
        </>
      )}
    </div>
  );
};
