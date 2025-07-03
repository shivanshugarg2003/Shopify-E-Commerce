import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // default empty product list
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    clearProducts: (state) => {
      state.items = [];
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { setProducts, clearProducts, addProduct } = productSlice.actions;
export default productSlice.reducer;