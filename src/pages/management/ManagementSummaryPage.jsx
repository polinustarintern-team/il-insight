import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagementLayout from '../../layouts/ManagementLayout';

const ManagementSummaryPage = () => {
    const navigate = useNavigate();
    const [summaryData, setSummaryData] = useState({
        feedbackReceived: [],
        scoresByCategory: [],
        aiReflections: [],
        totalFeedback: 0
    });
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5001/api/feedback/summary', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setSummaryData(data);
                }
            } catch (error) {
                console.error('Error fetching summary:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    // Calculate average score from API or fallback
    const getAverageScore = () => {
        return summaryData.averageScore || '0.0';
    };

    // Map category scores from API with icons and colors
    const getCategoryIcon = (category) => {
        const icons = {
            'Communication': '💬',
            'Teamwork': '👥',
            'Responsibility': '🛡️',
            'Initiative': '💡'
        };
        return icons[category] || '📊';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Communication': 'from-purple-500 to-violet-600',
            'Teamwork': 'from-blue-500 to-cyan-600',
            'Responsibility': 'from-green-500 to-emerald-600',
            'Initiative': 'from-orange-500 to-amber-600'
        };
        return colors[category] || 'from-gray-500 to-gray-600';
    };

    // Use API data for category scores, with defaults if empty
    const categoryScores = summaryData.scoresByCategory?.length > 0
        ? summaryData.scoresByCategory.map(cat => ({
            name: cat.category,
            score: parseFloat(cat.avg_score) || 0,
            icon: getCategoryIcon(cat.category),
            color: getCategoryColor(cat.category),
            count: cat.feedback_count
        }))
        : [
            { name: 'Communication', score: 0, icon: '💬', color: 'from-purple-500 to-violet-600' },
            { name: 'Teamwork', score: 0, icon: '👥', color: 'from-blue-500 to-cyan-600' },
            { name: 'Responsibility', score: 0, icon: '🛡️', color: 'from-green-500 to-emerald-600' },
            { name: 'Initiative', score: 0, icon: '💡', color: 'from-orange-500 to-amber-600' },
        ];

    const latestReflection = summaryData.aiReflections?.[0];

    if (loading) {
        return (
            <ManagementLayout title="Summary">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8b5cf6] border-t-transparent"></div>
                </div>
            </ManagementLayout>
        );
    }

    return (
        <ManagementLayout title="Summary">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#1e1b4b] to-[#312e81] rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">Hi, {user.name || 'Management'}! 👋</h2>
                    <p className="opacity-75 mb-6">Berikut adalah ringkasan feedback yang Anda terima dari rekan-rekan Anda.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                            <p className="text-3xl font-bold">{summaryData.totalFeedback}</p>
                            <p className="text-sm opacity-75">Total Feedback</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                            <p className="text-3xl font-bold">{getAverageScore()}</p>
                            <p className="text-sm opacity-75">Avg Score</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                            <p className="text-3xl font-bold">4</p>
                            <p className="text-sm opacity-75">Kategori</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                            <p className="text-3xl font-bold">{summaryData.aiReflections?.length || 0}</p>
                            <p className="text-sm opacity-75">AI Insights</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Scores */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-[#1e1b4b] mb-4">📊 Skor per Kategori</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categoryScores.map((cat, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl">{cat.icon}</span>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${cat.color}`}>
                                    {cat.score}/5.0
                                </div>
                            </div>
                            <h4 className="font-semibold text-[#1e1b4b] mb-2">{cat.name}</h4>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full bg-gradient-to-r ${cat.color}`}
                                    style={{ width: `${(cat.score / 5) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Reflection Card */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-[#1e1b4b] mb-4">🤖 AI Insight</h3>
                <div className="bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10">
                        {latestReflection ? (
                            <>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                                        {latestReflection.form_title || 'Latest Analysis'}
                                    </span>
                                    {latestReflection.sentiment && (
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${latestReflection.sentiment === 'positive' ? 'bg-green-400/30' :
                                            latestReflection.sentiment === 'negative' ? 'bg-red-400/30' : 'bg-yellow-400/30'
                                            }`}>
                                            {latestReflection.sentiment}
                                        </span>
                                    )}
                                </div>
                                <p className="text-lg leading-relaxed mb-4">
                                    {latestReflection.summary || 'AI sedang menganalisis feedback Anda. Insight akan segera tersedia.'}
                                </p>
                                {latestReflection.overall_score && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm opacity-75">Overall Score:</span>
                                        <span className="text-2xl font-bold">{latestReflection.overall_score}/5</span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-lg mb-2">✨ Kumpulkan lebih banyak feedback!</p>
                                <p className="text-sm opacity-75">AI akan memberikan insight setelah Anda menerima feedback dari rekan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Strengths & Areas for Improvement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-xl">💪</span>
                        </div>
                        <h4 className="font-bold text-[#1e1b4b]">Kekuatan Anda</h4>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm flex-shrink-0">✓</span>
                            <span className="text-gray-600">Kemampuan komunikasi yang sangat baik</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm flex-shrink-0">✓</span>
                            <span className="text-gray-600">Proaktif dalam mengambil inisiatif</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm flex-shrink-0">✓</span>
                            <span className="text-gray-600">Konsisten dalam menyelesaikan tugas</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <span className="text-xl">🎯</span>
                        </div>
                        <h4 className="font-bold text-[#1e1b4b]">Area Pengembangan</h4>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm flex-shrink-0">→</span>
                            <span className="text-gray-600">Tingkatkan kemampuan mendengarkan aktif</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm flex-shrink-0">→</span>
                            <span className="text-gray-600">Lebih sering berbagi pengetahuan dengan tim</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm flex-shrink-0">→</span>
                            <span className="text-gray-600">Eksplorasi solusi kreatif lebih lanjut</span>
                        </li>
                    </ul>
                </div>
            </div>
        </ManagementLayout>
    );
};

export default ManagementSummaryPage;
