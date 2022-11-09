import React from 'react';
import uniqid from 'uniqid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem, ItemType, selectCartItems } from '../../redux/slices/cartSlice';

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  rating: number;
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, imageUrl, name, types, sizes, price}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [itemType, setItemType] = React.useState<number>(0);
  const [itemSize, setItemSize] = React.useState<number>(0);
  const [counter, setCounter] = React.useState<number>(0);

  React.useEffect(() => {
    const count: number = cartItems.filter((obj) => obj.id === id).reduce((count: number, obj) => count + obj.count, 0);
    setCounter(count);
  }, [cartItems, id]);

  const typeNames: string[] = ['тонке', 'традиційне'];

  const onClickAddButton = () => {
    const itemData: ItemType = {
      id,
      imageUrl,
      name,
      type: typeNames[types[itemType]],
      size: sizes[itemSize],
      price,
      count: 0
    };

    dispatch(addItem(itemData));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block-upper">
        <div className="pizza-block">
          <Link to={`/product/${id}`}>
            <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          </Link>

          <div className="pizza-block__title__container">
            <h4 className="pizza-block__title">{name}</h4>
          </div>
          <div className="pizza-block__selector">
            <ul>
              {types.map((value: number, i: number) => (
                <li
                  key={uniqid()}
                  onClick={() => setItemType(i)}
                  className={itemType === i ? 'active' : ''}>
                  {typeNames[value]}
                </li>
              ))}
            </ul>
            <ul>
              {sizes.map((value: number, i: number) => (
                <li
                  key={uniqid()}
                  onClick={() => setItemSize(i)}
                  className={itemSize === i ? 'active' : ''}>
                  {value + ' см'}
                </li>
              ))}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">від {price} ₴</div>
            <button onClick={onClickAddButton} className="button button--outline button--add">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Додати</span>
              {counter > 0 && <i>{counter}</i>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
