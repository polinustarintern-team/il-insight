import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackCategoryCard = ({ title, description, isDark, path }) => {
    const navigate = useNavigate();
    // Icons are somewhat complex in the image (people with gears). 
    // I will use a simplified SVG representation of two people and an arrow.

    return (
        <div className={`rounded-3xl p-8 flex flex-col items-center text-center border h-full ${isDark ? 'bg-[#110e2d] border-[#110e2d]' : 'bg-white border-gray-200'}`}>
            <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-[#110e2d]' : 'bg-[#7c7891]'}`}>
                {/* Placeholder Icon SVG */}
                <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Person 1 */}
                    <circle cx="20" cy="20" r="10" stroke="white" strokeWidth="3" />
                    <path d="M5 50 C 5 40 10 35 20 35 C 30 35 35 40 35 50" stroke="white" strokeWidth="3" fill="none" />

                    {/* Arrow */}
                    <path d="M50 30 L 70 30" stroke="white" strokeWidth="3" />
                    <path d="M65 25 L 70 30 L 65 35" stroke="white" strokeWidth="3" fill="none" />

                    {/* Person 2 (with gear hint?) */}
                    <circle cx="100" cy="20" r="10" stroke="white" strokeWidth="3" />
                    <path d="M85 50 C 85 40 90 35 100 35 C 110 35 115 40 115 50" stroke="white" strokeWidth="3" fill="none" />

                    {/* Little gear icon overlay */}
                    <circle cx="35" cy="45" r="5" stroke="white" strokeWidth="2" />
                    <circle cx="115" cy="45" r="5" stroke="white" strokeWidth="2" />

                </svg>
            </div>

            <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-[#7c7891]'}`}>{title}</h3>
            <p className={`text-xs mb-8 ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>{description}</p>

            <button
                onClick={() => path && navigate(path)}
                className={`w-full py-3 rounded-full font-bold text-sm transition-colors ${isDark
                    ? 'bg-[#1e1b4b] text-white hover:bg-[#311b92] border border-white/20'
                    : 'bg-[#7c7891] text-white hover:bg-gray-600'
                    }`}>
                Start Feedback
            </button>
        </div>
    );
};

export default FeedbackCategoryCard;
