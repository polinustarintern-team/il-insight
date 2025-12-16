import React from 'react';
import Logo from './Logo';

const Header = () => {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <Logo />
            <nav style={{ marginLeft: 'auto' }}>
                <a href="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#333' }}>Home</a>
                <a href="/feedback" style={{ textDecoration: 'none', color: '#333' }}>Feedback</a>
            </nav>
        </header>
    );
};

export default Header;
