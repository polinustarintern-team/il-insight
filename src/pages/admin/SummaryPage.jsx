import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import SummaryCard from '../../components/admin/Summary/SummaryCard';
import SummaryTable from '../../components/admin/Summary/SummaryTable';

const SummaryPage = () => {
    // Defines the top card metrics
    const cards = [
        { from: { type: 'mentor', label: 'Mentor' }, to: { type: 'management', label: 'Management' }, count: 97 },
        { from: { type: 'mentor', label: 'Mentor' }, to: { type: 'mentor', label: 'Mentor' }, count: 97 },
        { from: { type: 'management', label: 'Management' }, to: { type: 'management', label: 'Management' }, count: 97 },
        { from: { type: 'management', label: 'Management' }, to: { type: 'mentor', label: 'Mentor' }, count: 97 },
    ];

    return (
        <AdminLayout title="Summary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <SummaryCard
                        key={idx}
                        from={card.from}
                        to={card.to}
                        count={card.count}
                    />
                ))}
            </div>

            <SummaryTable />
        </AdminLayout>
    );
};

export default SummaryPage;
