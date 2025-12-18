import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import SummaryCard from '../../components/admin/Summary/SummaryCard';
import SummaryTable from '../../components/admin/Summary/SummaryTable';

const SummaryPage = () => {
    const [cards, setCards] = useState([
        { from: { type: 'mentor', label: 'Mentor' }, to: { type: 'management', label: 'Management' }, count: 0 },
        { from: { type: 'mentor', label: 'Mentor' }, to: { type: 'mentor', label: 'Mentor' }, count: 0 },
        { from: { type: 'management', label: 'Management' }, to: { type: 'management', label: 'Management' }, count: 0 },
        { from: { type: 'management', label: 'Management' }, to: { type: 'mentor', label: 'Mentor' }, count: 0 },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5001/api/admin/summary/cards', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // Map API response to card format
                    const mappedCards = [
                        {
                            from: { type: 'mentor', label: 'Mentor' },
                            to: { type: 'management', label: 'Management' },
                            count: data.cards?.find(c => c.from === 'mentor' && c.to === 'management')?.count || 0
                        },
                        {
                            from: { type: 'mentor', label: 'Mentor' },
                            to: { type: 'mentor', label: 'Mentor' },
                            count: data.cards?.find(c => c.from === 'mentor' && c.to === 'mentor')?.count || 0
                        },
                        {
                            from: { type: 'management', label: 'Management' },
                            to: { type: 'management', label: 'Management' },
                            count: data.cards?.find(c => c.from === 'management' && c.to === 'management')?.count || 0
                        },
                        {
                            from: { type: 'management', label: 'Management' },
                            to: { type: 'mentor', label: 'Mentor' },
                            count: data.cards?.find(c => c.from === 'management' && c.to === 'mentor')?.count || 0
                        },
                    ];
                    setCards(mappedCards);
                }
            } catch (error) {
                console.error('Error fetching summary cards:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    return (
        <AdminLayout title="Summary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <SummaryCard
                        key={idx}
                        from={card.from}
                        to={card.to}
                        count={card.count}
                        loading={loading}
                    />
                ))}
            </div>

            <SummaryTable />
        </AdminLayout>
    );
};

export default SummaryPage;
