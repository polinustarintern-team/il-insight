import React, { useState } from 'react';

const SummaryTable = () => {
    const [filter, setFilter] = useState('Mentor'); // 'Management' or 'Mentor'

    // Mock Data
    const users = Array(7).fill({
        username: 'Reza Kurniawan',
        role: 'Tech',
        status: 'Active',
        score: '4.9',
        followedUp: true,
    });

    // Customize one or two to show unchecked state
    users[3] = { ...users[3], followedUp: false };
    users[6] = { ...users[6], followedUp: false };

    return (
        <div className="mt-8">
            <div className="flex justify-end items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Filter
                </div>
                <div className="bg-gray-200 rounded-lg p-1 flex">
                    <button
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'Management' ? 'bg-[#a78bfa] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        onClick={() => setFilter('Management')}
                    >
                        Management
                    </button>
                    <button
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'Mentor' ? 'bg-[#8b5cf6] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        onClick={() => setFilter('Mentor')}
                    >
                        Mentor
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1e1b4b] text-white">
                        <tr>
                            <th className="px-6 py-4 font-medium text-sm">Username</th>
                            <th className="px-6 py-4 font-medium text-sm">Role</th>
                            <th className="px-6 py-4 font-medium text-sm">Status</th>
                            <th className="px-6 py-4 font-medium text-sm">Score</th>
                            <th className="px-6 py-4 font-medium text-sm">Follow Up</th>
                            <th className="px-6 py-4 font-medium text-sm"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-[#1e1b4b]">{user.username}</td>
                                <td className="px-6 py-4 font-medium text-[#1e1b4b]">{user.role}</td>
                                <td className="px-6 py-4 font-bold text-[#1e1b4b]">{user.status}</td>
                                <td className="px-6 py-4 font-bold text-[#1e1b4b]">{user.score}</td>
                                <td className="px-6 py-4">
                                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center 
                                        ${user.followedUp ? 'border-[#1e1b4b] bg-[#1e1b4b]' : 'border-[#1e1b4b] bg-transparent'}`}>
                                        {user.followedUp && (
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 flex items-center justify-end gap-3">
                                    <a href="/admin/summary/detail" className="text-[#a78bfa] hover:text-[#8b5cf6] text-sm font-medium">Detail</a>
                                    <button className="text-[#1e1b4b] hover:text-black">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Scrollbar placeholder visualization (right side bar) */}
            <div className="fixed right-2 top-1/2 h-48 w-1.5 bg-gray-200 rounded-full hidden md:block opacity-50">
                <div className="h-20 w-full bg-[#1e1b4b] rounded-full mt-10"></div>
            </div>
        </div>
    );
};

export default SummaryTable;
