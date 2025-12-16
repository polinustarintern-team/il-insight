import React from 'react';

const BatchCard = ({ batchName, scores, averageScore }) => {
    // Helper to render icons based on category (simplified for demo)
    const getIcon = (category) => {
        // Using simple emojis or placeholder SVGs for now to match the "purple circle" look
        return (
            <div className="w-10 h-10 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white">
                {/* Placeholder icon logic */}
                {category === 'Communication' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
                {category === 'Teamwork' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                {category === 'Responsibility' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                {category === 'Initiative' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
            </div>
        );
    };

    return (
        <div className="bg-[#110C2A] text-white rounded-3xl p-8 mb-8 relative overflow-hidden shadow-xl">
            <h2 className="text-3xl text-center mb-8 text-gray-200">{batchName}</h2>

            <div className="flex justify-between items-center max-w-4xl mx-auto">
                <div className="space-y-6 flex-1 max-w-lg">
                    {scores.map((score, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {getIcon(score.category)}
                                <span className="text-lg text-gray-300 font-medium">{score.category}</span>
                            </div>
                            <span className="text-lg font-medium tracking-wider">{score.value}/5.0</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center pl-20 border-l border-gray-700/50 min-h-[200px]">
                    <span className="text-sm text-[#a78bfa] mb-2 uppercase tracking-wide font-semibold">Average Score</span>
                    <span className="text-7xl font-bold">{averageScore}</span>
                </div>
            </div>
        </div>
    );
};

export default BatchCard;
