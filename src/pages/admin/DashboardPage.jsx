import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import StatChart from '../../components/admin/Dashboard/StatChart';

const DashboardPage = () => {
  return (
    <AdminLayout title="Dashboard">
      {/* Welcome */}
      <div className="mb-16">
        <h2 className="text-2xl font-normal text-gray-800">
          Welcome Admin !
        </h2>
      </div>

      {/* Charts */}
      <div className="flex justify-center gap-32">
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

      {/* Legend */}
      <div className="mt-16 flex justify-center gap-16">
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full bg-[#c4b5fd]" />
          <span className="text-sm text-gray-700">Unresolve</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full bg-[#1e1b4b]" />
          <span className="text-sm text-gray-700">Resolve</span>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
