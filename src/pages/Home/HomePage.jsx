import React from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/common/Button';

const HomePage = () => {
    return (
        <>
            <Header />
            <main style={{ padding: '40px', textAlign: 'center' }}>
                <h1>Welcome to Peer Feedback</h1>
                <p>Share your thoughts and help your colleagues grow.</p>
                <a href="/feedback">
                    <Button>Give Feedback</Button>
                </a>
            </main>
        </>
    );
};

export default HomePage;
