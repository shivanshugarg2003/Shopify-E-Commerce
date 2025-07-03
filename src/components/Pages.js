import React from 'react';
import { Link } from 'react-router-dom';

const Pages = () => {
  return (
    <div className="pages-page" style={{ padding: '2rem' }}>
      <h1>Useful Pages</h1>
      <ul style={{ lineHeight: '2' }}>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/shipping">Shipping Policy</Link></li>
        <li><Link to="/returns">Return & Refund Policy</Link></li>
        <li><Link to="/terms">Terms and Conditions</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
      </ul>
    </div>
  );
};

export default Pages;