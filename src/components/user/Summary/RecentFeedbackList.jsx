import React from 'react';

const RecentFeedbackList = () => {
    const feedbacks = [
        { score: '5.0', label: 'Mentor to mentor', time: '4 Minutes ag', color: 'bg-[#311b92]', height: 'h-16' }, // Dark deep purple
        { score: '4.5', label: 'Mentor to mentor', time: '4 Minutes ag', color: 'bg-[#311b92]', height: 'h-16' },
        { score: '4.0', label: 'Mentor to mentor', time: '4 Minutes ag', color: 'bg-[#311b92]', height: 'h-16' },
        { score: '3.5', label: 'Mentor to mentor', time: '4 Minutes ag', color: 'bg-[#311b92]', height: 'h-16' },
        { score: '3.0', label: 'Mentor to mentor', time: '4 Minutes ag', color: 'bg-[#311b92]', height: 'h-16' },
    ];

    return (
        <div className="flex flex-col">
            <h3 className="text-gray-700 font-medium mb-6">Last Received</h3>

            <div className="relative border-l-2 border-[#1e1b4b] ml-4 space-y-6 pb-4">
                {feedbacks.map((item, index) => (
                    <div key={index} className="flex items-center gap-6 pl-8 relative">
                        {/* Custom square point on the line? Or just the box itself acts as the point? The image shows independent boxes. */}
                        {/* Let's adjust to match image: Scores are boxes on the left, Timeline line is on the far right of the content? No, it looks like a list. */}
                        {/* Actually, looking closely at "uploaded_image_1765899417317.png":
                           The Score Box (5.0) is on the left.
                           "Mentor to mentor" text is in the middle.
                           "4 Minutes ag" is on the right.
                           There is a thick dark vertical bar on the FAR RIGHT of the list items? Or maybe that's a scrollbar? 
                           Wait, there is a vertical bar to the right of the list items "4 Minutes ag". It looks like a decorative bar or scroll indicator.
                           Let's assume standard list layout for now but try to match the "Score Box" look.
                        */}

                        <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                            {item.score}
                        </div>

                        <div className="flex-1">
                            <h4 className="font-bold text-[#1e1b4b] text-sm">{item.label}</h4>
                        </div>

                        <span className="text-[10px] text-gray-400 min-w-[60px] text-right">{item.time}</span>
                    </div>
                ))}

                {/* The vertical bar on the right side in the image looks like a custom design element or a scroll bar. I will add a simple right border for now if needed, or omit if unclear. 
                   Actually, looking at the crop 4, there is a thick dark line to the right of the "4 Minutes ag" column. It spans the top 3 items. 
                */}
                <div className="absolute right-0 top-2 bottom-1/3 w-1.5 bg-[#1e1b4b] rounded-full"></div>
            </div>

            <div className="mt-8">
                <a href="/user/summary/detail" className="block w-full text-center bg-[#110e2d] text-white py-4 rounded-full font-medium shadow-lg hover:bg-opacity-90 transition-all">
                    View Detail
                </a>
            </div>
        </div>
    );
};

export default RecentFeedbackList;
