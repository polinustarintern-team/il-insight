import React from 'react';
import UserLayout from '../../../layouts/UserLayout';
import DetailQuestionCard from '../../../components/user/Summary/DetailQuestionCard';

const UserDetailQuestionPage = () => {
    return (
        <UserLayout title="Summary">
            <div className="mb-6">
                <a href="/user/summary/detail" className="flex items-center gap-2 text-[#1e1b4b] font-medium hover:underline">
                    <span className="text-xl">‹</span>
                    <span>Detail question</span>
                </a>
            </div>

            <div className="max-w-4xl mx-auto">
                <DetailQuestionCard title="Mentor to Mentor" />
                <DetailQuestionCard title="Mentor to Management" />
            </div>
        </UserLayout>
    );
};

export default UserDetailQuestionPage;
