import React from 'react';

const AIReflectionCard = () => {
    return (
        <div className="bg-[#110e2d] rounded-3xl p-12 text-white flex flex-col items-center text-center h-full">
            <div className="text-gray-300 text-lg font-medium mb-2">Score</div>
            <div className="text-5xl font-bold mb-8">4.5/5</div>

            <h3 className="text-xl font-semibold mb-6">AI Feedback Reflection</h3>

            <p className="text-gray-300 leading-relaxed text-sm max-w-lg text-justify">
                Based on mentor-to-mentor evaluations, the feedback toward Mentor A shows 70% positive sentiment, 25% negative, and 5% neutral. Most mentors appreciate the clarity, consistency, and openness shown during collaboration and mentoring sessions. The negative feedback mainly points to occasional delays in response and limited follow-up in certain discussions. Overall, Mentor A demonstrates a strong performance trend with positive engagement and room for improvement in time management and feedback depth.
            </p>
        </div>
    );
};

export default AIReflectionCard;
