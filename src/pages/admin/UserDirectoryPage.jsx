import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import UserListItem from '../../components/admin/UserDirectory/UserListItem';
import UserProfileDetail from '../../components/admin/UserDirectory/UserProfileDetail';
import UserFormModal from '../../components/admin/UserDirectory/UserFormModal';
import DeleteUserModal from '../../components/admin/UserDirectory/DeleteUserModal';

const UserDirectoryPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);

    // Fetch users from API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5001/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.users || []);
                if (data.users && data.users.length > 0 && !selectedUserId) {
                    setSelectedUserId(data.users[0].id);
                }
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        (user.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (user.username?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    const selectedUser = users.find(u => u.id === selectedUserId);

    const handleCreateUser = async (userData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5001/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                setIsCreateModalOpen(false);
                fetchUsers(); // Refresh list
                setSelectedUserId(data.userId);
            } else {
                const data = await response.json();
                alert(data.message || 'Gagal membuat user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Terjadi kesalahan');
        }
    };

    const handleUpdateUser = async (userData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5001/api/users/${selectedUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                setIsUpdateModalOpen(false);
                fetchUsers(); // Refresh list
            } else {
                const data = await response.json();
                alert(data.message || 'Gagal update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Terjadi kesalahan');
        }
    };

    const handleDeleteUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5001/api/users/${selectedUserId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setIsDeleteModalOpen(false);
                const remainingUsers = users.filter(u => u.id !== selectedUserId);
                if (remainingUsers.length > 0) {
                    setSelectedUserId(remainingUsers[0].id);
                } else {
                    setSelectedUserId(null);
                }
                fetchUsers(); // Refresh list
            } else {
                const data = await response.json();
                alert(data.message || 'Gagal menghapus user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Terjadi kesalahan');
        }
    };

    return (
        <AdminLayout title="User Directory">
            <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)]">

                {/* Left Column: User List */}
                <div className="lg:w-1/3 flex flex-col h-full relative">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 pl-12 text-gray-700 outline-none focus:border-[#8b5cf6] shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                        {loading ? (
                            <div className="text-center text-gray-500 py-8">Loading...</div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">No users found</div>
                        ) : (
                            filteredUsers.map(user => (
                                <UserListItem
                                    key={user.id}
                                    user={user}
                                    active={selectedUserId === user.id}
                                    onClick={() => setSelectedUserId(user.id)}
                                />
                            ))
                        )}
                    </div>

                    {/* Add User Button (Fixed at bottom of list area) */}
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="hidden lg:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 bg-[#1e1b4b] text-white px-6 py-3 rounded-full shadow-xl hover:bg-[#2e1065] transition-all items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="font-semibold text-sm">Create Account</span>
                    </button>
                </div>

                {/* Right Column: User Details */}
                <div className="lg:w-2/3 h-full">
                    <UserProfileDetail
                        user={selectedUser}
                        onEdit={() => setIsUpdateModalOpen(true)}
                        onDelete={() => setIsDeleteModalOpen(true)}
                    />
                </div>
            </div>

            {/* Mobile Floating Action Button for Add User */}
            <button
                onClick={() => setIsCreateModalOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#1e1b4b] text-white rounded-full flex items-center justify-center shadow-xl z-50"
            >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>

            {/* Modals */}
            <UserFormModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                type="create"
                onSubmit={handleCreateUser}
            />

            <UserFormModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                type="update"
                userData={selectedUser}
                onSubmit={handleUpdateUser}
            />

            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteUser}
            />

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(139, 92, 246, 0.3);
                    border-radius: 20px;
                }
             `}</style>
        </AdminLayout>
    );
};

export default UserDirectoryPage;