import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import { toast } from 'react-toastify';

const Products = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);
  const storeProducts = useSelector((state) => state.product?.items);
  const products = storeProducts && storeProducts.length > 0
    ? storeProducts
    : [
        {
          id: 1,
          name: 'T-Shirt',
          price: 1000,
          image: '/images/tshirt.jpg'
        },
        {
          id: 2,
          name: 'Jeans',
          price: 2000,
          image: '/images/jeans.jpg'
        },
        {
          id: 3,
          name: 'Shoes',
          price: 3000,
          image: '/images/shoes.jpg'
        }
      ];


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
            alt={product.name}
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
          <h4>{product.name}</h4>
          <p>₹{product.price}</p>
          <button
            onClick={() => {
              console.log('Dispatching to cart:', product);
              dispatch(addToCart(product));
              toast.success(`${product.name} added to cart!`);
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
                toast.warn(`${product.name} removed from wishlist!`);
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
                toast.info(`${product.name} added to wishlist!`);
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