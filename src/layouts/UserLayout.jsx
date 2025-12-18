import React from 'react';
import UserSidebar from '../components/user/UserSidebar';
import Header from '../components/admin/Header'; // Reusing Header from admin based on visual similarity

const UserLayout = ({ children, title, user: propUser }) => {
    const user = propUser || JSON.parse(localStorage.getItem('user')) || { name: 'User', role: 'Mentor' };

    return (
        <div className="min-h-screen bg-white font-sans">
            <UserSidebar />
            <div className="ml-64 flex flex-col min-h-screen">
                <Header title={title} user={user} />
                <main className="flex-1 p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default UserLayout;
