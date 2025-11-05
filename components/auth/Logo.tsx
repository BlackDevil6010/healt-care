import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
            </svg>
        </div>
    </div>
);

export default Logo;