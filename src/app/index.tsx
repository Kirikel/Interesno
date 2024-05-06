import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { BookDetailPage } from './pages/BookDetailPage';
import { CreateBookPage } from './pages/CreateBook';
import { EditBookPage } from './pages/EditBook';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path={'/book/add'} element={<CreateBookPage />} />
        <Route path={'/book/:id/edit'} element={<EditBookPage />} />
        <Route path={'/book/:id'} element={<BookDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};
