import { apiRequest } from './api';

export const sendFeedback = async (feedbackData) => {
    return await apiRequest('/feedback', 'POST', feedbackData);
};

export const getFeedbacks = async () => {
    return await apiRequest('/feedback', 'GET');
};
