import React from 'react';

const RatingInput = ({ value, onChange }) => {
    return (
        <div>
            <label>Rating:</label>
            <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => onChange(star)}
                        style={{
                            cursor: 'pointer',
                            fontSize: '24px',
                            color: star <= value ? 'gold' : 'gray'
                        }}
                    >
                        ★
                    </span>
                ))}
            </div>
        </div>
    );
};

export default RatingInput;
