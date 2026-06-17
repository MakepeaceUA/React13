import React, { useContext } from 'react';
import { LibraryContext } from '../context/LibraryContext';
import styles from './BookItem.module.css';

const BookItem = ({ book }) => {
  const { deleteBook } = useContext(LibraryContext);

  return (
    <div className={styles.card}>
      <div>
        <h4>{book.title}</h4>
        <span className={styles.slug}>slug: {book.slug}</span>
        <p><strong>Автор:</strong> {book.author}</p>
        <p><strong>Жанр:</strong> {book.genre}</p>
        <p><strong>Год выпуска:</strong> {book.year}</p>
        <p><strong>Страниц:</strong> {book.pages}</p>
      </div>
      <button className={styles.btnDelete} onClick={() => deleteBook(book.id)}>
        Удалить книгу
      </button>
    </div>
  );
};

export default BookItem;