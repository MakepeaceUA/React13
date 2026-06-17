import React, { useState } from 'react';
import { LibraryProvider } from './context/LibraryContext';
import FilterSort from './components/FilterSort';
import BookList from './components/BookList';
import BookFormModal from './components/BookFormModal';
import ModalPortal from './components/ModalPortal';
import styles from './App.module.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <LibraryProvider>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Библиотека Книг</h1>
          <button
            className={styles.btnOpenModal}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить книгу
          </button>
        </header>

        <main>
          <FilterSort />

          <BookList />
        </main>

        <ModalPortal>
          <BookFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </ModalPortal>
      </div>
    </LibraryProvider>
  );
}

export default App;