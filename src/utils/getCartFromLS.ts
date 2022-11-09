import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const cartItems = data ? JSON.parse(data) : [];

  return {
    cartItems,
    allPrice: calcTotalPrice(cartItems),
  }
}