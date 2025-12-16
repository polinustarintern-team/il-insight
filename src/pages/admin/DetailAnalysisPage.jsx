import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import BatchCard from '../../components/admin/Summary/BatchCard';

const DetailAnalysisPage = () => {
    // Mock Data
    const batches = [
        {
            name: 'Batch 9',
            averageScore: '4.9',
            scores: [
                { category: 'Communication', value: '5.0' },
                { category: 'Teamwork', value: '4.9' },
                { category: 'Responsibility', value: '4.8' },
                { category: 'Initiative', value: '5.0' }, // Typo 'Initiaitve' in design, corrected here
            ]
        },
        {
            name: 'Batch 8',
            averageScore: '3.1',
            scores: [
                { category: 'Communication', value: '5.0' },
                { category: 'Teamwork', value: '4.9' },
                { category: 'Responsibility', value: '4.8' },
            ]
        }
    ];

    return (
        <AdminLayout title="Detail analysis">
            {/* Custom Header Section overridden or added to layout */}
            <div className="mb-8">
                <a href="/admin/summary" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1e1b4b] transition-colors mb-6 font-medium">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Detail analysis
                </a>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-[#1e1b4b]">Mentor - Reza Kurniawan</h1>

                    {/* PDF Icon Placeholder */}
                    <button className="text-[#1e1b4b] hover:text-black">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </button>
                </div>

                {/* Batch Cards */}
                <div>
                    {batches.map((batch, idx) => (
                        <BatchCard
                            key={idx}
                            batchName={batch.name}
                            scores={batch.scores}
                            averageScore={batch.averageScore}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default DetailAnalysisPage;
