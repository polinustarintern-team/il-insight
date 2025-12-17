import React from 'react';

const ProfileModal = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[#110e2d] w-full max-w-2xl rounded-3xl p-8 relativetext-white shadow-2xl relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 text-white px-4 pt-2">
                    <button onClick={onClose} className="text-2xl hover:text-gray-300">
                        ‹
                    </button>
                    <h2 className="text-xl font-normal">Profile</h2>
                    <div className="w-6"></div> {/* Spacer for centering */}
                </div>

                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-10">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-300 border-2 border-white">
                            {/* Placeholder Image */}
                            <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white text-black p-1.5 rounded-lg shadow-md transform translate-x-1/3 translate-y-1/3">
                            📷
                        </button>
                    </div>
                    <h3 className="text-white font-bold text-lg mt-4">{user?.name}11_</h3>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-x-12 gap-y-6 px-8 mb-8 text-white">
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full bg-white text-black rounded-xl px-4 py-3 outline-none"
                            defaultValue=""
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Posision</label> {/* "Posision" as per design legacy typo or correct? Assuming typo but matching image */}
                        <input
                            type="text"
                            className="w-full bg-white text-black rounded-xl px-4 py-3 outline-none"
                            defaultValue=""
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Division</label>
                        <input
                            type="text"
                            className="w-full bg-white text-black rounded-xl px-4 py-3 outline-none"
                            defaultValue=""
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-white text-black rounded-xl px-4 py-3 outline-none"
                            defaultValue=""
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Status</label>
                        <input
                            type="text"
                            className="w-full bg-white text-black rounded-xl px-4 py-3 outline-none"
                            defaultValue=""
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-center pb-4">
                    <button className="bg-[#7c4dff] text-white px-12 py-3 rounded-lg font-medium hover:bg-[#651fff] transition-colors shadow-lg shadow-purple-500/30">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
