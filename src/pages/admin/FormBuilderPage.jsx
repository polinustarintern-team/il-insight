import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import FormHeader from '../../components/admin/FormBuilder/FormHeader';
import QuestionCard from '../../components/admin/FormBuilder/QuestionCard';
import FloatingToolbar from '../../components/admin/FormBuilder/FloatingToolbar';

// Default template questions based on 4 evaluation categories
const getDefaultQuestions = (formType) => {
    const categories = [
        {
            category: 'Communication',
            questions: [
                { text: 'Bagaimana kemampuan komunikasi verbal dalam menyampaikan ide?', type: 'rating' },
                { text: 'Seberapa baik dalam mendengarkan dan memahami pendapat orang lain?', type: 'rating' },
                { text: 'Bagaimana cara penyampaian feedback yang konstruktif?', type: 'rating' },
            ]
        },
        {
            category: 'Teamwork',
            questions: [
                { text: 'Seberapa baik dalam berkolaborasi dengan tim?', type: 'rating' },
                { text: 'Bagaimana kontribusi dalam diskusi kelompok?', type: 'rating' },
                { text: 'Seberapa baik dalam membantu rekan yang kesulitan?', type: 'rating' },
            ]
        },
        {
            category: 'Responsibility',
            questions: [
                { text: 'Seberapa konsisten dalam menyelesaikan tugas tepat waktu?', type: 'rating' },
                { text: 'Bagaimana tingkat komitmen terhadap pekerjaan?', type: 'rating' },
                { text: 'Seberapa baik dalam mengambil tanggung jawab atas kesalahan?', type: 'rating' },
            ]
        },
        {
            category: 'Initiative',
            questions: [
                { text: 'Seberapa proaktif dalam mengambil inisiatif?', type: 'rating' },
                { text: 'Bagaimana kemampuan dalam memberikan solusi kreatif?', type: 'rating' },
                { text: 'Seberapa baik dalam mengidentifikasi peluang perbaikan?', type: 'rating' },
            ]
        }
    ];

    // Flatten into question array with category info
    const allQuestions = [];
    let id = Date.now();

    categories.forEach(cat => {
        cat.questions.forEach((q, idx) => {
            allQuestions.push({
                id: id++,
                type: q.type,
                text: q.text,
                required: true,
                category: cat.category,
                options: q.type === 'rating' ? ['1', '2', '3', '4', '5'] : ['Option 1']
            });
        });
    });

    return allQuestions;
};

const getDefaultTitle = (formType) => {
    switch (formType) {
        case 'mentor_to_mentor': return 'Mentor to Mentor Feedback Form';
        case 'mentor_to_management': return 'Mentor to Management Feedback Form';
        case 'management_to_mentor': return 'Management to Mentor Feedback Form';
        case 'management_to_management': return 'Management to Management Feedback Form';
        default: return 'Feedback Form';
    }
};

const getDefaultDescription = (formType) => {
    switch (formType) {
        case 'mentor_to_mentor': return 'Berikan penilaian jujur untuk rekan mentor Anda dalam 4 kategori: Communication, Teamwork, Responsibility, dan Initiative.';
        case 'mentor_to_management': return 'Berikan penilaian untuk tim management dalam 4 kategori utama.';
        case 'management_to_mentor': return 'Berikan penilaian untuk mentor dalam 4 kategori utama.';
        case 'management_to_management': return 'Berikan penilaian jujur untuk rekan management Anda dalam 4 kategori: Communication, Teamwork, Responsibility, dan Initiative.';
        default: return 'Silakan isi form feedback berikut.';
    }
};

const FormBuilderPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const formType = searchParams.get('type') || 'mentor_to_mentor';

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [useTemplate, setUseTemplate] = useState(true);

    // Initialize with template on mount
    useEffect(() => {
        setTitle(getDefaultTitle(formType));
        setDescription(getDefaultDescription(formType));
        setQuestions(getDefaultQuestions(formType));
    }, [formType]);

    // Handle Header Changes
    const handleHeaderChange = (field, value) => {
        if (field === 'title') setTitle(value);
        if (field === 'description') setDescription(value);
    };

    // Add New Question
    const addQuestion = (type = 'rating') => {
        const newQuestion = {
            id: Date.now(),
            type: type,
            text: '',
            required: false,
            category: '',
            options: type === 'rating' ? ['1', '2', '3', '4', '5'] : ['Option 1']
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
        if (questions.length === 1) return;
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

    // Publish to Backend
    const handlePublish = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const payload = {
                title,
                description,
                type: formType,
                questions: questions.map(q => ({
                    text: q.text,
                    type: q.type,
                    required: q.required,
                    category: q.category || '',
                    options: q.options
                }))
            };

            const response = await fetch('http://localhost:5001/api/forms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setShowSuccessModal(true);
            } else {
                const data = await response.json();
                alert(data.message || 'Gagal menyimpan form');
            }
        } catch (error) {
            console.error('Error publishing form:', error);
            alert('Terjadi kesalahan saat menyimpan form');
        } finally {
            setIsLoading(false);
        }
    };

    const handleContinue = () => {
        setShowSuccessModal(false);
        navigate('/admin/create-question');
    };

    const getFormTypeLabel = () => {
        switch (formType) {
            case 'mentor_to_mentor': return 'Mentor → Mentor';
            case 'mentor_to_management': return 'Mentor → Management';
            case 'management_to_mentor': return 'Management → Mentor';
            case 'management_to_management': return 'Management → Management';
            default: return formType;
        }
    };

    // Group questions by category for display
    const groupedQuestions = questions.reduce((acc, q) => {
        const cat = q.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(q);
        return acc;
    }, {});

    const categoryOrder = ['Communication', 'Teamwork', 'Responsibility', 'Initiative', 'Other'];
    const sortedCategories = categoryOrder.filter(cat => groupedQuestions[cat]);

    return (
        <AdminLayout title="Form Builder">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <a href="/admin/create-question" className="text-gray-500 hover:text-[#1e1b4b] flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back
                    </a>
                    <span className="bg-[#8b5cf6] text-white text-xs px-3 py-1 rounded-full font-medium">
                        {getFormTypeLabel()}
                    </span>
                </div>
                <button
                    onClick={handlePublish}
                    disabled={isLoading}
                    className="bg-[#1e1b4b] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2e1065] transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Publishing...' : 'Publish'}
                </button>
            </div>

            <div className="flex justify-center pb-20">
                <div className="w-full max-w-3xl relative">
                    <FormHeader
                        title={title}
                        description={description}
                        onChange={handleHeaderChange}
                    />

                    {/* Category Info Banner */}
                    <div className="bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-xl p-4 mb-6 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold">Template 4 Kategori Penilaian</span>
                        </div>
                        <p className="text-sm opacity-90">
                            Form ini berisi pertanyaan dalam 4 kategori: Communication, Teamwork, Responsibility, dan Initiative.
                            Setiap pertanyaan menggunakan rating 1-5.
                        </p>
                    </div>

                    {/* Questions grouped by category */}
                    {sortedCategories.map(category => (
                        <div key={category} className="mb-8">
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category === 'Communication' ? 'bg-purple-100' :
                                        category === 'Teamwork' ? 'bg-blue-100' :
                                            category === 'Responsibility' ? 'bg-green-100' :
                                                category === 'Initiative' ? 'bg-orange-100' : 'bg-gray-100'
                                    }`}>
                                    {category === 'Communication' && (
                                        <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    )}
                                    {category === 'Teamwork' && (
                                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    )}
                                    {category === 'Responsibility' && (
                                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    )}
                                    {category === 'Initiative' && (
                                        <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-[#1e1b4b]">{category}</h3>
                                <span className="text-sm text-gray-500">({groupedQuestions[category].length} pertanyaan)</span>
                            </div>

                            {/* Questions in this category */}
                            {groupedQuestions[category].map((question) => (
                                <QuestionCard
                                    key={question.id}
                                    question={question}
                                    onChange={updateQuestion}
                                    onDelete={deleteQuestion}
                                    onDuplicate={duplicateQuestion}
                                    onRequireToggle={toggleRequired}
                                />
                            ))}
                        </div>
                    ))}

                    {/* Floating Toolbar */}
                    <div className="hidden md:block absolute -right-16 top-10 h-full">
                        <FloatingToolbar onAdd={() => addQuestion('rating')} />
                    </div>
                </div>
            </div>

            {/* Mobile floating action button */}
            <button
                className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#8b5cf6] text-white rounded-full shadow-lg flex items-center justify-center z-50 text-3xl"
                onClick={() => addQuestion('rating')}
            >
                +
            </button>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all scale-100">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-[#1e1b4b] mb-2">
                                Published Successfully!
                            </h3>
                            <p className="text-gray-500 mb-8">
                                Form dengan {questions.length} pertanyaan dalam 4 kategori berhasil disimpan.
                            </p>

                            <button
                                onClick={handleContinue}
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
