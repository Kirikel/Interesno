import { Timestamp } from '@firebase/firestore';

export type BookItem = {
  id: string;
  name: string;
  author: string[];
  ISBN?: string;
  date?: Timestamp;
  rate: string;
};

export type BooksListResponse = BookItem[];
export type BooksListGroupedByYear = { [key: string]: BooksListResponse };
export type BooksListSortedByYear = {
  year: string;
  books: BooksListResponse;
}[];
export type BookAuthor = { name: string };
