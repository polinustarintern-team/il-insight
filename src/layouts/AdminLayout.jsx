import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';

const AdminLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="flex flex-1 flex-col ml-64 min-h-screen">
        <Header title={title} user={{ name: 'Valid', role: 'Mentor' }} />

        <main className="flex-1 px-16 py-10 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
