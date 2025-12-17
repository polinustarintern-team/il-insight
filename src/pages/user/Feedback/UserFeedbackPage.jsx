import React from 'react';
import UserLayout from '../../../layouts/UserLayout';
import FeedbackCategoryCard from '../../../components/user/Feedback/FeedbackCategoryCard';

const UserFeedbackPage = ({ role = 'Mentor' }) => {
    // Determine user info and card styles based on role
    const user = role === 'Management'
        ? { name: 'Dewi', role: 'Management' }
        : { name: 'Walid', role: 'Mentor' };

    // Card Highlighting Logic
    // If Mentor: Mentor cards are Dark, Management cards are Light
    // If Management: Management cards are Dark, Mentor cards are Light

    // Specifically:
    // Mentor View:
    // - Management to Management: Light
    // - Mentor to Mentor: Dark
    // - Management to Mentor: Light
    // - Mentor to Management: Dark

    // Management View (from image):
    // - Management to Management: Dark
    // - Mentor to Mentor: Light/Grey
    // - Management to Mentor: Dark
    // - Mentor to Management: Light/Grey

    const isManagementRole = role === 'Management';

    return (
        <UserLayout title="Feedback" user={user}>
            <div className="mb-8 text-center max-w-3xl mx-auto">
                <p className="text-gray-600 text-lg">
                    Share your feedback and see how AI helps us learn and improve from every response!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Management to Management */}
                <FeedbackCategoryCard
                    title="Management to Management"
                    description="Management feedback question"
                    isDark={isManagementRole}
                />

                {/* Mentor to Mentor */}
                <FeedbackCategoryCard
                    title="Mentor to Mentor"
                    description="Mentor Feedback Question"
                    isDark={!isManagementRole}
                />

                {/* Management to Mentor */}
                <FeedbackCategoryCard
                    title="Management to Mentor"
                    description="Management Feedback Question to Mentor"
                    isDark={isManagementRole}
                />

                {/* Mentor to Management */}
                <FeedbackCategoryCard
                    title="Mentor to Management"
                    description="Mentor Feedback Question to Management"
                    isDark={!isManagementRole}
                />
            </div>
        </UserLayout>
    );
};

export default UserFeedbackPage;
