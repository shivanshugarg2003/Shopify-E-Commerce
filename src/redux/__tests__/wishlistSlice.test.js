import wishlistReducer, { addToWishlist, removeFromWishlist } from '../wishlistSlice';

describe('wishlistSlice', () => {
  const initialState = [];

  it('should return the initial state', () => {
    expect(wishlistReducer(undefined, { type: undefined })).toEqual([]);
  });

  it('should handle addToWishlist', () => {
    const newItem = {
      id: 1,
      name: 'T-shirt',
      price: 499,
      image: 'https://example.com/tshirt.jpg',
    };
    const state = wishlistReducer(initialState, addToWishlist(newItem));
    expect(state).toEqual([newItem]);
  });

  it('should handle removeFromWishlist', () => {
    const existingItem = {
      id: 1,
      name: 'T-shirt',
      price: 499,
      image: 'https://example.com/tshirt.jpg',
    };
    const stateWithItem = [existingItem];
    const action = { type: removeFromWishlist.type, payload: { id: 1 } };
    const state = wishlistReducer(stateWithItem, action);
    expect(state).toEqual([]);
  });

  it('should not add duplicate items', () => {
    const item = {
      id: 1,
      name: 'T-shirt',
      price: 499,
      image: 'https://example.com/tshirt.jpg',
    };
    const state = wishlistReducer([item], addToWishlist(item));
    expect(state).toEqual([item]);
  });
});