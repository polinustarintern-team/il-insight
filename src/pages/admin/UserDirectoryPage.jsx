import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import UserListItem from '../../components/admin/UserDirectory/UserListItem';
import UserProfileDetail from '../../components/admin/UserDirectory/UserProfileDetail';
import UserFormModal from '../../components/admin/UserDirectory/UserFormModal';
import DeleteUserModal from '../../components/admin/UserDirectory/DeleteUserModal';

const UserDirectoryPage = () => {
    // Mock Data
    const initialUsers = [
        { id: 1, name: 'Reza Kurniawan, S.T.', role: 'Tech Web Development', username: 'Reza11_', email: 'kurniawanreza11@gmail.com', division: 'Mentor', password: '1234567890', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 2, name: 'Reza Kurniawan, S.T.', role: 'Tech Web Development', username: 'Reza_Dev', email: 'reza.dev@example.com', division: 'Mentor', password: 'password123', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 3, name: 'Reza Kurniawan, S.T.', role: 'Tech Web Development', username: 'RK_Tech', email: 'rk.tech@example.com', division: 'Mentor', password: 'securepass', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 4, name: 'Reza Kurniawan, S.T.', role: 'Tech Web Development', username: 'RezaTheMentor', email: 'reza.mentor@example.com', division: 'Mentor', password: 'mentorpass', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 5, name: 'Reza Kurniawan, S.T.', role: 'Tech Web Development', username: 'Reza123', email: 'reza123@example.com', division: 'Mentor', password: '1234567890', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 6, name: 'Reza Kurniawan, S.T.', role: 'Tech Web Development', username: 'Reza_K', email: 'reza.k@example.com', division: 'Mentor', password: 'password', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 7, name: 'Reza Kurniawan, S.T.', role: 'Tech Web Development', username: 'RezaW', email: 'reza.w@example.com', division: 'Mentor', password: 'pass', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 8, name: 'Reza Kurniawan, S.T.', role: 'Tech Web Development', username: 'Reza_Tech', email: 'reza.tech@example.com', division: 'Mentor', password: 'admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ];

    const [users, setUsers] = useState(initialUsers);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedUser = users.find(u => u.id === selectedUserId);

    const handleCreateUser = (userData) => {
        const newUser = {
            id: users.length + 1,
            ...userData,
            username: userData.name.split(' ')[0] + '_New', // Auto-generate username for demo
            avatar: ''
        };
        setUsers([...users, newUser]);
        setIsCreateModalOpen(false);
        setSelectedUserId(newUser.id);
    };

    const handleUpdateUser = (userData) => {
        setUsers(users.map(u => u.id === selectedUserId ? { ...u, ...userData } : u));
        setIsUpdateModalOpen(false);
    };

    const handleDeleteUser = () => {
        const newUsers = users.filter(u => u.id !== selectedUserId);
        setUsers(newUsers);
        if (newUsers.length > 0) setSelectedUserId(newUsers[0].id);
        else setSelectedUserId(null);
        setIsDeleteModalOpen(false);
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
                        {filteredUsers.map(user => (
                            <UserListItem
                                key={user.id}
                                user={user}
                                active={selectedUserId === user.id}
                                onClick={() => setSelectedUserId(user.id)}
                            />
                        ))}
                    </div>

                    {/* Add User Button (Fixed at bottom of list area) */}
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="hidden lg:flex absolute bottom-6 left-[40%] transform -translate-x-1/2 z-10 text-[#1e1b4b] hover:text-[#8b5cf6] transition-colors"
                    >
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
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
