import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagementLayout from '../../layouts/ManagementLayout';
import FeedbackCategoryCard from '../../components/user/Feedback/FeedbackCategoryCard';

const ManagementFeedbackPage = () => {
    const navigate = useNavigate();
    const [formCounts, setFormCounts] = useState({});

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
        <ManagementLayout title="Feedback">
            <div className="mb-8 text-center max-w-3xl mx-auto">
                <p className="text-gray-600 text-lg">
                    Share your feedback and see how AI helps us learn and improve from every response!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Management to Management */}
                <FeedbackCategoryCard
                    title="Management to Management"
                    description={formCounts['management_to_management'] > 0 ? `${formCounts['management_to_management']} form(s) available` : "No forms available yet"}
                    isDark={true}
                    onClick={() => handleCardClick('management_to_management')}
                    disabled={formCounts['management_to_management'] === 0}
                />

                {/* Management to Mentor */}
                <FeedbackCategoryCard
                    title="Management to Mentor"
                    description={formCounts['management_to_mentor'] > 0 ? `${formCounts['management_to_mentor']} form(s) available` : "No forms available yet"}
                    isDark={true}
                    onClick={() => handleCardClick('management_to_mentor')}
                    disabled={formCounts['management_to_mentor'] === 0}
                />

                {/* Mentor to Mentor - Not for management */}
                <FeedbackCategoryCard
                    title="Mentor to Mentor"
                    description="Hanya untuk role Mentor"
                    isDark={false}
                    disabled={true}
                />

                {/* Mentor to Management - Not for management */}
                <FeedbackCategoryCard
                    title="Mentor to Management"
                    description="Hanya untuk role Mentor"
                    isDark={false}
                    disabled={true}
                />
            </div>
        </ManagementLayout>
    );
};

export default ManagementFeedbackPage;
