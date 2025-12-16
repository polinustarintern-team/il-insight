import React from 'react';
import Button from '../common/Button';

const SubmitButton = ({ disabled }) => {
    return (
        <Button type="submit" disabled={disabled} className="submit-btn">
            {disabled ? 'Sending...' : 'Submit Feedback'}
        </Button>
    );
};

export default SubmitButton;
