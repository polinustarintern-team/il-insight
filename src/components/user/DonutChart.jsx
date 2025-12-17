import React from 'react';

const DonutChart = () => {
    // Data roughly estimated from image:
    // 45% Negative (Dark)
    // 5% Neutral (Darker/Small segment)
    // 50% Positive (Light Purple)

    // Circumference = 2 * pi * r
    // r = 80 (approx) -> C ≈ 502
    const r = 80;
    const C = 2 * Math.PI * r;

    // Offsets calculation
    // Segment 1 (50%): 0 to 50
    // Segment 2 (45%): 50 to 95
    // Segment 3 (5%): 95 to 100

    // Using somewhat hardcoded values to match the specific look
    // The chart in the image has gaps and rounded caps.

    return (
        <div className="flex flex-col items-center">
            <div className="text-gray-600 mb-8 text-sm">Analysis from August to December</div>

            <div className="relative w-80 h-80 flex items-center justify-center">
                {/* SVG Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    {/* Background circle (track) - optional */}
                    {/* <circle cx="100" cy="100" r={r} fill="none" stroke="#f3f4f6" strokeWidth="30" /> */}

                    {/* Positive (Light Purple) - 50% */}
                    <circle
                        cx="100"
                        cy="100"
                        r={r}
                        fill="none"
                        stroke="#c4b5fd" // Light purple
                        strokeWidth="35"
                        strokeDasharray={`${C * 0.48} ${C}`} // 48% to leave gap
                        strokeDashoffset={0}
                        strokeLinecap="round"
                    />

                    {/* Negative (Dark Blue/Purple) - 45% */}
                    <circle
                        cx="100"
                        cy="100"
                        r={r}
                        fill="none"
                        stroke="#1e1b4b" // Dark navy
                        strokeWidth="35"
                        strokeDasharray={`${C * 0.43} ${C}`}
                        strokeDashoffset={-C * 0.52} // Start after positive + gap
                        strokeLinecap="round"
                    />

                    {/* Neutral (Black/Very Dark) - 5% */}
                    <circle
                        cx="100"
                        cy="100"
                        r={r}
                        fill="none"
                        stroke="#0f172a" // Darker
                        strokeWidth="35"
                        strokeDasharray={`${C * 0.03} ${C}`}
                        strokeDashoffset={-C * 0.97} // Start at the end
                        strokeLinecap="round"
                    />
                </svg>

                {/* Labels on Chart */}
                {/* 50% Label */}
                <div className="absolute bottom-10 text-xs text-white bg-[#c4b5fd] px-2 py-1 rounded-full font-bold">50%</div>

                {/* 45% Label */}
                <div className="absolute top-16 right-6 text-xs text-white bg-[#1e1b4b] px-2 py-1 rounded-full font-bold">45%</div>

                {/* 5% Label */}
                <div className="absolute top-1/2 left-2 text-xs text-white bg-[#0f172a] px-2 py-1 rounded-full font-bold transform -translate-y-1/2">5%</div>


                {/* Center Text */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-purple-400 text-lg">Analysis</span>
                    <span className="text-purple-400 text-lg">Interactive</span>
                </div>
            </div>

            {/* Legend */}
            <div className="flex gap-8 mt-12">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0f172a]"></div>
                    <span className="text-xs text-gray-600">Negative</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#c4b5fd]"></div>
                    <span className="text-xs text-gray-600">Positive</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#1e1b4b]"></div>
                    <span className="text-xs text-gray-600">Neutral</span>
                </div>
            </div>
        </div>
    );
};

export default DonutChart;
