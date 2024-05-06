import React, { FC } from 'react';
import { BookDetail } from '../../components/BookDetail';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header';

interface Props {}

export const BookDetailPage: FC<Props> = () => {
  const { id } = useParams();

  return (
    <>
      <Header />
      <BookDetail id={id as string} />
    </>
  );
};
