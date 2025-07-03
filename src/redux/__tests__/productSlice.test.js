import productReducer, { setProducts, clearProducts, addProduct } from '../productSlice';

describe('productSlice', () => {
  it('should return the initial state', () => {
    expect(productReducer(undefined, { type: undefined })).toEqual({ items: [] });
  });

  it('should set products', () => {
    const initialState = { items: [] };
    const action = setProducts([
      { id: 1, name: 'T-Shirt' },
      { id: 2, name: 'Jeans' },
    ]);
    const newState = productReducer(initialState, action);
    expect(newState.items).toHaveLength(2);
    expect(newState.items[0].name).toBe('T-Shirt');
  });

  it('should clear products', () => {
    const initialState = {
      items: [
        { id: 1, name: 'T-Shirt' },
        { id: 2, name: 'Jeans' },
      ],
    };
    const newState = productReducer(initialState, clearProducts());
    expect(newState.items).toEqual([]);
  });

  it('should add a product', () => {
    const initialState = { items: [] };
    const newProduct = { id: 3, name: 'Shoes' };
    const newState = productReducer(initialState, addProduct(newProduct));
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual(newProduct);
  });
});