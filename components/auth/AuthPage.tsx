import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Overlay from './Overlay';

const AuthPage: React.FC<{ onLoginSuccess: () => void; }> = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const toggleView = () => setIsLoginView(!isLoginView);

    return (
        <div className="min-h-screen flex items-center justify-center font-sans p-4">
            <div className="relative w-full max-w-4xl h-[600px] bg-white shadow-2xl rounded-2xl overflow-hidden">
                
                {/* Static container for the two form panels, side-by-side */}
                <div className="w-full h-full grid grid-cols-2">
                    <div className="flex items-center justify-center">
                         <Register onLoginSuccess={onLoginSuccess} />
                    </div>
                    <div className="flex items-center justify-center">
                         <Login onLoginSuccess={onLoginSuccess} />
                    </div>
                </div>

                {/* The overlay panel that slides over the forms to toggle views */}
                <div className={`absolute top-0 h-full w-1/2 left-0 transition-transform duration-700 ease-in-out ${isLoginView ? 'translate-x-full' : 'translate-x-0'}`}>
                    <Overlay isLoginView={isLoginView} onToggleView={toggleView} />
                </div>
            </div>
        </div>
    )
}

export default AuthPage;
