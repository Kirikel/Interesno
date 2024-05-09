import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where
} from '@firebase/firestore';
import { AUTHORS_LIST, BOOKS_LIST } from '../core/firebase/constants';
import { db } from '../core/firebase';
import {
  BookAuthor,
  BookItem,
  BooksListGroupedByYear,
  BooksListResponse,
  BooksListSortedByYear
} from '../core/types';

export const fetchBooks = (
  setBooks: React.Dispatch<React.SetStateAction<BooksListSortedByYear>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const q = query(collection(db, BOOKS_LIST));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const books = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as BooksListResponse;
    const booksSortedByYear = books.reduce(
      (acc: BooksListGroupedByYear, book) => {
        const yearKey = book.date
          ? book.date.toDate().getFullYear().toString()
          : 'unknown_year';
        if (!acc[yearKey]) {
          acc[yearKey] = [];
        }
        acc[yearKey].push(book);
        return acc;
      },
      {}
    );

    //Sort by name
    Object.keys(booksSortedByYear).forEach((year) => {
      booksSortedByYear[year].sort((a, b) => a.name.localeCompare(b.name));
    });

    const sortedBooks: BooksListSortedByYear = Object.keys(booksSortedByYear)
      .sort((a, b) => {
        if (a === 'unknown_year') return 1;
        if (b === 'unknown_year') return -1;
        return parseInt(b) - parseInt(a);
      })
      .map((year) => ({
        year: year,
        books: booksSortedByYear[year]
      }));

    setBooks(sortedBooks);
    setIsLoading(false);
  });
  return unsubscribe;
};

export const fetchRecommendedBooks = async (
  setRecommendedBook: React.Dispatch<React.SetStateAction<BookItem>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const currentYear = new Date().getFullYear();
  const q = query(collection(db, BOOKS_LIST));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const books = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as BooksListResponse;

    const timeTestedBooks: BooksListResponse = books.filter(
      (book) => book.date && currentYear - book.date.toDate().getFullYear() >= 3
    );

    const maxRate = Math.max(
      ...timeTestedBooks.map((book) => Number(book.rate))
    );
    const bestBooks = timeTestedBooks.filter(
      (book) => Number(book.rate) === maxRate
    );
    const recommendedBook =
      bestBooks[Math.floor(Math.random() * bestBooks.length)];

    setRecommendedBook(recommendedBook);
    setIsLoading(false);
  });
  return unsubscribe;
};

export const fetchBooksAuthors = async (
  setAuthors: React.Dispatch<React.SetStateAction<{ name: string, value: string }[]>>
) => {
  onSnapshot(query(collection(db, AUTHORS_LIST)), (querySnapshot) => {
    const authors = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data, value: data.name };
    });
    setAuthors(authors as { name: string, value: string }[]);
  });
};

export const addNewAuthor = async (name: string) => {
  try {
    const docRef = await addDoc(collection(db, AUTHORS_LIST), { name });
    alert('Успешно добавлено');
    return docRef;
  } catch (e) {
    console.error('Error adding book author: ', e);
  }
};

export const addBook = async (data: Omit<BookItem, 'id'>) => {
  try {
    const newData = { ...data };
    if (newData.date) {
      //TODO: add "string" types
      //@ts-ignore
      newData.date = Timestamp.fromDate(new Date(newData.date));
    }
    const docRef = await addDoc(collection(db, BOOKS_LIST), newData);
    alert('Успешно добавлено');
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteBook = async (bookId: string) => {
  const response = window.confirm('Действительно хотите удалить?');

  if (!response) {
    return;
  }

  try {
    await deleteDoc(doc(db, BOOKS_LIST, bookId));
  } catch (error) {
    console.error('Error removing document: ', error);
  }
};

export const fetchBookById = async (bookId: string) => {
  const bookRef = doc(db, BOOKS_LIST, bookId);

  try {
    const bookSnap = await getDoc(bookRef);
    if (bookSnap.exists()) {
      return { ...bookSnap.data(), id: bookSnap.id };
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error getting document:', error);
  }
};

export const editBook = async (
  bookId: string,
  updatedData: BookItem
): Promise<void> => {
  try {
    const data = { ...updatedData };
    if (data.date) {
      //TODO: add "string" types
      //@ts-ignore
      data.date = Timestamp.fromDate(new Date(data.date));
    }
    const bookRef = doc(db, BOOKS_LIST, bookId);
    await updateDoc(bookRef, data);
    alert('Успешно обновлено');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};
