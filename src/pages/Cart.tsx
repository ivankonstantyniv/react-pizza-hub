import { useSelector } from 'react-redux';

import {CartEmpty, CartWithProducts} from '../components';
import { selectCartItems } from '../redux/slices/cartSlice';

const Cart: React.FC = () => {
  const cartItems = useSelector(selectCartItems);

  return cartItems.length ? <CartWithProducts cartItems={cartItems} /> : <CartEmpty />;
};

export default Cart;
