import React, { FC } from 'react';
import { Header } from '../../components/Header';
import { ManageForm } from '../../components/ManageForm';
import { BookItem } from '../../core/types';
import { addBook } from '../../api';
import { useNavigate } from 'react-router-dom';

interface Props { }

export const CreateBookPage: FC<Props> = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values: BookItem) => {
    const response = await addBook(values);
    navigate(`/book/${response?.id}`);
  };

  return (
    <>
      <Header />
      <ManageForm submit={handleSubmit} title={'Добавьте новую книгу'} />
    </>
  );
};
