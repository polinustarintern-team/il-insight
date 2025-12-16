import React from 'react';
import Input from '../common/Input';

const TextInput = ({ value, onChange }) => {
    return (
        <div>
            <label>Comments:</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={4}
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    marginTop: '5px',
                    boxSizing: 'border-box'
                }}
                placeholder="Write your feedback here..."
            />
        </div>
    );
};

export default TextInput;
