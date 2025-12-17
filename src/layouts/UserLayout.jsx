import React from 'react';
import UserSidebar from '../components/user/UserSidebar';
import Header from '../components/admin/Header'; // Reusing Header from admin based on visual similarity

const UserLayout = ({ children, title, user = { name: 'Walid', role: 'Mentor' } }) => {
    return (
        <div className="flex min-h-screen bg-white font-sans">
            <UserSidebar />
            <div className="flex-1 flex flex-col">
                <Header title={title} user={user} />
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default UserLayout;
