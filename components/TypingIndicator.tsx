
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-3 justify-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.042 1.884l-3.23 1.292a1 1 0 00-.788 1.842l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.842l-3.23-1.292a.999.999 0 01-.042-1.884l2.65-1.06a1 1 0 000-1.84l-7-3zM10 6a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
        </div>
        <div className="bg-white text-slate-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-md flex items-center space-x-1.5">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
        </div>
    </div>
  );
};

export default TypingIndicator;
