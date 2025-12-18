import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import QuestionTypeCard from '../../components/admin/CreateQuestion/QuestionTypeCard';

const CreateQuestionPage = () => {
    const navigate = useNavigate();

    const handleSelect = (type) => {
        navigate(`/admin/create-question/edit?type=${type}`);
    };

    const options = [
        {
            from: { type: 'mentor', label: 'Mentor' },
            to: { type: 'mentor', label: 'Mentor' },
            description: 'Create Question Mentor Feedback',
            formType: 'mentor_to_mentor'
        },
        {
            from: { type: 'management', label: 'Management' },
            to: { type: 'management', label: 'Management' },
            description: 'Create Question Management feedback',
            formType: 'management_to_management'
        },
        {
            from: { type: 'management', label: 'Management' },
            to: { type: 'mentor', label: 'Mentor' },
            description: 'Create Question Management Feedback to Mentor',
            formType: 'management_to_mentor'
        },
        {
            from: { type: 'mentor', label: 'Mentor' },
            to: { type: 'management', label: 'Management' },
            description: 'Create Question Mentor Feedback to Management',
            formType: 'mentor_to_management'
        }
    ];

    return (
        <AdminLayout title="Create Question">
            <div className="mb-8">
                <h2 className="text-xl text-[#1e1b4b] font-normal">Let's start creating a form</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                {options.map((option, idx) => (
                    <QuestionTypeCard
                        key={idx}
                        from={option.from}
                        to={option.to}
                        description={option.description}
                        onSelect={() => handleSelect(option.formType)}
                    />
                ))}
            </div>
        </AdminLayout>
    );
};

export default CreateQuestionPage;
