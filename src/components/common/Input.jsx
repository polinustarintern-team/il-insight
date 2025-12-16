import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, name, className = '' }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`input ${className}`}
            style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '100%',
                boxSizing: 'border-box'
            }}
        />
    );
};

export default Input;
