import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Ensure this is linked correctly

function Header() {
    return (
        <header className="header">
            <div className="navigation">
                <Link to="/">Home</Link>
                <Link to="/jobs">Search</Link>
            </div>
            <div className="navigation">
                <Link to="/Research">Stories</Link>
                <Link to="/reviews">Careers</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </header>
    );
}

export default Header;
