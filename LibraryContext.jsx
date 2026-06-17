import React, { createContext, useState, useEffect } from 'react';

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterGenre, setFilterGenre] = useState('Все');
  const [sortBy, setSortBy] = useState('title'); 
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    const fetchInitialBooks = () => {
      setTimeout(() => {
        const initialBooks = [
          { id: '1', title: 'Title01', slug: 'title01', author: 'Author01', genre: 'Классика', year: 2000, pages: 328 },
          { id: '2', title: 'Title02', slug: 'title02', author: 'Author02', genre: 'Фентези', year: 2001, pages: 310 },
          { id: '3', title: 'Title03', slug: 'title03', author: 'Author03', genre: 'Фантастика', year: 20002, pages: 480 }
        ];
        setBooks(initialBooks);
        setIsLoading(false);
      }, 1000);
    };

    fetchInitialBooks();
  }, []);

  const addBook = (newBook) => {
    setBooks((prev) => [...prev, { ...newBook, id: Date.now().toString() }]);
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <LibraryContext.Provider value={{
      books,
      isLoading,
      addBook,
      deleteBook,
      filterGenre,
      setFilterGenre,
      sortBy,
      setSortBy,
      sortOrder,
      setSortOrder
    }}>
      {children}
    </LibraryContext.Provider>
  );
};