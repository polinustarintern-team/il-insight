import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import QuestionTypeCard from '../../components/admin/CreateQuestion/QuestionTypeCard';

const CreateQuestionPage = () => {
    const handleSelect = (type) => {
        console.log('Selected type:', type);
        // Navigate or open modal
    };

    const options = [
        {
            from: { type: 'mentor', label: 'Mentor' },
            to: { type: 'mentor', label: 'Mentor' },
            description: 'Create Question Mentor Feedback'
        },
        {
            from: { type: 'management', label: 'Management' },
            to: { type: 'management', label: 'Management' },
            description: 'Create Question Management feedback'
        },
        {
            from: { type: 'management', label: 'Management' },
            to: { type: 'mentor', label: 'Mentor' },
            description: 'Create Question Management Feedback to Mentor'
        },
        {
            from: { type: 'mentor', label: 'Mentor' },
            to: { type: 'management', label: 'Management' },
            description: 'Create Question Mentor Feedback to Management'
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
                        onSelect={() => handleSelect(idx)}
                    />
                ))}
            </div>
        </AdminLayout>
    );
};

export default CreateQuestionPage;
