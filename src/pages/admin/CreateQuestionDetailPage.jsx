import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import BlankQuestionCard from '../../components/admin/CreateQuestion/BlankQuestionCard';
import QuestionPreviewCard from '../../components/admin/CreateQuestion/QuestionPreviewCard';

const CreateQuestionDetailPage = () => {
    const questions = Array(10).fill(null).map((_, idx) => ({
        title: `Question Mentor to Mentor Batch ${9 - idx}`,
        date: '29 Sept 2025'
    }));

    return (
        <AdminLayout title="Create Question">
            <div className="mb-8">
                <a href="/admin/create-question" className="inline-flex items-center gap-2 text-gray-700 hover:text-[#1e1b4b] transition-colors mb-6 font-normal">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    start a new question
                </a>

                <div className="mt-4">
                    <BlankQuestionCard onClick={() => console.log('Create blank')} />
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-[#1e1b4b] font-normal mb-6">latest questions</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4">
                    {questions.map((q, idx) => (
                        <QuestionPreviewCard
                            key={idx}
                            title={q.title}
                            date={q.date}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreateQuestionDetailPage;
