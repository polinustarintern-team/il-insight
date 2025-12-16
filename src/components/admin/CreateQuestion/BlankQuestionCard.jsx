import React from 'react';

const BlankQuestionCard = ({ onClick }) => {
    return (
        <div className="flex flex-col items-center gap-4 cursor-pointer group" onClick={() => window.location.href = '/admin/create-question/edit'}>
            <div className="w-48 h-32 bg-[#110C2A] rounded flex items-center justify-center transition-transform group-hover:scale-105">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </div>
            <span className="text-gray-400 font-light">blank question</span>
        </div>
    );
};

export default BlankQuestionCard;
