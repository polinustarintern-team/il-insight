import React, { useState } from 'react';
import ProfileModal from '../common/ProfileModal';

const Header = ({ title, user }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <>
            <header className="flex items-center justify-between py-6 px-8 bg-white border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-1.5 h-1.5 bg-[#1e1b4b] rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-[#1e1b4b] rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-[#1e1b4b] rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-[#1e1b4b] rounded-sm"></div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#1e1b4b]">{title}</h1>
                </div>

                <div
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => setIsProfileOpen(true)}
                >
                    <div className="text-right">
                        <p className="font-bold text-[#1e1b4b] text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#1e1b4b] p-0.5">
                        <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                            <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </header>

            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                user={user}
            />
        </>
    );
};

export default Header;
