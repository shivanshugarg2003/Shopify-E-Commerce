import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  console.log('Cart State:', cart);
  const dispatch = useDispatch();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <h4>{item.name}</h4>
              <p data-testid={`quantity-${item.id}`}>
                Quantity:
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  style={{ margin: '0 6px', padding: '4px 10px' }}
                >
                  −
                </button>
                {item.quantity}
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  style={{ margin: '0 6px', padding: '4px 10px' }}
                >
                  +
                </button>
              </p>
              <p>Total: ₹{item.price * item.quantity}</p>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <hr />
          <h3>Total Amount: ₹{total}</h3>
          <button
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;