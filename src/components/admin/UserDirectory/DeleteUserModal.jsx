import React from 'react';

const DeleteUserModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#110C2A] w-full max-w-lg rounded-3xl p-10 relative border border-gray-800 shadow-2xl flex flex-col items-center">
                <h2 className="text-3xl text-white font-medium mb-6">Delete Acccount</h2>

                <p className="text-white text-lg font-light text-center mb-10">
                    Are you sure you want to delete this account?
                </p>

                <button
                    onClick={onDelete}
                    className="bg-[#8b5cf6] text-white px-12 py-3 rounded-lg font-bold text-lg hover:bg-[#7c3aed] transition-colors shadow-lg"
                >
                    Delete
                </button>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-white"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    );
};

export default DeleteUserModal;
