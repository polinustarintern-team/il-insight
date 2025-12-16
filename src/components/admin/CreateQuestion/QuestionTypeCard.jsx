import React from 'react';

const QuestionTypeCard = ({ from, to, description, onSelect }) => {
    // Icons
    const UserIcon = () => (
        <svg className="w-16 h-16 text-white stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );

    const UserGearIcon = () => (
        <div className="relative">
             <UserIcon />
             <div className="absolute -bottom-2 -right-2 bg-[#110C2A] rounded-full p-1 border-4 border-[#110C2A]">
                 <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
             </div>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Header Graphic */}
            <div className="bg-[#110C2A] h-48 flex items-center justify-center p-8 m-5 rounded-2xl">
                <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center">
                        {from.type === 'management' ? <UserGearIcon /> : <UserIcon />}
                    </div>
                    
                    <div>
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>

                    <div className="flex flex-col items-center">
                        {to.type === 'management' ? <UserGearIcon /> : <UserIcon />}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 text-center">
                <h3 className="text-[#110C2A] font-bold text-lg mb-1">{from.label} to {to.label}</h3>
                <p className="text-gray-400 text-xs mb-6">{description}</p>
                
                <button 
                    onClick={onSelect}
                    className="w-full bg-[#110C2A] hover:bg-[#2e1065] text-white font-medium py-3 rounded-lg transition-colors"
                >
                    Create Question
                </button>
            </div>
        </div>
    );
};

export default QuestionTypeCard;
