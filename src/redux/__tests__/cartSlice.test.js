import cartReducer, {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  increaseQuantity,
  decreaseQuantity,
} from '../cartSlice';
const initialState = [];

test('should handle initial state', () => {
  expect(cartReducer(undefined, { type: undefined })).toEqual([]);
});

test('should handle addToCart (new item)', () => {
  const newItem = { id: 1, name: 'T-shirt', price: 499 };
  const state = cartReducer(initialState, addToCart(newItem));
  expect(state).toEqual([{ ...newItem, quantity: 1 }]);
});

test('should increment quantity if item already in cart', () => {
  const item = { id: 1, name: 'T-shirt', price: 499 };
  const state = cartReducer([{ ...item, quantity: 1 }], addToCart(item));
  expect(state[0].quantity).toBe(2);
});

test('should increment item quantity', () => {
  const item = { id: 1, name: 'T-shirt', price: 499, quantity: 1 };
  const state = cartReducer([item], incrementQuantity(1));
  expect(state[0].quantity).toBe(2);
});

test('should decrement item quantity', () => {
  const item = { id: 1, name: 'T-shirt', price: 499, quantity: 2 };
  const state = cartReducer([item], decrementQuantity(1));
  expect(state[0].quantity).toBe(1);
});

test('should remove item from cart', () => {
  const item = { id: 1, name: 'T-shirt', price: 499, quantity: 1 };
  const state = cartReducer([item], removeFromCart(1));
  expect(state).toEqual([]);
});
test('should not increment quantity if item not found', () => {
  const item = { id: 1, name: 'T-shirt', price: 499, quantity: 1 };
  const state = cartReducer([item], incrementQuantity(2));
  expect(state[0].quantity).toBe(1);
});

test('should not decrement quantity if item not found', () => {
  const item = { id: 1, name: 'T-shirt', price: 499, quantity: 2 };
  const state = cartReducer([item], decrementQuantity(2));
  expect(state[0].quantity).toBe(2);
});

test('should not remove item if quantity > 1 when decrementing', () => {
  const item = { id: 1, name: 'T-shirt', price: 499, quantity: 3 };
  const state = cartReducer([item], decrementQuantity(1));
  expect(state[0].quantity).toBe(2);
});
test('should increase quantity using increaseQuantity reducer', () => {
  const item = { id: 2, name: 'Jeans', price: 999, quantity: 1 };
  const state = cartReducer([item], increaseQuantity({ payload: 2 }));
  expect(state[0].quantity).toBe(1);
});

test('should decrease quantity if more than one item exists', () => {
  const item = { id: 3, name: 'Shoes', price: 1499, quantity: 2 };
  const state = cartReducer([item], decreaseQuantity(3));
  expect(state[0].quantity).toBe(1);
});
test('should not change cart if trying to remove non-existing item', () => {
  const item = { id: 1, name: 'T-shirt', price: 499, quantity: 1 };
  const state = cartReducer([item], removeFromCart(2));
  expect(state).toEqual([item]);
});

test('should not decrement if item does not exist', () => {
  const item = { id: 1, name: 'T-shirt', price: 499, quantity: 2 };
  const state = cartReducer([item], decreaseQuantity(999)); // no item with id 999
  expect(state).toEqual([item]);
});

test('should not decrement if quantity is 1', () => {
  const item = { id: 1, name: 'T-shirt', price: 499, quantity: 1 };
  const state = cartReducer([item], decreaseQuantity(1));
  expect(state[0].quantity).toBe(1); // remains the same
});