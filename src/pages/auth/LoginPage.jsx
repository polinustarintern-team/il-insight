import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo-light.png';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect based on role
            if (data.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (data.user.role === 'mentor') {
                navigate('/user/dashboard');
            } else if (data.user.role === 'manajemen') {
                navigate('/user/dashboard'); // Same path for all users
            } else {
                navigate('/user/dashboard'); // Default
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
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

                {/* Error Message */}
                {error && (
                    <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-center text-sm font-medium text-red-500">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-10">

                    {/* Username */}
                    <div className="mx-auto max-w-[420px] space-y-2">
                        <label className="text-left block text-sm font-semibold text-white">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="walid"
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
                            disabled={isLoading}
                            className="w-full max-w-[420px] rounded-full bg-white py-4 text-lg font-semibold text-[#0F0A1E] transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
