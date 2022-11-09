import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type ItemType = {
  id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  rating: number;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface ItemsSliceType {
  itemsList: ItemType[];
  itemType: number;
  itemSize: number;
  status: Status;
}

export type SearchItemsParams = {
  filters: string;
  currentPage: number;
}

export const fetchItems = createAsyncThunk<ItemType[], SearchItemsParams>(
  'items/fetchItemsStatus',
  async (params) => {
    const { filters, currentPage } = params;
    const { data } = await axios.get<ItemType[]>(
      `https://6335ad248aa85b7c5d20b4d1.mockapi.io/items?page=${currentPage}&limit=4${filters}`,
    );

    return data;
  },
);

const initialState: ItemsSliceType = {
  itemsList: [],
  itemType: 0,
  itemSize: 0,
  status: Status.LOADING, 
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.itemsList = action.payload;
    },
    setItemType: (state, action) => {
      state.itemType = action.payload;
    },
    setItemSize: (state, action) => {
      state.itemSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fetchItems status
      builder.addCase(fetchItems.pending, (state) => {
        state.status = Status.LOADING;
        state.itemsList = [];
      });

      builder.addCase(fetchItems.fulfilled, (state, action) => {
        state.itemsList = action.payload;
        state.status = Status.SUCCESS;
      });

      builder.addCase(fetchItems.rejected, (state) => {
        state.status = Status.ERROR;
        state.itemsList = [];
      });
  },
});

export const selectItemsList = (state: RootState) => state.items;

export const { setItemType, setItemSize, setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
