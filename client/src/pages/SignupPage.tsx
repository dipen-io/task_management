import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, User } from "lucide-react";
import { signupUser } from "../api/authApi";
import toast from 'react-hot-toast';

export function SignupPage() {
    const { saveData } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true)

        try {
            const data = await signupUser(formData);
            toast.success(data.message);
            saveData(data.data.user, data.data.accessToken)
            navigate("/", { replace: true });
            // navigate('/')

            console.log("User: ", data);

        } catch (error: any) {
            setError(error?.message || "Something went wrong");

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 justify-center mb-8">
                    <div className="w-10 h-10 bg-[#14b8a6] rounded-lg" />
                    <span className="text-2xl text-gray-900">TaskManager</span>
                </Link>

                {/* Signup Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-center text-gray-900 mb-2">Create your account</h1>
                    <p className="text-center text-gray-600 mb-8">Get started with TaskManager today</p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="block mb-2 text-gray-700">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Dipen Boro"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6]"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-2 text-gray-700">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6]"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-2 text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6]"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button disabled={loading}
                            type="submit"
                            className="w-full py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#14b8a6]/90 transition-colors"
                        >
                            {loading ? "Creating..." : "Create Account"}


                        </button>
                        {error && <p>{error}</p>}
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#14b8a6] hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

