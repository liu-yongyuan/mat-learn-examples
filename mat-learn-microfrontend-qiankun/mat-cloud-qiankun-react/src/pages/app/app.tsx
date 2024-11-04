import React from 'react';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Books from './books/books';
import Book from './book/book';

const router = createBrowserRouter([
  {
    path: '/mat-cloud-qiankun-react/books',
    element: <Books />,
  },
  {
    path: '/mat-cloud-qiankun-react/:bookId',
    element: <Book />,
  },
]);

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  );
};

export default App;
