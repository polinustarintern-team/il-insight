import React from 'react';

const UserProfileDetail = ({ user, onEdit, onDelete }) => {
    if (!user) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500 bg-[#110C2A] rounded-3xl">
                Select a user to view details
            </div>
        );
    }

    return (
        <div className="bg-[#110C2A] rounded-3xl p-8 h-full relative text-white flex flex-col items-center">
            {/* Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-2">
                <button onClick={onEdit} className="text-gray-400 hover:text-white transition-colors" title="Edit User">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
            </div>

            {/* Profile Header */}
            <div className="mt-8 mb-6 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-4 shadow-2xl">
                    <img
                        src={user.avatar || "https://ui-avatars.com/api/?name=" + user.name + "&background=random"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-2xl font-bold mb-1 ml-6">{user.username}</h2>
                <p className="text-gray-400 text-sm">{user.role}</p>
            </div>

            {/* Profile Details List */}
            <div className="w-full max-w-md space-y-6 mt-8 pl-10">
                <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                    <span className="text-gray-400 text-sm">Full Name :</span>
                    <span className="text-white font-medium">{user.name}</span>
                </div>

                <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                    <span className="text-gray-400 text-sm">Email :</span>
                    <span className="text-white font-medium">{user.email}</span>
                </div>

                <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                    <span className="text-gray-400 text-sm">Division :</span>
                    <span className="text-white font-medium">{user.division}</span>
                </div>

                <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                    <span className="text-gray-400 text-sm">Password :</span>
                    <span className="text-white font-medium tracking-wider">{user.password}</span>
                </div>
            </div>

            {/* Delete Button Bottom Right */}
            <button onClick={onDelete} className="absolute bottom-6 right-6 text-gray-500 hover:text-red-500 transition-colors" title="Delete User">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
        </div>
    );
};

export default UserProfileDetail;
