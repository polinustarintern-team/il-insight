import React, { useState, useEffect } from 'react';

const SummaryTable = () => {
    const [filter, setFilter] = useState('mentor');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5001/api/admin/summary/table?filter=${filter}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.users || []);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [filter]);

    // Toggle Follow Up
    const toggleFollowUp = async (userId, index) => {
        const newStatus = !users[index].followedUp;

        // Optimistic update
        setUsers(prev =>
            prev.map((user, i) =>
                i === index ? { ...user, followedUp: newStatus } : user
            )
        );

        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5001/api/admin/summary/follow-up/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ followedUp: newStatus })
            });
        } catch (error) {
            console.error('Error updating follow up:', error);
            // Revert on error
            setUsers(prev =>
                prev.map((user, i) =>
                    i === index ? { ...user, followedUp: !newStatus } : user
                )
            );
        }
    };

    return (
        <div className="mt-8">
            {/* FILTER */}
            <div className="flex justify-end items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Filter
                </div>

                <div className="bg-gray-200 rounded-lg p-1 flex">
                    <button
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors
                        ${filter === 'manajemen'
                                ? 'bg-[#a78bfa] text-white'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                        onClick={() => setFilter('manajemen')}
                    >
                        Management
                    </button>

                    <button
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors
                        ${filter === 'mentor'
                                ? 'bg-[#8b5cf6] text-white'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                        onClick={() => setFilter('mentor')}
                    >
                        Mentor
                    </button>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1e1b4b] text-white">
                        <tr>
                            <th className="px-6 py-4 text-sm font-medium">Username</th>
                            <th className="px-6 py-4 text-sm font-medium">Role</th>
                            <th className="px-6 py-4 text-sm font-medium">Status</th>
                            <th className="px-6 py-4 text-sm font-medium">Score</th>
                            <th className="px-6 py-4 text-sm font-medium">Follow Up</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user, idx) => (
                                <tr key={user.id || idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-[#1e1b4b]">
                                        {user.username}
                                    </td>

                                    <td className="px-6 py-4 font-medium text-[#1e1b4b]">
                                        {user.role || '-'}
                                    </td>

                                    <td className="px-6 py-4 font-bold text-[#1e1b4b]">
                                        {user.status || 'Active'}
                                    </td>

                                    <td className="px-6 py-4 font-bold text-[#1e1b4b]">
                                        {user.score || '0.0'}
                                    </td>

                                    {/* FOLLOW UP CHECKBOX */}
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleFollowUp(user.id, idx)}
                                            className={`w-6 h-6 rounded border-2 flex items-center justify-center
                                            transition-colors
                                            ${user.followedUp
                                                    ? 'bg-[#1e1b4b] border-[#1e1b4b]'
                                                    : 'border-[#1e1b4b]'
                                                }`}
                                        >
                                            {user.followedUp && (
                                                <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </td>

                                    {/* ACTION */}
                                    <td className="px-6 py-4 flex justify-end items-center gap-3">
                                        <a
                                            href={`/admin/summary/detail/${user.id}`}
                                            className="text-[#a78bfa] hover:text-[#8b5cf6] text-sm font-medium"
                                        >
                                            Detail
                                        </a>

                                        <button className="text-[#1e1b4b] hover:text-black">
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SummaryTable;
