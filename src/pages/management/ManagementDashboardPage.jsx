import React, { useState, useEffect } from 'react';
import ManagementLayout from '../../layouts/ManagementLayout';
import DonutChart from '../../components/user/DonutChart';

const ManagementDashboardPage = () => {
    const [stats, setStats] = useState({
        givenCount: 0,
        receivedCount: 0,
        averageScore: '0.0',
        pendingFeedback: 0,
        completionRate: 0
    });
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5001/api/feedback/dashboard', {
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

    return (
        <ManagementLayout title="Dashboard">
            {/* Welcome */}
            <div className="mb-8">
                <h2 className="text-2xl font-normal text-gray-800">
                    Welcome back, {user.name || 'Management'} !
                </h2>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Feedback Given</p>
                    <p className="text-3xl font-bold text-[#8b5cf6]">
                        {loading ? '...' : stats.givenCount}
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Feedback Received</p>
                    <p className="text-3xl font-bold text-[#1e1b4b]">
                        {loading ? '...' : stats.receivedCount}
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Average Score</p>
                    <p className="text-3xl font-bold text-green-500">
                        {loading ? '...' : stats.averageScore}
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Pending Feedback</p>
                    <p className="text-3xl font-bold text-orange-500">
                        {loading ? '...' : stats.pendingFeedback}
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-[#1e1b4b] mb-6">Completion Rate</h3>
                <div className="flex justify-center">
                    <DonutChart
                        percentage={loading ? 0 : stats.completionRate}
                        label="Completed"
                    />
                </div>
            </div>
        </ManagementLayout>
    );
};

export default ManagementDashboardPage;
