import React from 'react';

interface HomePageProps {
  onNavigate: (view: 'chat' | 'profile' | 'appointment' | 'symptom-checker') => void;
  onLogout: () => void;
}

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-white drop-shadow-md mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-white drop-shadow-md mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AppointmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-white drop-shadow-md mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const SymptomCheckerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-white drop-shadow-md mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 8v6m-3-3h6" />
    </svg>
);


const HomePage: React.FC<HomePageProps> = ({ onNavigate, onLogout }) => {
  return (
    <div className="flex flex-col h-screen w-full">
        <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm p-4 flex justify-between items-center">
            <div className="w-72"></div> {/* Spacer */}
            <h1 className="text-2xl text-center text-slate-800">
              Ethical Elites AI
            </h1>
            <div className="w-72 flex justify-end items-center gap-4">
                <button onClick={() => onNavigate('appointment')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">
                    Book Appointment
                </button>
                <button onClick={() => onNavigate('profile')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                    Profile
                </button>
                <button onClick={onLogout} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                    Logout
                </button>
            </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-4 text-white">
             <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
                    Welcome to Ethical Elites AI
                </h2>
                <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-white/90 drop-shadow-md">
                    Your all-in-one health companion. From checking symptoms to getting answers, we're here to help.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl animate-fade-in [animation-delay:0.2s]">
                {/* AI Chat Card */}
                <div 
                    onClick={() => onNavigate('chat')}
                    className="group relative bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-2xl text-center cursor-pointer hover:bg-white/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full group-hover:scale-[8] transition-transform duration-500 ease-in-out"></div>
                    <div className="relative">
                        <ChatIcon />
                        <h3 className="text-2xl font-bold">AI Health Assistant</h3>
                        <p className="mt-2 text-white/80">Start a conversation with Ethical Elites AI for health-related information and answers.</p>
                    </div>
                </div>
                {/* Symptom Checker Card */}
                <div 
                    onClick={() => onNavigate('symptom-checker')}
                    className="group relative bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-2xl text-center cursor-pointer hover:bg-white/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                     <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full group-hover:scale-[8] transition-transform duration-500 ease-in-out"></div>
                    <div className="relative">
                        <SymptomCheckerIcon />
                        <h3 className="text-2xl font-bold">Symptom Checker</h3>
                        <p className="mt-2 text-white/80">Analyze your symptoms to understand potential conditions and next steps.</p>
                    </div>
                </div>
                {/* Book Appointment Card */}
                <div 
                    onClick={() => onNavigate('appointment')}
                    className="group relative bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-2xl text-center cursor-pointer hover:bg-white/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full group-hover:scale-[8] transition-transform duration-500 ease-in-out"></div>
                    <div className="relative">
                        <AppointmentIcon />
                        <h3 className="text-2xl font-bold">Book an Appointment</h3>
                        <p className="mt-2 text-white/80">Find and schedule appointments with healthcare professionals near you.</p>
                    </div>
                </div>
                {/* Profile Card */}
                <div 
                    onClick={() => onNavigate('profile')}
                    className="group relative bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-2xl text-center cursor-pointer hover:bg-white/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                     <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full group-hover:scale-[8] transition-transform duration-500 ease-in-out"></div>
                    <div className="relative">
                        <ProfileIcon />
                        <h3 className="text-2xl font-bold">Manage Profile</h3>
                        <p className="mt-2 text-white/80">View your personal information and update your account settings.</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
};

export default HomePage;