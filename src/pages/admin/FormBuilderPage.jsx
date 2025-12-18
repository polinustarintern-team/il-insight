import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import FormHeader from '../../components/admin/FormBuilder/FormHeader';
import QuestionCard from '../../components/admin/FormBuilder/QuestionCard';
import FloatingToolbar from '../../components/admin/FormBuilder/FloatingToolbar';

const FormBuilderPage = () => {
    const [title, setTitle] = useState('Untitled Form');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([
        { id: Date.now(), type: 'multiple_choice', text: 'Question 1', required: false, options: ['Option 1'] }
    ]);

    // Handle Header Changes
    const handleHeaderChange = (field, value) => {
        if (field === 'title') setTitle(value);
        if (field === 'description') setDescription(value);
    };

    // Add New Question
    const addQuestion = () => {
        const newQuestion = {
            id: Date.now(),
            type: 'multiple_choice',
            text: '',
            required: false,
            options: ['Option 1']
        };
        setQuestions([...questions, newQuestion]);
    };

    // Update Question Data
    const updateQuestion = (id, field, value) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ));
    };

    // Delete Question
    const deleteQuestion = (id) => {
        if (questions.length === 1) return; // Prevent deleting last
        setQuestions(questions.filter(q => q.id !== id));
    };

    // Duplicate Question
    const duplicateQuestion = (id) => {
        const questionToDuplicate = questions.find(q => q.id === id);
        const newQuestion = {
            ...questionToDuplicate,
            id: Date.now(),
        };
        const idx = questions.findIndex(q => q.id === id);
        const newQuestions = [...questions];
        newQuestions.splice(idx + 1, 0, newQuestion);
        setQuestions(newQuestions);
    };

    // Toggle Required
    const toggleRequired = (id) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, required: !q.required } : q
        ));
    };

    // Publish (Simulate Backend Send)
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handlePublish = () => {
        const payload = {
            title,
            description,
            questions
        };
        console.log('Publishing Form to Backend:', JSON.stringify(payload, null, 2));
        setShowSuccessModal(true);
        // TODO: apiRequest('/forms', 'POST', payload);
    };

    return (
        <AdminLayout title="Form Builder">
            <div className="flex justify-between items-center mb-6">
                <a href="/admin/create-question/form" className="text-gray-500 hover:text-[#1e1b4b] flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back to questions
                </a>
                <button
                    onClick={handlePublish}
                    className="bg-[#1e1b4b] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2e1065] transition-colors"
                >
                    Publish
                </button>
            </div>

            <div className="flex justify-center pb-20">
                <div className="w-full max-w-3xl relative">
                    <FormHeader
                        title={title}
                        description={description}
                        onChange={handleHeaderChange}
                    />

                    {questions.map((question) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            onChange={updateQuestion}
                            onDelete={deleteQuestion}
                            onDuplicate={duplicateQuestion}
                            onRequireToggle={toggleRequired}
                        />
                    ))}

                    {/* Floating Toolbar positioned relative to the list on desktop */}
                    <div className="hidden md:block absolute -right-16 top-10 h-full">
                        <FloatingToolbar onAdd={addQuestion} />
                    </div>
                </div>
            </div>

            {/* Mobile floating action button */}
            <button
                className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#8b5cf6] text-white rounded-full shadow-lg flex items-center justify-center z-50 text-3xl"
                onClick={addQuestion}
            >
                +
            </button>

            {/* Custom Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all scale-100">
                        <div className="flex flex-col items-center text-center">
                            {/* Success Icon */}
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-[#1e1b4b] mb-2">
                                Published Successfully!
                            </h3>
                            <p className="text-gray-500 mb-8">
                                Your form has been created and is ready to use.
                            </p>

                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="w-full bg-[#1e1b4b] text-white font-semibold py-3.5 rounded-xl hover:bg-[#2e1065] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-500/20"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default FormBuilderPage;
