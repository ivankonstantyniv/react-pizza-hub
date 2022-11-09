import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type ItemType = {
  id: string;
  imageUrl: string;
  name: string;
  type: string;
  size: number;
  count: number;
  price: number;
}

interface CartSliceType {
  cartItems: ItemType[];
  allPrice: number;
}

const {cartItems, allPrice} = getCartFromLS();

const initialState: CartSliceType = {
  cartItems,
  allPrice,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemType>) => {
      const findItem = state.cartItems.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      const obj = { ...action.payload, count: 1 };

      if (findItem) {
        findItem.count += 1;
      } else {
        state.cartItems.push(obj);
      }

      state.allPrice = calcTotalPrice(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.allPrice = 0;
    },
    removeItem: (state, action: PayloadAction<ItemType>) => {
      const { id, type, size } = action.payload;

      const cleanedList = state.cartItems.filter(
        (obj) => obj.id !== id || obj.type !== type || obj.size !== size,
      );

      state.cartItems = cleanedList;

      state.allPrice = calcTotalPrice(state.cartItems);
    },
    incrementItemCount: (state, action: PayloadAction<ItemType>) => {
      const { id, count, type, size } = action.payload;
      const item = state.cartItems.find(
        (obj) => obj.id === id && obj.count === count && obj.type === type && obj.size === size,
      );
      item && (item.count += 1);

      state.allPrice = calcTotalPrice(state.cartItems);
    },
    decrementItemCount: (state, action: PayloadAction<ItemType>) => {
      const { id, count, type, size } = action.payload;
      const item = state.cartItems.find(
        (obj) => obj.id === id && obj.count === count && obj.type === type && obj.size === size,
      );

      if (item && item.count > 1) {
        item.count -= 1
      }

      state.allPrice = calcTotalPrice(state.cartItems);
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const { addItem, clearCart, incrementItemCount, decrementItemCount, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
