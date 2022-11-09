import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import items from './slices/itemsSlice';
import cart from './slices/cartSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filter, items, cart },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();