import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import ManagementLayout from '../../layouts/ManagementLayout';

const FeedbackFormPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const formType = searchParams.get('type') || 'mentor_to_mentor';
    const receiverId = searchParams.get('receiverId');

    const [form, setForm] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [receiver, setReceiver] = useState(null);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isManagement = user.role === 'manajemen';

    useEffect(() => {
        fetchForm();
        if (receiverId) {
            fetchReceiver();
        }
    }, [formType, receiverId]);

    const fetchForm = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5001/api/forms/type/${formType}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.forms && data.forms.length > 0) {
                    const latestForm = data.forms[0];
                    setForm(latestForm);
                    setQuestions(latestForm.questions || []);

                    // Initialize answers
                    const initialAnswers = {};
                    latestForm.questions?.forEach(q => {
                        initialAnswers[q.id] = '';
                    });
                    setAnswers(initialAnswers);
                }
            }
        } catch (error) {
            console.error('Error fetching form:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReceiver = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5001/api/users/${receiverId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setReceiver(data.user);
            }
        } catch (error) {
            console.error('Error fetching receiver:', error);
        }
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5001/api/feedback/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    formId: form?.id,
                    receiverId: receiverId || null,
                    answers
                })
            });

            if (response.ok) {
                // Redirect back to receiver selection page with success message
                navigate(`/feedback/select?type=${formType}&success=true`);
            } else {
                const data = await response.json();
                alert(data.message || 'Gagal mengirim feedback');
                setSubmitting(false);
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Terjadi kesalahan saat mengirim feedback');
            setSubmitting(false);
        }
    };

    const getBackPath = () => {
        if (receiverId) {
            return `/feedback/select?type=${formType}`;
        }
        if (isManagement) return '/management/feedback';
        return '/user/feedback';
    };

    const getFormTypeLabel = () => {
        switch (formType) {
            case 'mentor_to_mentor': return 'Mentor to Mentor Feedback';
            case 'mentor_to_management': return 'Mentor to Management Feedback';
            case 'management_to_mentor': return 'Management to Mentor Feedback';
            case 'management_to_management': return 'Management to Management Feedback';
            default: return 'Feedback';
        }
    };

    const Layout = isManagement ? ManagementLayout : UserLayout;

    const renderQuestion = (question, index) => {
        const questionNumber = index + 1;

        if (question.type === 'multiple_choice' && question.options?.length > 0) {
            return (
                <div key={question.id} className="space-y-3">
                    <label className="block text-gray-700 font-semibold">
                        {questionNumber}. {question.text}
                        {question.is_required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="space-y-2">
                        {question.options.map((option, optIdx) => (
                            <label key={optIdx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                                <input
                                    type="radio"
                                    name={`question_${question.id}`}
                                    value={option}
                                    checked={answers[question.id] === option}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                    className="w-4 h-4 text-[#8b5cf6]"
                                    required={question.is_required}
                                />
                                <span className="text-gray-700">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            );
        }

        if (question.type === 'rating') {
            return (
                <div key={question.id} className="space-y-3">
                    <label className="text-left block text-gray-700 font-semibold">
                        {questionNumber}. {question.text}
                        {question.is_required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(rating => (
                            <button
                                key={rating}
                                type="button"
                                onClick={() => handleAnswerChange(question.id, rating.toString())}
                                className={`w-12 h-12 rounded-full font-bold transition-colors ${answers[question.id] === rating.toString()
                                    ? 'bg-[#8b5cf6] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {rating}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        // Default: text/essay
        return (
            <div key={question.id} className="space-y-3">
                <label className="block text-gray-700 font-semibold">
                    {questionNumber}. {question.text}
                    {question.is_required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                    className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#8b5cf6] focus:ring-0 transition-colors resize-none h-32"
                    placeholder="Type your answer here..."
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    required={question.is_required}
                />
            </div>
        );
    };

    return (
        <Layout title="Feedback">
            <div className="mb-6">
                <button
                    onClick={() => navigate(getBackPath())}
                    className="flex items-center gap-2 text-[#1e1b4b] font-medium hover:underline"
                >
                    <span className="text-xl">‹</span>
                    <span>Back</span>
                </button>
            </div>

            <div className="max-w-3xl mx-auto">
                {/* Receiver Info Card */}
                {receiver && (
                    <div className="bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-2xl p-6 mb-6 text-white">
                        <p className="text-sm opacity-75 mb-1">Memberikan feedback kepada:</p>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                                {receiver.name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{receiver.name}</h3>
                                <p className="opacity-75">{receiver.division || receiver.position || '-'}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading...</div>
                    ) : !form ? (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-bold text-[#1e1b4b] mb-4">No Form Available</h3>
                            <p className="text-gray-500">Admin belum membuat form untuk kategori ini.</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-[#1e1b4b] mb-2">{form.title || getFormTypeLabel()}</h2>
                            <p className="text-gray-500 mb-8">{form.description || 'Please provide honest feedback.'}</p>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {questions.map((question, idx) => renderQuestion(question, idx))}

                                {questions.length > 0 && (
                                    <div className="pt-4 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="bg-[#1e1b4b] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2e1065] transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                                        >
                                            {submitting ? 'Submitting...' : 'Submit Feedback'}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default FeedbackFormPage;
