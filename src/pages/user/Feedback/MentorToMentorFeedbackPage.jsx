import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../../layouts/UserLayout';

const MentorToMentorFeedbackPage = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({
        q1: '',
        q2: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Mentor to Mentor Feedback:', answers);
        navigate('/thank-you');
    };

    return (
        <UserLayout title="Feedback">
            <div className="mb-6">
                <button
                    onClick={() => navigate('/user/feedback')}
                    className="flex items-center gap-2 text-[#1e1b4b] font-medium hover:underline"
                >
                    <span className="text-xl">‹</span>
                    <span>Back to Feedback</span>
                </button>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-[#1e1b4b] mb-2">Mentor to Mentor Feedback</h2>
                    <p className="text-gray-500 mb-8">Please provide honest feedback to help your fellow mentors improve.</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Question 1 */}
                        <div className="space-y-3">
                            <label className="block text-gray-700 font-semibold">
                                1. How would you rate the collaboration with your peer?
                            </label>
                            <textarea
                                className="w-full p-4 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#8b5cf6] focus:ring-0 transition-colors resize-none h-32"
                                placeholder="Type your answer here..."
                                value={answers.q1}
                                onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
                                required
                            />
                        </div>

                        {/* Question 2 */}
                        <div className="space-y-3">
                            <label className="block text-gray-700 font-semibold">
                                2. Any specific suggestions for improvement?
                            </label>
                            <textarea
                                className="w-full p-4 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#8b5cf6] focus:ring-0 transition-colors resize-none h-32"
                                placeholder="Type your answer here..."
                                value={answers.q2}
                                onChange={(e) => setAnswers({ ...answers, q2: e.target.value })}
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                className="bg-[#1e1b4b] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2e1065] transition-colors shadow-lg shadow-indigo-500/20"
                            >
                                Submit Feedback
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
};

export default MentorToMentorFeedbackPage;
