import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const [query, setQuery] = useState('');
    const cart = useSelector(state => state.cart);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const wishlist = useSelector(state => state.wishlist);
    const wishlistCount = wishlist.length;
    return (
        <div className="header">
            <div className="row">
                <div className="flex-container">
                    <div className="logo"><span>S</span>hopify</div>
                    <div className="flex">

                        <div className="search-holder">
                            <div className="category">All <ion-icon name="chevron-down-outline"></ion-icon></div>
                            <input
                                type="text"
                                placeholder="Search Products..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="search-btn">
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                        </div>

                        <Link to="/login" className="login">LOGIN</Link>
                        <span>/</span>
                        <Link to="/signup" className="sign-up">SIGN UP</Link>

                        <Link to="/wishlist" className="wish-list holder">
                            <ion-icon name="heart-outline"></ion-icon>
                            <div className="counter">{wishlistCount}</div>
                        </Link>

                        <Link to="/cart" className="cart holder">
                            <ion-icon name="cart-outline"></ion-icon>
                            <div className="counter">{totalItems}</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
