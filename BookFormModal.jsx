import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LibraryContext } from '../context/LibraryContext';
import styles from './BookFormModal.module.css';

const generateSlug = (text) => {
  if (!text) return '';
  const cyrillicToLatin = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh', 'з': 'z',
    'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
    'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch',
    'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'і': 'i', 'ї': 'yi', 'є': 'ye', 'ґ': 'g'
  };
  return text
    .toLowerCase()
    .split('')
    .map(char => cyrillicToLatin[char] || char)
    .join('')
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const schema = yup.object().shape({
  title: yup.string().required('Название книги обязательно').min(2, 'Минимум 2 символа'),
  slug: yup.string().required('Slug обязателен'),
  author: yup.string().required('Автор обязателен').min(2, 'Минимум 2 символа'),
  genre: yup.string().required('Выберите жанр'),
  year: yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError('Год должен быть числом')
    .integer('Год должен быть целым числом')
    .positive('Год должен быть больше 0')
    .max(new Date().getFullYear(), 'Год не может быть в будущем')
    .required('Год обязателен'),
  pages: yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError('Укажите число страниц')
    .integer('Должно быть целое число')
    .positive('Минимум 1 страница')
    .required('Количество страниц обязательно')
});

const BookFormModal = ({ isOpen, onClose }) => {
  const { addBook } = useContext(LibraryContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', slug: '', author: '', genre: '', year: '', pages: '' }
  });

  const titleValue = watch('title');

  useEffect(() => {
    setValue('slug', generateSlug(titleValue));
  }, [titleValue, setValue]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    addBook(data);
    reset();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Новая книга</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className={styles.formGroup}>
            <label>Название книги:</label>
            <input
              type="text"
              className={errors.title ? styles.errorInput : ''}
              {...register('title')}
            />
            {errors.title && <span className={styles.errorText}>{errors.title.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Slug (генерируется автоматически):</label>
            <input
              type="text"
              className={`${styles.slugInput} ${errors.slug ? styles.errorInput : ''}`}
              readOnly
              {...register('slug')}
            />
            {errors.slug && <span className={styles.errorText}>{errors.slug.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Автор:</label>
            <input
              type="text"
              className={errors.author ? styles.errorInput : ''}
              {...register('author')}
            />
            {errors.author && <span className={styles.errorText}>{errors.author.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Жанр:</label>
            <select className={errors.genre ? styles.errorInput : ''} {...register('genre')}>
              <option value="">-- Выберите жанр --</option>
              <option value="Классика">Классика</option>
              <option value="Фэнтези">Фэнтези</option>
              <option value="Фантастика">Фантастика</option>
            </select>
            {errors.genre && <span className={styles.errorText}>{errors.genre.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Год выпуска:</label>
            <input
              type="text"
              className={errors.year ? styles.errorInput : ''}
              {...register('year')}
            />
            {errors.year && <span className={styles.errorText}>{errors.year.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Количество страниц:</label>
            <input
              type="text"
              className={errors.pages ? styles.errorInput : ''}
              {...register('pages')}
            />
            {errors.pages && <span className={styles.errorText}>{errors.pages.message}</span>}
          </div>

          <div className={styles.actions}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;