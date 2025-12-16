import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import StatChart from '../../components/admin/Dashboard/StatChart';

const DashboardPage = () => {
    return (
        <AdminLayout title="Dashboard">
            <div className="mb-12">
                <h2 className="text-xl text-gray-700 font-normal">Welcome Admin !</h2>
            </div>

            <div className="flex justify-center gap-20">
                <StatChart
                    title="questions that have been handled"
                    totalLabel="Mentor"
                    percentage={50}
                />
                <StatChart
                    title="questions that have been handled"
                    totalLabel="Management"
                    percentage={50}
                />
            </div>

            <div className="flex justify-center gap-10 mt-12">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#c4b5fd]"></div>
                    <span className="text-xs text-gray-600">Unresolve</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#1e1b4b]"></div>
                    <span className="text-xs text-gray-600">Resolve</span>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
