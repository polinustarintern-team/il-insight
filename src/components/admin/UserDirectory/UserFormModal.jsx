import React, { useState, useEffect } from 'react';

const UserFormModal = ({ isOpen, onClose, type = 'create', userData, onSubmit }) => {
    if (!isOpen) return null;

    const isUpdate = type === 'update';
    const title = isUpdate ? 'Update your Account' : 'Create Account';
    const btnText = isUpdate ? 'Update Account' : 'Create Account';

    const [form, setForm] = useState({
        name: '',
        role: '',
        email: '',
        position: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (isUpdate && userData) {
            setForm({
                name: userData.name || '',
                role: userData.role || '',
                email: userData.email || '',
                position: userData.division || '', // Assuming division maps to position
                password: userData.password || '',
                confirmPassword: userData.password || ''
            });
        } else {
            setForm({
                name: '',
                role: '',
                email: '',
                position: '',
                password: '',
                confirmPassword: ''
            });
        }
    }, [isUpdate, userData, isOpen]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.title || e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#110C2A] w-full max-w-3xl rounded-3xl p-10 relative border border-gray-800 shadow-2xl">
                {/* Header */}
                <h2 className="text-3xl text-white font-bold text-center mb-10">{title}</h2>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Insert Full Name"
                        className="w-full bg-[#D9D9D9] text-gray-800 rounded-xl px-4 py-4 outline-none placeholder-gray-500"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    {/* Role */}
                    <input
                        type="text"
                        name="role"
                        placeholder="Insert User Role"
                        className="w-full bg-[#D9D9D9] text-gray-800 rounded-xl px-4 py-4 outline-none placeholder-gray-500"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        className="w-full bg-[#D9D9D9] text-gray-800 rounded-xl px-4 py-4 outline-none placeholder-gray-500"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    {/* Position Dropdown */}
                    <div className="relative">
                        <select
                            name="position"
                            className="w-full bg-[#D9D9D9] text-gray-800 rounded-xl px-4 py-4 outline-none appearance-none cursor-pointer"
                            value={form.position}
                            onChange={(e) => setForm({ ...form, position: e.target.value })}
                        >
                            <option value="" disabled>Insert User Position</option>
                            <option value="Mentor">Mentor</option>
                            <option value="Management">Management</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-6 h-6 text-[#110C2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="w-full bg-[#D9D9D9] text-gray-800 rounded-xl px-4 py-4 outline-none placeholder-gray-500"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#110C2A]"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                            )}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full bg-[#D9D9D9] text-gray-800 rounded-xl px-4 py-4 outline-none placeholder-gray-500"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        />
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#110C2A]"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {/* Reuse eye icon logic */}
                            {showConfirmPassword ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer Button */}
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => onSubmit(form)}
                        className="bg-[#8b5cf6] text-white px-12 py-3 rounded-xl font-medium text-lg hover:bg-[#7c3aed] transition-colors shadow-lg"
                    >
                        {btnText}
                    </button>
                </div>

                {/* Close Button (Optional but good UX) */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-white"
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    );
};

export default UserFormModal;
