import { Link } from 'react-router-dom';

import styles from './ErrorGetItems.module.scss';

export const ErrorGetItems: React.FC = () => {
  return (
    <div className={styles.root}>
      <h2>Упс... Виникла помилка 😕</h2>
      <p>На жаль, нам не вдалось завантажити дані. Спробуйте повторити спробу пізніше.</p>
      <div className={styles.buttonBlock}>
        <Link to="/" className="button button--black">
          <span>Повернутись назад</span>
        </Link>
      </div>
    </div>
  );
}
