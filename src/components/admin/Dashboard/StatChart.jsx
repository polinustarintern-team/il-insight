import React from 'react';

const StatChart = ({ title, totalLabel, percentage }) => {
    const r = 70;
    const C = 2 * Math.PI * r;
    const strokeDasharray = (percentage / 100) * C;

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium text-gray-700 mb-8 uppercase tracking-wide text-center max-w-[200px]">{title}</h3>

            <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    {/* Background Track (Dark Navy) */}
                    <circle
                        cx="100"
                        cy="100"
                        r={r}
                        fill="none"
                        stroke="#1e1b4b"
                        strokeWidth="30"
                        strokeLinecap="round"
                    />

                    {/* Progress (Light Purple) */}
                    <circle
                        cx="100"
                        cy="100"
                        r={r}
                        fill="none"
                        stroke="#c4b5fd"
                        strokeWidth="30"
                        strokeDasharray={`${strokeDasharray} ${C}`}
                        strokeDashoffset={0}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[#a78bfa] text-lg font-medium">Total</span>
                    <span className="text-[#8b5cf6] text-2xl font-bold">{totalLabel}</span>
                    <div className="mt-2 bg-[#1e1b4b] text-white text-xs px-2 py-1 rounded-full font-bold">
                        {percentage}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatChart;
