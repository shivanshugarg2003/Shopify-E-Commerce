import productReducer, { fetchProducts } from '../productSlice';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('productSlice', () => {
  it('should return the initial state', () => {
    expect(productReducer(undefined, { type: undefined })).toEqual({
      items: [],
      loading: true,
    });
  });

  it('should handle fetchProducts.pending', () => {
    const initialState = { items: [], loading: false };
    const newState = productReducer(initialState, { type: fetchProducts.pending.type });
    expect(newState.loading).toBe(true);
  });

  it('should handle fetchProducts.fulfilled', () => {
    const initialState = { items: [], loading: true };
    const products = [{ id: 1, title: 'Test Product' }];
    const newState = productReducer(initialState, { type: fetchProducts.fulfilled.type, payload: products });
    expect(newState.loading).toBe(false);
    expect(newState.items).toEqual(products);
  });

  it('should handle fetchProducts.rejected', () => {
    const initialState = { items: [{ id: 1, title: 'Existing Product' }], loading: false };
    const newState = productReducer(initialState, { type: fetchProducts.rejected.type });
    expect(newState.loading).toBe(true);
    expect(newState.items).toEqual([]);
  });

  // New tests for async thunk dispatch
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('dispatches fulfilled action and updates state on successful fetch', async () => {
    const mockData = [{ id: 1, title: 'Test Product' }];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const store = mockStore({ items: [], loading: false });

    await store.dispatch(fetchProducts());

    const actions = store.getActions();

    expect(actions[0].type).toBe(fetchProducts.pending.type);
    expect(actions[1].type).toBe(fetchProducts.fulfilled.type);
    expect(actions[1].payload).toEqual(mockData);
  });

  it('dispatches rejected action on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));

    const store = mockStore({ items: [], loading: false });

    await store.dispatch(fetchProducts());

    const actions = store.getActions();

    expect(actions[0].type).toBe(fetchProducts.pending.type);
    expect(actions[1].type).toBe(fetchProducts.rejected.type);
  });
});