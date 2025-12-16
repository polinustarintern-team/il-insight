import React from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/common/Button';

const ThankYouPage = () => {
    return (
        <>
            <Header />
            <main style={{ padding: '40px', textAlign: 'center' }}>
                <h1>Thank You!</h1>
                <p>Your feedback has been received.</p>
                <a href="/">
                    <Button>Back to Home</Button>
                </a>
            </main>
        </>
    );
};

export default ThankYouPage;
