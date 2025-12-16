import React from 'react';

const SummaryCard = ({ from, to, count }) => {
    // Icons for Mentor (Single User) vs Management (User with Gear)
    const UserIcon = () => (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );

    const UserGearIcon = () => (
        <div className="relative">
            <UserIcon />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                <svg className="w-4 h-4 text-[#1e1b4b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
        </div>
    );

    return (
        <div className="bg-[#1e1b4b] rounded-xl p-6 flex flex-col justify-between h-40 shadow-lg text-white">
            <div className="flex items-center justify-between px-4">
                <div className="flex flex-col items-center">
                    {from.type === 'management' ? <UserGearIcon /> : <UserIcon />}
                    <span className="text-xs mt-2 text-gray-300">{from.label}</span>
                </div>

                <div className="mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>

                <div className="flex flex-col items-center">
                    {to.type === 'management' ? <UserGearIcon /> : <UserIcon />}
                    <span className="text-xs mt-2 text-gray-300">{to.label}</span>
                </div>
            </div>

            <div className="flex items-end gap-2 mt-4 px-2">
                <span className="text-4xl font-bold">{count}</span>
                <span className="text-sm text-gray-400 mb-1.5">Feedback</span>
            </div>
        </div>
    );
};

export default SummaryCard;
