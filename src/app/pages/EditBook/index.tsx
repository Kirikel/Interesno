import React, { FC, useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ManageForm } from '../../components/ManageForm';
import { useParams } from 'react-router-dom';
import { BookItem } from '../../core/types';
import { Loader } from '../../components/Loader';
import { editBook, fetchBookById } from '../../api';

interface Props {}

export const EditBookPage: FC<Props> = () => {
  const { id } = useParams();
  const [book, setBook] = useState<BookItem>();
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = (values: BookItem) => {
    if (id) {
      editBook(id, values);
    }
  };

  useEffect(() => {
    (async () => {
      if (id) {
        setIsLoading(true);
        const data = await fetchBookById(id);
        await setBook(data as BookItem);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <ManageForm
          submit={handleSubmit}
          title={'Отредактируйте данные'}
          book={book}
        />
      )}
    </>
  );
};
