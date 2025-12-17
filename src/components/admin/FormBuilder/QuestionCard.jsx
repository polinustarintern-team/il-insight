import React from 'react';

const QuestionCard = ({ question, onChange, onDelete, onDuplicate, onRequireToggle }) => {

    // Add new option
    const addOption = () => {
        const newOptions = [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`];
        onChange(question.id, 'options', newOptions);
    };

    // Update specific option text
    const updateOption = (idx, text) => {
        const newOptions = [...question.options];
        newOptions[idx] = text;
        onChange(question.id, 'options', newOptions);
    };

    // Remove specific option
    const removeOption = (idx) => {
        const newOptions = question.options.filter((_, i) => i !== idx);
        onChange(question.id, 'options', newOptions);
    };

    const isSelectionType = ['multiple_choice', 'checkbox', 'dropdown'].includes(question.type);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4 relative hover:shadow-md transition-shadow group border-l-4 border-l-transparent focus-within:border-l-[#8b5cf6]">

            {/* Top Row: Question Text & Type Selector */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1 bg-gray-50 p-2 rounded-t-md border-b border-gray-300 focus-within:border-[#8b5cf6] focus-within:bg-gray-100 transition-colors">
                    <input
                        type="text"
                        className="w-full bg-transparent outline-none text-[#1e1b4b] font-medium"
                        placeholder="Question"
                        value={question.text}
                        onChange={(e) => onChange(question.id, 'text', e.target.value)}
                    />
                </div>

                <div className="w-full md:w-60">
                    <select
                        className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-[#8b5cf6] bg-white text-gray-700 cursor-pointer"
                        value={question.type}
                        onChange={(e) => onChange(question.id, 'type', e.target.value)}
                    >
                        <option value="short_answer">Short Answer</option>
                        <option value="paragraph">Paragraph</option>
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="checkbox">Checkboxes</option>
                        <option value="dropdown">Dropdown</option>
                    </select>
                </div>
            </div>

            {/* Answer Area */}
            <div className="mb-6">
                {question.type === 'short_answer' && (
                    <div className="border-b border-dotted border-gray-300 py-2 text-gray-400 text-sm">Short answer text</div>
                )}

                {question.type === 'paragraph' && (
                    <div className="border-b border-dotted border-gray-300 py-2 text-gray-400 text-sm">Long answer text</div>
                )}

                {isSelectionType && (
                    <div className="space-y-3">
                        {question.options?.map((option, idx) => (
                            <div key={idx} className="flex items-center gap-3 group/option">
                                <div className="text-gray-400">
                                    {question.type === 'multiple_choice' && <div className="w-4 h-4 rounded-full border border-gray-300"></div>}
                                    {question.type === 'checkbox' && <div className="w-4 h-4 rounded border border-gray-300"></div>}
                                    {question.type === 'dropdown' && <span className="text-xs">{idx + 1}.</span>}
                                </div>
                                <input
                                    type="text"
                                    className="flex-1 outline-none border-b border-transparent focus:border-gray-200 text-gray-700 hover:border-gray-100"
                                    value={option}
                                    onChange={(e) => updateOption(idx, e.target.value)}
                                />
                                <button
                                    onClick={() => removeOption(idx)}
                                    className="text-gray-400 hover:text-gray-600 opacity-0 group-hover/option:opacity-100 transition-opacity"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <div className="flex items-center gap-3 mt-2">
                            <div className="text-gray-400 w-4"></div>
                            <button
                                onClick={addOption}
                                className="text-gray-400 text-sm hover:text-[#8b5cf6] font-medium transition-colors"
                            >
                                Add option
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-end border-t border-gray-100 pt-4 gap-4">
                <button onClick={() => onDuplicate(question.id)} className="text-gray-500 hover:text-[#1e1b4b]" title="Duplicate">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>

                <button onClick={() => onDelete(question.id)} className="text-gray-500 hover:text-red-500" title="Delete">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>

                <div className="h-6 w-px bg-gray-200"></div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Required</span>
                    <div
                        className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${question.required ? 'bg-[#8b5cf6]' : 'bg-gray-300'}`}
                        onClick={() => onRequireToggle(question.id)}
                    >
                        <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${question.required ? 'left-6' : 'left-1'}`}></div>
                    </div>
                </div>
            </div>

            {/* Drag Handle (Visual Only) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1.5 opacity-0 group-hover:opacity-100 cursor-move flex gap-0.5 justify-center pt-1 transition-opacity">
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    );
};

export default QuestionCard;
