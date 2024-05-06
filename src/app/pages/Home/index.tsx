import React, { FC } from 'react';
import { BooksList } from '../../components/BooksList';
import { Header } from '../../components/Header';

interface Props {}

export const HomePage: FC<Props> = () => {
  return (
    <>
      <Header />
      <BooksList />
    </>
  );
};
