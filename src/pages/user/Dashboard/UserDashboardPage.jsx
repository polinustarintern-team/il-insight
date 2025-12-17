import React from 'react';
import UserLayout from '../../../layouts/UserLayout';
import DonutChart from '../../../components/user/DonutChart';

const UserDashboardPage = () => {
    return (
        <UserLayout title="Dasboard">
            <div className="mb-8">
                <h2 className="text-xl text-gray-700 font-normal">Welcome to IL Insight!</h2>
            </div>

            <div className="flex justify-center mt-8">
                <DonutChart />
            </div>
        </UserLayout>
    );
};

export default UserDashboardPage;
