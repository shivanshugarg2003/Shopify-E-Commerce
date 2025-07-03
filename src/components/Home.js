import React from 'react';
import Products from './Products';

const Home = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <img
        src="https://via.placeholder.com/1200x400?text=Big+Sale+is+Live!"
        alt="Banner"
        style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
      />
      <h1>Welcome to the Shopify E-Commerce Store</h1>
      <p>Browse top products and get exclusive deals.</p>

      <h2>Featured Products</h2>
      <Products />
    </div>
  );
};

export default Home;