import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const cart = useSelector(state => state.cart);
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav>
            <div className="row">
                <ul>
                    <li><a href="#All"><ion-icon style={{
                        fontSize: "30px",
                        marginRight: "10px"
                        }} name="menu-outline"></ion-icon> All Category <ion-icon name="chevron-down-outline" style={{marginLeft:"20px"}}></ion-icon></a></li>
                    <li><Link to="/" className="nav-active scroll-easing">Home <ion-icon name="chevron-down-outline"></ion-icon></Link></li>
                    <li><Link to="/pages" className="scroll-easing">Pages <ion-icon name="chevron-down-outline"></ion-icon></Link></li>
                    <li><Link to="/products" className="scroll-easing">Products <ion-icon name="chevron-down-outline"></ion-icon></Link></li>
                    <li><Link to="/shop" className="scroll-easing">Shop <ion-icon name="chevron-down-outline"></ion-icon></Link></li>
                    <li><Link to="/contact" className="scroll-easing">Contact Us</Link></li>
                    <li>
                      <Link to="/cart" className="cart-icon">
                        <span role="img" aria-label="shopping cart">🛒</span> <span className="cart-count">{itemCount}</span>
                      </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;