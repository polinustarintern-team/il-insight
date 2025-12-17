import React from 'react';

const DetailQuestionCard = ({ title }) => {
    const criteria = [
        { name: 'Communication', score: '5.0', icon: '💬' },
        { name: 'Teamwork', score: '4.9', icon: '🤝' },
        { name: 'Responsibility', score: '4.8', icon: '💼' },
        { name: 'Initiative', score: '5.0', icon: '💡' },
    ];

    return (
        <div className="bg-[#311b92] rounded-3xl p-8 text-white mb-8">
            <h3 className="text-xl font-semibold mb-8 text-center">{title}</h3>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Side: Criteria List */}
                <div className="flex-1 space-y-6">
                    {criteria.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#7c4dff] flex items-center justify-center text-xl">
                                    {item.icon}
                                </div>
                                <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <div className="text-sm opacity-80">
                                {item.score}/5.0
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: Comment Box */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl p-4 h-full min-h-[160px] text-gray-800 relative">
                        <span className="text-xs font-bold text-gray-500 absolute top-4 left-4">Comment :</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailQuestionCard;
