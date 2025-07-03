import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
  }
);

const initialState = {
  items: [],
  loading: true,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.items = [];
        state.loading = true;
      });
  },
});

export default productSlice.reducer;