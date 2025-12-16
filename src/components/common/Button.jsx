import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn ${className}`}
            style={{
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                backgroundColor: '#007bff',
                color: 'white',
                opacity: disabled ? 0.6 : 1
            }}
        >
            {children}
        </button>
    );
};

export default Button;
