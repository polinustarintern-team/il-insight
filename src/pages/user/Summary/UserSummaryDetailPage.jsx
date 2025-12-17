import React from 'react';
import UserLayout from '../../../layouts/UserLayout';

const UserSummaryDetailPage = () => {
    // Mock data repeated to demonstrate scrolling
    const feedbacks = Array(12).fill({
        score: '5.0',
        label: 'Mentor to mentor',
        time: '4 Minutes ago'
    });

    return (
        <UserLayout title="Summary">
            <div className="flex flex-col h-full">
                {/* Back Link */}
                <div className="mb-6">
                    <a href="/user/summary" className="flex items-center gap-2 text-[#1e1b4b] font-medium hover:underline">
                        <span className="text-xl">‹</span>
                        <span>Last Received</span>
                    </a>
                </div>

                {/* List Container */}
                <div className="flex-1 bg-white rounded-lg relative">
                    <div className="space-y-6 pr-4">
                        {feedbacks.map((item, index) => (
                            <a key={index} href="/user/summary/detail/question" className="flex items-center gap-6 group hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer block">
                                <div className="w-12 h-12 bg-[#1e1b4b] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                                    {item.score}
                                </div>

                                <div className="flex-1">
                                    <h4 className="text-gray-700 text-sm">{item.label}</h4>
                                </div>

                                <span className="text-xs text-gray-400 min-w-[80px] text-right">{item.time}</span>
                            </a>
                        ))}
                    </div>

                    {/* Custom Scrollbar Visual (Representation) */}
                    <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="w-full h-1/3 bg-[#1e1b4b] rounded-full mt-10"></div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default UserSummaryDetailPage;
