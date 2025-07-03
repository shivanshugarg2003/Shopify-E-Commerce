import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
        console.log(`Increased quantity of ${existing.name} to ${existing.quantity}`);
      } else {
        state.push({ ...action.payload, quantity: 1 });
        console.log(`Added ${action.payload.name} to cart with quantity 1`);
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.find(product => product.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find(product => product.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.find(product => product.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.find(product => product.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;