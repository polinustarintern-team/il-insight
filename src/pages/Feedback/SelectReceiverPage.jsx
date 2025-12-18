import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import ManagementLayout from '../../layouts/ManagementLayout';

const SelectReceiverPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const formType = searchParams.get('type') || 'mentor_to_mentor';

    const [receivers, setReceivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusSummary, setStatusSummary] = useState({
        totalReceivers: 0,
        completedReceivers: 0,
        pendingReceivers: 0
    });

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isManagement = user.role === 'manajemen';

    useEffect(() => {
        fetchReceivers();
        fetchStatus();
    }, [formType]);

    const fetchReceivers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5001/api/feedback/receivers?formType=${formType}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setReceivers(data.receivers || []);
            }
        } catch (error) {
            console.error('Error fetching receivers:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5001/api/feedback/status?formType=${formType}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setStatusSummary(data);
            }
        } catch (error) {
            console.error('Error fetching status:', error);
        }
    };

    const handleSelectReceiver = (receiverId) => {
        navigate(`/feedback/form?type=${formType}&receiverId=${receiverId}`);
    };

    const getBackPath = () => {
        if (isManagement) return '/management/feedback';
        return '/user/feedback';
    };

    const getFormTypeLabel = () => {
        switch (formType) {
            case 'mentor_to_mentor': return 'Mentor to Mentor';
            case 'mentor_to_management': return 'Mentor to Management';
            case 'management_to_mentor': return 'Management to Mentor';
            case 'management_to_management': return 'Management to Management';
            default: return 'Feedback';
        }
    };

    const filteredReceivers = receivers.filter(r =>
        r.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.division?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const Layout = isManagement ? ManagementLayout : UserLayout;

    return (
        <Layout title="Select Receiver">
            <div className="mb-6">
                <button
                    onClick={() => navigate(getBackPath())}
                    className="flex items-center gap-2 text-[#1e1b4b] font-medium hover:underline"
                >
                    <span className="text-xl">‹</span>
                    <span>Back to Feedback</span>
                </button>
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#1e1b4b] mb-2">{getFormTypeLabel()}</h2>
                    <p className="text-gray-500">Pilih siapa yang akan Anda berikan feedback</p>
                </div>

                {/* Status Summary */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-[#8b5cf6]">{statusSummary.completedReceivers}</p>
                        <p className="text-sm text-gray-500">Sudah Diberikan</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-orange-500">{statusSummary.pendingReceivers}</p>
                        <p className="text-sm text-gray-500">Belum Diberikan</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-[#1e1b4b]">{statusSummary.totalReceivers}</p>
                        <p className="text-sm text-gray-500">Total</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Cari berdasarkan nama atau divisi..."
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 pl-12 text-gray-700 outline-none focus:border-[#8b5cf6] shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Receivers List */}
                <div className="space-y-3">
                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading...</div>
                    ) : filteredReceivers.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                            <p className="text-gray-500">Tidak ada penerima yang ditemukan</p>
                        </div>
                    ) : (
                        filteredReceivers.map((receiver) => (
                            <div
                                key={receiver.id}
                                className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${receiver.feedbackGiven
                                        ? 'border-green-200 bg-green-50/50'
                                        : 'border-gray-100 hover:border-[#8b5cf6] hover:shadow-md cursor-pointer'
                                    }`}
                                onClick={() => !receiver.feedbackGiven && handleSelectReceiver(receiver.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] flex items-center justify-center text-white font-bold text-lg">
                                            {receiver.name?.charAt(0).toUpperCase() || '?'}
                                        </div>

                                        {/* Info */}
                                        <div>
                                            <h3 className="font-bold text-[#1e1b4b]">{receiver.name}</h3>
                                            <p className="text-sm text-gray-500">{receiver.division || receiver.position || '-'}</p>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="flex items-center gap-3">
                                        {receiver.feedbackGiven ? (
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                                                    ✓ Sudah Diberikan
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {receiver.lastFeedbackDate && new Date(receiver.lastFeedbackDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                                                    Belum Diberikan
                                                </span>
                                                <button className="bg-[#8b5cf6] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#7c3aed] transition-colors">
                                                    Beri Feedback
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SelectReceiverPage;
