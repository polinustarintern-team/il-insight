import React from 'react';
import TextInput from './TextInput';
import RatingInput from './RatingInput';
import SubmitButton from './SubmitButton';

const FeedbackForm = ({ onSubmit, isSubmitting }) => {
    const [feedback, setFeedback] = React.useState('');
    const [rating, setRating] = React.useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ feedback, rating });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h2>Give Feedback</h2>
            <RatingInput value={rating} onChange={setRating} />
            <TextInput value={feedback} onChange={setFeedback} />
            <SubmitButton disabled={isSubmitting} />
        </form>
    );
};

export default FeedbackForm;
