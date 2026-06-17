import React, { useContext } from 'react';
import { LibraryContext } from '../context/LibraryContext';
import styles from './FilterSort.module.css';

const FilterSort = () => {
  const {
    filterGenre,
    setFilterGenre,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder
  } = useContext(LibraryContext);

  return (
    <div className={styles.panel}>
      <div className={styles.controlGroup}>
        <label>Жанр:</label>
        <select
          className={styles.select}
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
        >
          <option value="Все">Все жанры</option>
          <option value="Классика">Классика</option>
          <option value="Фэнтези">Фэнтези</option>
          <option value="Фантастика">Фантастика</option>
        </select>
      </div>

      <div className={styles.controlGroup}>
        <label>Сортировать по:</label>
        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Названию</option>
          <option value="year">Году издания</option>
          <option value="pages">Количеству страниц</option>
        </select>
      </div>

      <div className={styles.controlGroup}>
        <label>Порядок:</label>
        <select
          className={styles.select}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;