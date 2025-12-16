import React from 'react';

const UserListItem = ({ user, active, onClick }) => {
    // Determine styles based on active state
    const baseClasses = "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all mb-3";
    const activeClasses = "bg-[#4c1d95] shadow-lg border border-[#6d28d9]"; // Darker purple highlight
    const inactiveClasses = "bg-[#110C2A] hover:bg-[#1e1b4b] border border-transparent";

    return (
        <div 
            className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
            onClick={onClick}
        >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/10">
                <img 
                    src={user.avatar || "https://ui-avatars.com/api/?name=" + user.name + "&background=random"} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Text Info */}
            <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm truncate">{user.name}</h4>
                <p className="text-gray-400 text-xs truncate">{user.role}</p>
            </div>
        </div>
    );
};

export default UserListItem;
