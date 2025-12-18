import React from 'react';

const UserSidebar = () => {
    const currentPath = window.location.pathname;

    const menus = [
        { name: 'Dasboard', icon: '⊞', path: '/user/dashboard' },
        { name: 'Summary', icon: '📋', path: '/user/summary' }, // Assuming path based on name
        { name: 'Feedback', icon: '💬', path: '/user/feedback' }, // Assuming path based on name
    ];

    return (
        <aside className="w-64 bg-white h-screen flex flex-col border-r border-gray-100 fixed top-0 left-0 z-40">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1e1b4b] flex items-center justify-center text-white font-bold">Q</div>
                <span className="font-bold text-xl text-[#1e1b4b]">ILInsight</span>
            </div>

            <nav className="flex-1 px-4 mt-6">
                <ul className="space-y-2">
                    {menus.map((menu) => (
                        <li key={menu.name}>
                            <a
                                href={menu.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                                    ${currentPath === menu.path
                                        ? 'bg-[#1e1b4b] text-white shadow-lg shadow-indigo-500/20'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className="text-lg">{menu.icon}</span>
                                {menu.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 transition-colors w-full">
                    <span className="text-xl">↪</span>
                    <span className="font-medium text-sm">Log out</span>
                </button>
            </div>
        </aside>
    );
};

export default UserSidebar;
