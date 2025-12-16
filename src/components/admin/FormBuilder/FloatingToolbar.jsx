import React from 'react';

const FloatingToolbar = ({ onAdd }) => {
    const Item = ({ icon, tooltip, onClick }) => (
        <button
            onClick={onClick}
            className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-500 hover:text-[#8b5cf6] hover:bg-gray-50 transition-colors relative group"
            title={tooltip}
        >
            {icon}
            {/* Tooltip */}
            <span className="absolute right-full mr-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                {tooltip}
            </span>
        </button>
    );

    return (
        <div className="flex flex-col gap-3 p-2 bg-transparent sticky top-24">
            <Item
                onClick={onAdd}
                tooltip="Add Question"
                icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
            />
            <Item
                onClick={() => { }}
                tooltip="Import Questions"
                icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
            />
            <Item
                onClick={() => { }}
                tooltip="Add Title and Description"
                icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            />
            {/* Add Image/Video etc */}
        </div>
    );
};

export default FloatingToolbar;
