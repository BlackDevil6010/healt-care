import React from 'react';

interface RegisterProps {
    onLoginSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onLoginSuccess }) => {
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate successful registration and login
        onLoginSuccess();
    };

    return (
        <div className="animate-fade-in w-full max-w-sm px-4">
            <h2 className="text-3xl font-bold text-emerald-600 text-center">Create Account</h2>
            <p className="text-slate-500 mt-2 text-center text-sm">Enter your details to get started</p>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                 <div>
                    <input 
                        id="name-register"
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                        placeholder="Name"
                    />
                </div>
                <div>
                    <input 
                        id="email-register"
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <input 
                        id="password-register"
                        type="password"
                        required
                        className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                        placeholder="Password"
                    />
                </div>
                 <button 
                    type="submit"
                    className="w-full !mt-8 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 uppercase tracking-wider transition-transform hover:scale-105"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;