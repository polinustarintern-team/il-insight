import React from 'react';
import Header from '../../components/Header/Header';
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm';

const FeedbackPage = () => {
    const handleFeedbackSubmit = (data) => {
        console.log('Feedback submitted:', data);
        // TODO: Implement actual submission logic
        window.location.href = '/thank-you';
    };

    return (
        <>
            <Header />
            <main style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <FeedbackForm onSubmit={handleFeedbackSubmit} />
            </main>
        </>
    );
};

export default FeedbackPage;
