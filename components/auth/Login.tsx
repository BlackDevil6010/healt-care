import React from 'react';

interface LoginProps {
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate successful login
        onLoginSuccess();
    };

    return (
        <div className="animate-fade-in w-full max-w-sm px-4">
            <h2 className="text-3xl font-bold text-emerald-600 text-center">Sign In</h2>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                    <input 
                        id="email-login"
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <input 
                        id="password-login"
                        type="password"
                        required
                        className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                        placeholder="Password"
                    />
                </div>
                 <a href="#" className="text-xs text-slate-500 hover:text-emerald-600 text-center block pt-2 pb-2">Forgot your password?</a>
                 <button 
                    type="submit"
                    className="w-full py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 uppercase tracking-wider transition-transform hover:scale-105"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;