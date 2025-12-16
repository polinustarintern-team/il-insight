import React from 'react';

const FilterPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Modal Container - Dark Theme from Image */}
            <div className="bg-[#110C2A] w-[600px] p-8 rounded-2xl shadow-2xl relative text-white">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-medium tracking-wide">Filter</h2>
                    {/* Optional Close Button if needed, or rely on 'Apply Now' / Outside click */}
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                    {/* Role */}
                    <div className="flex items-center justify-between">
                        <label className="text-white text-lg font-medium">Role :</label>
                        <div className="relative w-40">
                            <select className="appearance-none w-full bg-white text-[#a78bfa] rounded-md py-2 px-3 focus:outline-none cursor-pointer font-medium">
                                <option>All</option>
                                <option>Mentor</option>
                                <option>Management</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#a78bfa]">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                        <label className="text-white text-lg font-medium">Status :</label>
                        <div className="relative w-40">
                            <select className="appearance-none w-full bg-white text-[#a78bfa] rounded-md py-2 px-3 focus:outline-none cursor-pointer font-medium">
                                <option>Select</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#a78bfa]">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Empty placeholder for grid balance if needed, or spanned */}
                    <div></div>

                    {/* Position */}
                    <div className="flex items-center justify-between">
                        <label className="text-white text-lg font-medium">Posision :</label>
                        <div className="relative w-40">
                            <select className="appearance-none w-full bg-white text-[#a78bfa] rounded-md py-2 px-3 focus:outline-none cursor-pointer font-medium">
                                <option>Select</option>
                                <option>Tech</option>
                                <option>HR</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#a78bfa]">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-between mt-16">
                    <div className="flex items-center gap-4">
                        <label className="text-white text-lg font-medium">Follow up :</label>
                        <div className="w-6 h-6 border-2 border-white rounded flex items-center justify-center bg-transparent cursor-pointer">
                            <svg className="w-4 h-4 text-white hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            {/* Intentionally unchecked as per design start state, or toggleable */}
                            <input type="checkbox" className="opacity-0 absolute w-6 h-6 cursor-pointer" />
                            <svg className="w-4 h-4 text-white pointer-events-none opacity-0 check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <style>{`
                                input:checked + .check-icon { opacity: 1; }
                           `}</style>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium py-3 px-8 rounded-lg transition-colors"
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup;
