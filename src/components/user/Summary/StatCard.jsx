import React from 'react';

const StatCard = ({ icon, label, count }) => {
    return (
        <div className="bg-[#110e2d] rounded-2xl p-6 flex flex-col justify-between h-32 min-w-[200px] text-white">
            <div className="flex items-center gap-3">
                <div className="text-2xl opacity-80">{icon}</div>
                <span className="font-medium text-lg">{label}</span>
            </div>
            <div className="text-2xl font-bold mt-2">{count}</div>
        </div>
    );
};

export default StatCard;
