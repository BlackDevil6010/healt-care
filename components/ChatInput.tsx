import React, { useState, useRef } from 'react';

// TypeScript interfaces for the SpeechRecognition API
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onend: (() => void) | null;
    onerror: ((event: any) => void) | null;
    onresult: ((event: any) => void) | null;
    onstart: (() => void) | null;
    start(): void;
    stop(): void;
}

interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
}

declare const window: Window;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

const MicrophoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
        <path fillRule="evenodd" d="M5.5 8a.5.5 0 01.5.5v1.5a4 4 0 007 1.22V8.5a.5.5 0 011 0v1.72a5 5 0 01-9 2.05V8.5a.5.5 0 01.5-.5zM10 18a1 1 0 001-1v-1.161a5.002 5.002 0 01-2 0V17a1 1 0 001 1z" clipRule="evenodd" />
    </svg>
);


const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const isSpeechRecognitionSupported = !!SpeechRecognition;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleListen = () => {
    if (!isSpeechRecognitionSupported) {
        alert("Speech recognition is not supported in your browser.");
        return;
    }

    if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
    } else {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };
        
        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result) => result.transcript)
                .join('');
            setInput(transcript);
        };

        recognition.start();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-200">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? "Listening..." : "Ask a health-related question..."}
          disabled={isLoading}
          className="w-full px-4 py-3 pr-24 text-sm bg-slate-100 border border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 transition-shadow"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
            {isSpeechRecognitionSupported && (
                 <button
                    type="button"
                    onClick={handleListen}
                    className={`flex items-center justify-center w-10 h-10 mr-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                        isListening 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-transparent text-slate-500 hover:bg-slate-200'
                    }`}
                    aria-label={isListening ? 'Stop listening' : 'Start listening'}
                >
                    <MicrophoneIcon />
                </button>
            )}
            <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                aria-label="Send message"
            >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <SendIcon />
            )}
            </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;