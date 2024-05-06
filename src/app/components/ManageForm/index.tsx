import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { BookAuthor, BookItem } from '../../core/types';
import styles from './manageForm.module.css';
import { fetchBooksAuthors } from '../../api';

interface Props {
  title?: string;
  book?: BookItem | undefined;
  submit: (data: BookItem) => void;
}

const min_date = '01.01.1800';

export const ManageForm: FC<Props> = ({ title, book, submit }) => {
  const [authors, setAuthors] = useState<BookAuthor[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<BookItem>({
    defaultValues: {
      name: book?.name || '',
      author: book?.author || authors[0]?.name,
      rate: book?.rate || '0',
      ISBN: book?.ISBN || ''
    }
  });

  const onSubmit: SubmitHandler<BookItem> = async (data) => {
    try {
      submit(data);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  useEffect(() => {
    if (book && book.id) {
      setValue('id', book.id);
    }

    if (book && book.date) {
      const date = format(book?.date?.toDate(), 'yyyy-MM-dd');
      //TODO: add "string" types
      //@ts-ignore
      setValue('date', date);
    }
  }, [book]);

  useEffect(() => {
    fetchBooksAuthors(setAuthors).then(() => {
      if (!getValues().author) {
        setValue('author', authors[0]?.name);
      }
    });
  }, [authors]);

  return (
    <div className={styles.container}>
      {title && <h1 className={styles.title}>{title}</h1>}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register('name', { required: true })}
          className={styles.input}
          placeholder='Название книги *'
          maxLength={100}
        />
        {errors.name && (
          <span className={styles.error}>Это поле обязательно</span>
        )}

        <select
          {...register('author', { required: true })}
          className={styles.input}
        >
          {authors.map((author, i) => (
            <option key={`${author}-${i}`} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        {errors.author && (
          <span className={styles.error}>Это поле обязательно</span>
        )}
        <input
          type='number'
          {...register('rate', { min: 0, max: 10 })}
          className={styles.input}
          placeholder='Рейтинг *'
        />
        {errors.rate && (
          <span className={styles.error}>Значение должно быть от 0 до 10.</span>
        )}

        <input
          {...register('ISBN', {
            pattern: {
              value: /^(97[89])-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/,
              message: 'Недействительный ISBN'
            }
          })}
          className={styles.input}
          placeholder='ISBN'
        />
        {errors.ISBN && (
          <span className={styles.error}>Недействительный ISBN</span>
        )}

        <input
          type='date'
          {...register('date')}
          className={styles.input}
          placeholder='Дата публикации'
          min={format(new Date(min_date), 'yyyy-MM-dd')}
        />

        <button type='submit' className={styles.submitBtn}>
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};
