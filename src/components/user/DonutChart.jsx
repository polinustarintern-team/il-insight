import React from 'react';

const DonutChart = ({ percentage = 50, label = 'Progress' }) => {
    const r = 80;
    const C = 2 * Math.PI * r;
    const completedStroke = (percentage / 100) * C;
    const remainingStroke = C - completedStroke;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* SVG Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    {/* Background Track */}
                    <circle
                        cx="100"
                        cy="100"
                        r={r}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="25"
                    />

                    {/* Progress (Completed) */}
                    <circle
                        cx="100"
                        cy="100"
                        r={r}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="25"
                        strokeDasharray={`${completedStroke} ${C}`}
                        strokeDashoffset={0}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-bold text-[#1e1b4b]">{percentage}%</span>
                    <span className="text-sm text-gray-500">{label}</span>
                </div>
            </div>

            {/* Legend */}
            <div className="flex gap-8 mt-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#8b5cf6]"></div>
                    <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                    <span className="text-sm text-gray-600">Remaining</span>
                </div>
            </div>
        </div>
    );
};

export default DonutChart;
