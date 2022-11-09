import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterSliceType {
  categoryValue: number;
  sortValue: number;
  searchValue: string;
  currentPage: number;
}

const initialState: FilterSliceType = {
  categoryValue: 0,
  sortValue: 0,
  searchValue: '',
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryValue: (state, action: PayloadAction<number>) => {
      state.categoryValue = action.payload;
    },
    setSortValue: (state, action: PayloadAction<number>) => {
      state.sortValue = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceType>) => {
      state.categoryValue = Number(action.payload.categoryValue);
      state.currentPage = Number(action.payload.currentPage);
      state.sortValue = Number(action.payload.sortValue);
      state.searchValue = action.payload.searchValue;
    },
    clearFilters: (state) => {
      state.categoryValue = 0;
      state.currentPage = 1;
      state.sortValue = 0;
      state.searchValue = '';
    },
  },
});

export const { setCategoryValue, setSortValue, setSearchValue, setPage, setFilters, clearFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
