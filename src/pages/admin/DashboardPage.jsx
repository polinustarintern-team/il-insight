import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import StatChart from '../../components/admin/Dashboard/StatChart';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    mentorStats: { percentage: 0 },
    managementStats: { percentage: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5001/api/admin/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome */}
      <div className="mb-16">
        <h2 className="text-2xl font-normal text-gray-800">
          Welcome {user.name || 'Admin'} !
        </h2>
      </div>

      {/* Charts */}
      <div className="flex justify-center gap-32">
        <StatChart
          title="questions that have been handled"
          totalLabel="Mentor"
          percentage={stats.mentorStats?.percentage || 0}
          loading={loading}
        />
        <StatChart
          title="questions that have been handled"
          totalLabel="Management"
          percentage={stats.managementStats?.percentage || 0}
          loading={loading}
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
