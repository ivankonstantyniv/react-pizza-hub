import { Link } from 'react-router-dom';

import styles from './Error404Block.module.scss';

export const Error404Block: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.root__textContainer}>
        <h1>Error 404</h1>
        <p>Сторінку не знайдено 😕</p>
      </div>

      <Link to="/" className="button button--black">
        <span>Повернутись назад</span>
      </Link>
    </div>
  );
};
