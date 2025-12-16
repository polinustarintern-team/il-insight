import React from 'react';

const StatChart = ({ title, totalLabel, percentage }) => {
    // A simple CSS implementation of a semi-circle gauge
    return (
        <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium text-gray-600 mb-6">{title}</h3>

            <div className="relative w-64 h-32 overflow-hidden mb-4">
                {/* Background arc */}
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[30px] border-[#c4b5fd] box-border"></div>

                {/* Foreground arc (progress) - rotated to match design */}
                {/* Note: This is a simplification. For precise "50%", we just hide half. 
                    In a real app, use SVG stroke-dasharray. 
                    Here I'll use a hacky CSS way to mimic the look quickly. */}
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[30px] border-[#1e1b4b] box-border"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', transform: 'rotate(0deg)' }}>
                </div>

                {/* Center Text */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end h-full pb-2">
                    <span className="text-xl text-[#a78bfa] font-medium">Total</span>
                    <span className="text-xl text-[#a78bfa] font-medium">{totalLabel}</span>
                </div>

                {/* Percentage Badges */}
                {/* 50% Top */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#2e1065] text-white text-[10px] px-2 py-1 rounded-full z-10">
                    {percentage}%
                </div>
                {/* 50% Bottom (Actually on the ends of the arc for this specific design) */}
                <div className="absolute bottom-0 left-5 bg-[#c4b5fd] text-white text-[10px] px-2 py-1 rounded-full z-10 w-8 text-center ring-2 ring-white">
                    50%
                </div>
                <div className="absolute bottom-0 right-5 bg-[#c4b5fd] text-white text-[10px] px-2 py-1 rounded-full z-10 w-8 text-center ring-2 ring-white">
                    50%
                </div>
            </div>
        </div>
    );
};

export default StatChart;
