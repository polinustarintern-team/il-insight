import { useState } from 'react';
// import { sendFeedback } from '../services/feedbackService';

const useFeedback = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const submitFeedback = async (feedbackData) => {
        setIsSubmitting(true);
        try {
            // await sendFeedback(feedbackData);
            console.log('Sending feedback:', feedbackData);
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return true;
        } catch (err) {
            setError(err);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return { submitFeedback, isSubmitting, error };
};

export default useFeedback;
