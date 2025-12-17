import React from 'react';

const FormHeader = ({ title, description, onChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 border-t-8 border-t-[#8b5cf6]">
            <div className="p-6">
                <input
                    type="text"
                    className="w-full text-3xl text-[#1e1b4b] font-medium border-b border-transparent focus:border-gray-200 outline-none pb-2 transition-colors placeholder-gray-300"
                    placeholder="Untitled Form"
                    value={title}
                    onChange={(e) => onChange('title', e.target.value)}
                />
                <textarea
                    className="w-full mt-4 text-sm text-gray-600 border-b border-transparent focus:border-gray-200 outline-none resize-none transition-colors placeholder-gray-300"
                    placeholder="Form Description"
                    rows={1}
                    value={description}
                    onChange={(e) => onChange('description', e.target.value)}
                />
            </div>
        </div>
    );
};

export default FormHeader;
