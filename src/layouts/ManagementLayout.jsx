import React from 'react';
import ManagementSidebar from '../components/management/ManagementSidebar';
import Header from '../components/admin/Header';

const ManagementLayout = ({ children, title }) => {
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Management', role: 'manajemen' };

    return (
        <div className="min-h-screen bg-white font-sans">
            <ManagementSidebar />
            <div className="ml-64 flex flex-col min-h-screen">
                <Header title={title} user={user} />
                <main className="flex-1 p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default ManagementLayout;
