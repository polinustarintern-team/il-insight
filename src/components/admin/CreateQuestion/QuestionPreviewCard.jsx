import React from 'react';

const QuestionPreviewCard = ({ title, date }) => {
    return (
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="w-48 h-32 bg-[#EBE5FF] rounded-lg overflow-hidden border border-gray-100 flex flex-col transition-shadow group-hover:shadow-md">
                {/* Header / Top Bar */}
                <div className="h-4 bg-[#8b5cf6] w-full"></div>

                {/* Mock Content Lines */}
                <div className="p-3 space-y-2 opacity-50">
                    <div className="h-1 bg-gray-400 rounded w-3/4"></div>
                    <div className="h-1 bg-gray-300 rounded w-full"></div>
                    <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                </div>
            </div>

            <div className="text-center w-48">
                <h3 className="text-[#1e1b4b] text-xs font-semibold leading-tight mb-1">{title}</h3>
                <div className="flex items-center justify-center gap-1 text-gray-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10px]">{date}</span>
                </div>
            </div>
        </div>
    );
};

export default QuestionPreviewCard;
