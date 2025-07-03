import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import NavBar from './header/NavBar';
import Home from './Home';
import Products from './Products';
import Shop from './Shop';
import Contact from './Contact';
import Cart from './Cart';
import Terms from './Terms'; // adjust path if needed
import Wishlist from './Wishlist';
import Pages from './Pages';
import { ToastContainer } from 'react-toastify';
import '../styles/bootstrap.css';
import '../styles/App.scss';

function App() {
  
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;