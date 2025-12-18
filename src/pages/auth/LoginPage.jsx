import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo-light.png';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/user/dashboard');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-6">
            {/* Card */}
            <div className="w-full max-w-[720px] rounded-[40px] bg-[#0F0A1E] px-16 py-16 shadow-xl">

                {/* Logo */}
                <div className="mb-14 flex justify-center">
                    <img
                        src={logo}
                        alt="IL Insight"
                        className="h-18 w-auto"
                    />
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-10">

                    {/* Email */}
                    <div className="mx-auto max-w-[420px] space-y-2">
                        <label className="text-left block text-sm font-semibold text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="walidyxz@gmail.com"
                            required
                            className="w-full rounded-xl bg-[#D6D3D1] px-6 py-4 text-sm font-medium text-gray-900 placeholder-gray-600 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="mx-auto max-w-[420px] space-y-2">
                        <label className="text-left block text-sm font-semibold text-white">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="***************"
                                required
                                className="w-full rounded-xl bg-[#D6D3D1] px-6 py-4 pr-14 text-sm font-medium text-gray-900 placeholder-gray-600 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="pt-6 flex justify-center">
                        <button
                            type="submit"
                            className="w-full max-w-[420px] rounded-full bg-white py-4 text-lg font-semibold text-[#0F0A1E] transition hover:bg-gray-100"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
