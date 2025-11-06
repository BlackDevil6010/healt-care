import React, { useState, useEffect } from 'react';
import { findAppointments } from '../../services/geminiService';
import type { GenerateContentResponse, GroundingChunk } from '@google/genai';

interface BookAppointmentPageProps {
  onClose: () => void;
}

// Define a type for the result structure
interface AppointmentResult {
  summary: string;
  places: GroundingChunk[];
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
);

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-slate-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const BookAppointmentPage: React.FC<BookAppointmentPageProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AppointmentResult | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (err) => {
          console.error("Error getting location:", err);
          setLocationError("Could not get your location. Please enable location services or enter a location in your search.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    if (!location) {
        setError("Location is required to find nearby doctors. Please enable location services.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response: GenerateContentResponse = await findAppointments(prompt, location);
      const summary = response.text || "No results found.";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      const places = chunks.filter(chunk => chunk.web || chunk.maps);

      setResults({ summary, places });
    } catch (err) {
      console.error(err);
      setError("Sorry, something went wrong while searching for appointments. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col font-sans p-4">
      <div className="flex-1 w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 animate-fade-in flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Book an Appointment</h1>
            <button onClick={onClose} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                &larr; Back to Home
            </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
            <label htmlFor="appointment-search" className="text-sm font-medium text-slate-600">What are you looking for?</label>
             <div className="relative mt-1">
                <input
                    id="appointment-search"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-20 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="e.g., 'a dentist for a cleaning near me'"
                />
                 <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="absolute inset-y-0 right-0 flex items-center justify-center w-16 h-full text-blue-600 rounded-r-full hover:bg-blue-100 disabled:text-slate-400 disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 transition-colors"
                    aria-label="Search for appointments"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <SearchIcon />
                    )}
                </button>
            </div>
             {locationError && <p className="text-xs text-red-500 mt-2">{locationError}</p>}
        </form>

        <div className="flex-1 overflow-y-auto">
          {error && <div className="text-center text-red-500 text-sm p-4 bg-red-50 rounded-lg">{error}</div>}
          
          {!isLoading && !results && (
            <div className="text-center text-slate-500 py-16">
              <AppointmentIcon />
              <p className="mt-4">Describe your needs above to find healthcare providers near you.</p>
            </div>
          )}

          {results && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Suggestions</h2>
                <p className="text-slate-700 whitespace-pre-wrap">{results.summary}</p>
              </div>

              {results.places.length > 0 && (
                <div>
                   <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Helpful Resources</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.places.map((place, index) => {
                            if (place.maps) {
                                return (
                                    <div key={index} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                        <h4 className="font-bold text-slate-800">{place.maps.title}</h4>
                                        <a
                                            href={place.maps.uri}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline mt-2 inline-flex items-center"
                                        >
                                           <MapPinIcon /> View on Google Maps
                                        </a>
                                    </div>
                                );
                            } else if (place.web) {
                                return (
                                    <div key={index} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                        <h4 className="font-bold text-slate-800">{place.web.title}</h4>
                                        <a
                                            href={place.web.uri}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                                        >
                                            Visit Website &rarr;
                                        </a>
                                    </div>
                                );
                            }
                            return null;
                        })}
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusing icon from HomePage
const AppointmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-slate-300 drop-shadow-md mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


export default BookAppointmentPage;