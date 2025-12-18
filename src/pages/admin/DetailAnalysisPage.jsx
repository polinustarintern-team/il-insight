import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';

const DetailAnalysisPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserDetail();
    }, [userId]);

    const fetchUserDetail = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5001/api/admin/user/${userId}/detail`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                console.error('Failed to fetch user detail');
            }
        } catch (error) {
            console.error('Error fetching user detail:', error);
        } finally {
            setLoading(false);
        }
    };

    // Category icons and colors
    const getCategoryStyle = (category) => {
        const styles = {
            'Communication': { icon: '💬', bgColor: 'bg-purple-100', iconBg: 'bg-purple-500' },
            'Teamwork': { icon: '👥', bgColor: 'bg-blue-100', iconBg: 'bg-blue-500' },
            'Responsibility': { icon: '🛡️', bgColor: 'bg-green-100', iconBg: 'bg-green-500' },
            'Initiative': { icon: '💡', bgColor: 'bg-orange-100', iconBg: 'bg-orange-500' },
        };
        return styles[category] || { icon: '📊', bgColor: 'bg-gray-100', iconBg: 'bg-gray-500' };
    };

    if (loading) {
        return (
            <AdminLayout title="Detail analysis">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8b5cf6] border-t-transparent"></div>
                </div>
            </AdminLayout>
        );
    }

    if (!userData) {
        return (
            <AdminLayout title="Detail analysis">
                <div className="text-center py-12">
                    <h3 className="text-xl font-bold text-[#1e1b4b] mb-2">User tidak ditemukan</h3>
                    <button
                        onClick={() => navigate('/admin/summary')}
                        className="text-[#8b5cf6] hover:underline"
                    >
                        Kembali ke Summary
                    </button>
                </div>
            </AdminLayout>
        );
    }

    const { user, scores, averageScore, totalFeedback } = userData;

    return (
        <AdminLayout title="Detail analysis">
            {/* Back Button */}
            <div className="mb-8">
                <a href="/admin/summary" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1e1b4b] transition-colors mb-6 font-medium">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Detail analysis
                </a>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-[#1e1b4b]">
                        {user.role === 'mentor' ? 'Mentor' : 'Management'} - {user.name}
                    </h1>

                    {/* PDF Icon */}
                    <button className="text-[#1e1b4b] hover:text-black">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </button>
                </div>

                {/* Score Card */}
                {scores.length > 0 ? (
                    <div className="bg-[#110e2d] rounded-3xl p-8 text-white">
                        <h3 className="text-center text-lg mb-6">Feedback Summary</h3>

                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            {/* Category Scores */}
                            <div className="flex-1 space-y-4">
                                {scores.map((score, idx) => {
                                    const style = getCategoryStyle(score.category);
                                    return (
                                        <div key={idx} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 ${style.iconBg} rounded-xl flex items-center justify-center text-white`}>
                                                    {style.icon}
                                                </div>
                                                <span>{score.category}</span>
                                            </div>
                                            <span className="font-bold">{score.value}/5.0</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Average Score */}
                            <div className="text-center px-8">
                                <p className="text-sm text-purple-300 mb-2">AVERAGE SCORE</p>
                                <p className="text-6xl font-bold">{averageScore}</p>
                                <p className="text-sm text-gray-400 mt-2">{totalFeedback} feedback received</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#110e2d] rounded-3xl p-8 text-white text-center">
                        <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-4xl">📭</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Belum Ada Feedback</h3>
                        <p className="text-gray-400">
                            User ini belum menerima feedback dari rekan.
                        </p>
                    </div>
                )}

                {/* User Info */}
                <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-bold text-[#1e1b4b] mb-4">Informasi User</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Nama</p>
                            <p className="font-medium">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="font-medium capitalize">{user.role}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Division</p>
                            <p className="font-medium">{user.division || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Position</p>
                            <p className="font-medium">{user.position || '-'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DetailAnalysisPage;
