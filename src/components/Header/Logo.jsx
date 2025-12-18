import React from 'react';


const Logo = () => {
    // Check if logo image exists, otherwise render text
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '1.2rem' }}>
            {/* Placeholder for actual image if available */}
            {/* <img src="/assets/images/logo.png" alt="Company Logo" style={{ height: '40px' }} /> */}
            {/* <img src={logo} alt="Company Logo" style={{ height: '40px' }} /> */}
        </div>
    );
};

export default Logo;
