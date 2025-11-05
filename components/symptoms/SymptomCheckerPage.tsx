import React, { useState } from 'react';
import { checkSymptoms } from '../../services/geminiService';
import type { GenerateContentResponse } from '@google/genai';

interface SymptomCheckerPageProps {
  onClose: () => void;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
);


const SymptomCheckerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-slate-300 drop-shadow-md mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 8v6m-3-3h6" />
    </svg>
);

const SymptomCheckerPage: React.FC<SymptomCheckerPageProps> = ({ onClose }) => {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response: GenerateContentResponse = await checkSymptoms(symptoms);
      setResult(response.text);
    } catch (err) {
      console.error(err);
      setError("Sorry, something went wrong while checking your symptoms. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && result) {
        try {
            await navigator.share({
                title: 'Symptom Checker Results from Ethical Elites AI',
                text: `Here are the results for my symptoms from Ethical Elites AI:\n\n${result}`,
                url: window.location.href,
            });
            console.log('Content shared successfully');
        } catch (err) {
            console.error('Error sharing:', err);
        }
    }
  };


  return (
    <div className="min-h-screen flex flex-col font-sans p-4">
      <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 animate-fade-in flex flex-col" style={{minHeight: '80vh'}}>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Symptom Checker</h1>
            <button onClick={onClose} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                &larr; Back to Home
            </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
            <label htmlFor="symptom-checker-input" className="text-sm font-medium text-slate-600">Describe your symptoms below</label>
             <div className="relative mt-1">
                <textarea
                    id="symptom-checker-input"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
                    placeholder="e.g., 'I have a sore throat, a mild fever, and a headache...'"
                />
            </div>
             <button
                type="submit"
                disabled={isLoading || !symptoms.trim()}
                className="w-full mt-4 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 uppercase tracking-wider transition-transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                aria-label="Check symptoms"
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing...</span>
                    </>
                ) : (
                    <>
                        <SearchIcon />
                        <span>Check Symptoms</span>
                    </>
                )}
            </button>
        </form>

        <div className="flex-1 overflow-y-auto bg-slate-50/50 rounded-xl p-4 border border-slate-200 min-h-[300px] flex flex-col">
          {error && <div className="text-center text-red-500 text-sm p-4 bg-red-50 rounded-lg m-auto">{error}</div>}
          
          {!isLoading && !result && !error && (
            <div className="text-center text-slate-500 m-auto">
              <SymptomCheckerIcon />
              <p className="mt-4">Enter your symptoms above to get general health information.</p>
              <p className="text-xs mt-2 text-slate-400">This feature is not a substitute for professional medical advice.</p>
            </div>
          )}

          {isLoading && !result && (
              <div className="text-center text-slate-600 m-auto">
                   <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                   <p className="mt-4 font-medium">Ethical Elites AI is thinking...</p>
                   <p className="text-sm mt-1 text-slate-500">Please wait while we analyze your symptoms.</p>
              </div>
          )}

          {result && (
            <div className="text-slate-800 space-y-4">
               <p className="text-sm whitespace-pre-wrap">{result}</p>
                {navigator.share && (
                    <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                        <button
                            onClick={handleShare}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition"
                            aria-label="Share results"
                        >
                            <ShareIcon />
                            <span>Share Results</span>
                        </button>
                    </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;