import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import { fetchProducts } from '../redux/productSlice';
import { toast } from 'react-toastify';

const Products = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);
  const { items: products, loading } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p style={{ padding: '2rem' }}>Loading products…</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Products</h2>
      {products.map(product => (
        <div
          key={product.id}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            margin: '1rem 0',
            borderRadius: '8px',
            maxWidth: '300px'
          }}
        >
          <img
            src={product.image}
            alt={product.title || product.name}
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
          <h4>{product.title || product.name}</h4>
          <p>₹{product.price}</p>
          <button
            onClick={() => {
              dispatch(addToCart(product));
              toast.success(`${product.title || product.name} added to cart!`);
            }}
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Add to Cart
          </button>
          {wishlist.some(item => item.id === product.id) ? (
            <button
              onClick={() => {
                dispatch(removeFromWishlist(product.id));
                toast.warn(`${product.title || product.name} removed from wishlist!`);
              }}
              style={{
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              Remove from Wishlist
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(addToWishlist(product));
                toast.info(`${product.title || product.name} added to wishlist!`);
              }}
              style={{
                backgroundColor: '#ffc107',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              Add to Wishlist
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;