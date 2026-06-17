import React, { useContext } from 'react';
import { LibraryContext } from '../context/LibraryContext';
import BookItem from './BookItem';
import styles from './BookList.module.css';

const BookList = () => {
  const {
    books,
    isLoading,
    filterGenre,
    sortBy,
    sortOrder
  } = useContext(LibraryContext);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка коллекции книг...</div>;
  }

  const filteredBooks = books.filter((book) => {
    if (filterGenre === 'Все') return true;
    return book.genre === filterGenre;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    let fieldA = a[sortBy];
    let fieldB = b[sortBy];

    if (typeof fieldA === 'string') {
      fieldA = fieldA.toLowerCase();
      fieldB = fieldB.toLowerCase();
    }

    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  if (sortedBooks.length === 0) {
    return <div className={styles.empty}>В библиотеке нет подходящих книг.</div>;
  }

  return (
    <div className={styles.grid}>
      {sortedBooks.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;

