import React from 'react';
import Logo from './Logo';

interface OverlayProps {
    isLoginView: boolean;
    onToggleView: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ isLoginView, onToggleView }) => {
    return (
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 h-full text-white flex flex-col items-center justify-center p-12 text-center relative rounded-2xl">
            {/* Panel for prompting user to Sign Up */}
            <div className={`absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center p-12 text-center transition-transform duration-700 ease-in-out ${isLoginView ? 'translate-x-0' : '-translate-x-full'}`}>
                <Logo />
                <h1 className="text-3xl font-bold mt-4">Hello, Friend!</h1>
                <p className="mt-4">Enter your personal details and start your journey with us</p>
                <button 
                    onClick={onToggleView}
                    className="mt-8 px-8 py-2 border border-white rounded-full font-semibold uppercase tracking-wider hover:bg-white hover:text-emerald-600 transition-colors focus:outline-none"
                >
                    Sign Up
                </button>
            </div>

            {/* Panel for prompting user to Sign In */}
            <div className={`absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center p-12 text-center transition-transform duration-700 ease-in-out ${isLoginView ? 'translate-x-full' : 'translate-x-0'}`}>
                <Logo />
                <h1 className="text-3xl font-bold mt-4">Welcome Back!</h1>
                <p className="mt-4">To keep connected with us please login with your personal info</p>
                <button 
                    onClick={onToggleView}
                    className="mt-8 px-8 py-2 border border-white rounded-full font-semibold uppercase tracking-wider hover:bg-white hover:text-emerald-600 transition-colors focus:outline-none"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Overlay;
