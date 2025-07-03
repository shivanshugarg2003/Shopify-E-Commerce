import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        wishlist.map(item => (
          <div key={item.id} style={{ marginBottom: '1rem' }}>
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
            <button
              onClick={() => dispatch(removeFromWishlist(item))}
              style={{
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '6px'
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;