import React from 'react';
import UserLayout from '../../../layouts/UserLayout';
import StatCard from '../../../components/user/Summary/StatCard';
import AIReflectionCard from '../../../components/user/Summary/AIReflectionCard';
import RecentFeedbackList from '../../../components/user/Summary/RecentFeedbackList';

const UserSummaryPage = () => {
    return (
        <UserLayout title="Summary">
            <div className="mb-8">
                <h2 className="text-xl text-[#311b92] font-normal">Here's your feedback summary!</h2>
            </div>

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={<span className="text-2xl">😡</span>}
                    label="Insight"
                    count="12"
                />
                <StatCard
                    icon={<span className="text-2xl">😄</span>}
                    label="Positive"
                    count="6"
                />
                <StatCard
                    icon={<span className="text-2xl">☹️</span>}
                    label="Negative"
                    count="5"
                />
                <StatCard
                    icon={<span className="text-2xl">😐</span>}
                    label="Neutral"
                    count="1"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Reflection - Takes up 2 columns */}
                <div className="lg:col-span-2">
                    <AIReflectionCard />
                </div>

                {/* Recent Feedback List - Takes up 1 column */}
                <div>
                    <RecentFeedbackList />
                </div>
            </div>
        </UserLayout>
    );
};

export default UserSummaryPage;
