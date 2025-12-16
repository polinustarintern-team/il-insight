import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';

const AdminLayout = ({ children, title }) => {
    return (
        <div className="flex min-h-screen bg-white font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header title={title} user={{ name: 'Walid', role: 'Mentor' }} />
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
