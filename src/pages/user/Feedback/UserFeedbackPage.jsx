import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../../layouts/UserLayout';
import FeedbackCategoryCard from '../../../components/user/Feedback/FeedbackCategoryCard';

const UserFeedbackPage = () => {
    const navigate = useNavigate();
    const [formCounts, setFormCounts] = useState({});

    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = storedUser.role || 'mentor';
    const isMentor = userRole === 'mentor';
    const isManagement = userRole === 'manajemen';

    // Fetch available forms count
    useEffect(() => {
        const fetchFormCounts = async () => {
            try {
                const token = localStorage.getItem('token');
                const types = ['mentor_to_mentor', 'mentor_to_management', 'management_to_mentor', 'management_to_management'];

                const counts = {};
                for (const type of types) {
                    const response = await fetch(`http://localhost:5001/api/forms/type/${type}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        counts[type] = data.forms?.length || 0;
                    }
                }
                setFormCounts(counts);
            } catch (error) {
                console.error('Error fetching form counts:', error);
            }
        };

        fetchFormCounts();
    }, []);

    // Navigate to receiver selection page
    const handleCardClick = (formType) => {
        if (formCounts[formType] > 0) {
            navigate(`/feedback/select?type=${formType}`);
        }
    };

    return (
        <UserLayout title="Feedback">
            <div className="mb-8 text-center max-w-3xl mx-auto">
                <p className="text-gray-600 text-lg">
                    Share your feedback and see how AI helps us learn and improve from every response!
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Role Anda: <span className="font-semibold capitalize">{userRole}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Mentor to Mentor - Only for Mentors */}
                <FeedbackCategoryCard
                    title="Mentor to Mentor"
                    description={
                        isMentor
                            ? (formCounts['mentor_to_mentor'] > 0
                                ? `${formCounts['mentor_to_mentor']} form(s) available`
                                : "No forms available yet")
                            : "Hanya untuk role Mentor"
                    }
                    isDark={isMentor}
                    onClick={isMentor ? () => handleCardClick('mentor_to_mentor') : undefined}
                    disabled={!isMentor || formCounts['mentor_to_mentor'] === 0}
                />

                {/* Mentor to Management - Only for Mentors */}
                <FeedbackCategoryCard
                    title="Mentor to Management"
                    description={
                        isMentor
                            ? (formCounts['mentor_to_management'] > 0
                                ? `${formCounts['mentor_to_management']} form(s) available`
                                : "No forms available yet")
                            : "Hanya untuk role Mentor"
                    }
                    isDark={isMentor}
                    onClick={isMentor ? () => handleCardClick('mentor_to_management') : undefined}
                    disabled={!isMentor || formCounts['mentor_to_management'] === 0}
                />

                {/* Management to Management - Only for Management */}
                <FeedbackCategoryCard
                    title="Management to Management"
                    description={
                        isManagement
                            ? (formCounts['management_to_management'] > 0
                                ? `${formCounts['management_to_management']} form(s) available`
                                : "No forms available yet")
                            : "Hanya untuk role Management"
                    }
                    isDark={isManagement}
                    onClick={isManagement ? () => handleCardClick('management_to_management') : undefined}
                    disabled={!isManagement || formCounts['management_to_management'] === 0}
                />

                {/* Management to Mentor - Only for Management */}
                <FeedbackCategoryCard
                    title="Management to Mentor"
                    description={
                        isManagement
                            ? (formCounts['management_to_mentor'] > 0
                                ? `${formCounts['management_to_mentor']} form(s) available`
                                : "No forms available yet")
                            : "Hanya untuk role Management"
                    }
                    isDark={isManagement}
                    onClick={isManagement ? () => handleCardClick('management_to_mentor') : undefined}
                    disabled={!isManagement || formCounts['management_to_mentor'] === 0}
                />
            </div>
        </UserLayout>
    );
};

export default UserFeedbackPage;
