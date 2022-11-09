import { Link } from 'react-router-dom';

import cartEmptyIMG from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => {
  return (
    <div className="container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пуста 😕</h2>
        <p>
          Скоріше за все, Ви ще не замовляли піцу.
          <br />
          Для того, щоб замовити піцу, перейдіть на головну сторінку.
        </p>
        <img src={cartEmptyIMG} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутись назад</span>
        </Link>
      </div>
    </div>
  );
};

