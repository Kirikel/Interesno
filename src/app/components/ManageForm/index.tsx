import React, { MouseEvent, FC, useEffect, useState, ChangeEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { BookAuthor, BookItem } from '../../core/types';
import styles from './manageForm.module.css';
import { addNewAuthor, fetchBooksAuthors } from '../../api';
import MultiSelect from '../common/MultiSelect';
import { Modal } from '../common/Modal';

interface Props {
  title?: string;
  book?: BookItem | undefined;
  submit: (data: BookItem) => void;
}

const min_date = '01.01.1800';

export const ManageForm: FC<Props> = ({ title, book, submit }) => {
  const [authors, setAuthors] = useState<{ name: string; value: string }[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  const [newAuthorName, setNewAuthorName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError
  } = useForm<BookItem>({
    defaultValues: {
      name: book?.name || '',
      rate: book?.rate || '0',
      ISBN: book?.ISBN || ''
    }
  });

  const onSubmit: SubmitHandler<BookItem> = async (data) => {
    if (selectedAuthors.length <= 0) {
      setError('author', { message: 'required' })
      return;
    }

    const newData = { ...data, author: selectedAuthors }

    try {
      submit(newData);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const handleChangeAuthorSelect = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleModal();
  };

  const handleChangeNewAuthorName = (event: ChangeEvent<HTMLInputElement>) => {
    setNewAuthorName(event.target.value);
  }

  const handleAddNewAuthor = () => {
    addNewAuthor(newAuthorName);
    toggleModal();
    setNewAuthorName('');
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

    if (book && book.author) {
      setSelectedAuthors(book.author);
    }
  }, [book]);

  useEffect(() => {
    fetchBooksAuthors(setAuthors);
  }, []);

  return (
    <>
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

          <div className={styles.authorsWrapper}>
            <MultiSelect
              options={authors}
              selectedValues={selectedAuthors}
              onChange={setSelectedAuthors}
              placeholder='Выберите автора'
              className={styles.authorsSelect}
            />
            <button onClick={handleChangeAuthorSelect} className={styles.authorsBtn}>Добавить нового автора</button>
          </div>

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
      <Modal isOpen={modalOpen}
        toggleModal={toggleModal}>
        <div className={styles.authorForm}>
          <input
            className={`${styles.input} ${styles.authorInput}`}
            placeholder='Имя автора'
            value={newAuthorName}
            onChange={handleChangeNewAuthorName}
          />
          <button className={styles.addNewAuthor} onClick={handleAddNewAuthor}>Добавить</button>
        </div>
      </Modal>
    </>
  );
};
