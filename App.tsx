import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { Message, Sender } from './types';
import { initializeChat } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import AuthPage from './components/auth/AuthPage';
import UserProfile from './components/profile/UserProfile';
import HomePage from './components/HomePage';
import BookAppointmentPage from './components/appointments/BookAppointmentPage';
import SymptomCheckerPage from './components/symptoms/SymptomCheckerPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'home' | 'chat' | 'profile' | 'appointment' | 'symptom-checker'>('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const initializeNewChat = () => {
    const chatInstance = initializeChat();
    if (chatInstance) {
      setChat(chatInstance);
      setMessages([
        {
          id: 'initial-message',
          sender: Sender.ASSISTANT,
          text: "Hello! I'm Ethical Elites AI, your personal health assistant. How can I help you today?\n\n**Disclaimer:** I am an AI assistant and not a medical professional. Please consult with a healthcare provider for any medical advice.",
        },
      ]);
      setError(null);
    } else {
      setError("Failed to initialize AI Assistant. Please check your API key and try again.");
    }
  };

  useEffect(() => {
    // Initialize chat only when moving to the chat view and if it's not already initialized.
    if (isAuthenticated && currentView === 'chat' && !chat) {
      initializeNewChat();
    }
  }, [isAuthenticated, currentView, chat]);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  const handleSendMessage = async (messageText: string) => {
    if (!chat) {
      setError("Chat is not initialized.");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: Sender.USER,
      text: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    const assistantMessageId = (Date.now() + 1).toString();
    
    try {
      const stream = await chat.sendMessageStream({ message: messageText });
      let currentResponse = '';
      let firstChunk = true;

      for await (const chunk of stream) {
        currentResponse += chunk.text;
        if(firstChunk){
            setMessages((prev) => [
                ...prev,
                { id: assistantMessageId, sender: Sender.ASSISTANT, text: currentResponse }
            ]);
            firstChunk = false;
        } else {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === assistantMessageId ? { ...msg, text: currentResponse } : msg
                )
            );
        }
      }
    } catch (err) {
      console.error(err);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setError(errorMessage);
       setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, sender: Sender.ASSISTANT, text: errorMessage }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMessages([]);
    setChat(null);
    setCurrentView('home');
  }

  const renderAuthenticatedView = () => {
      switch(currentView) {
          case 'chat':
              return (
                <>
                  <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm p-4 flex justify-between items-center">
                    <div className="w-40 flex justify-start items-center gap-4">
                       <button onClick={() => setCurrentView('home')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                           &larr; Home
                       </button>
                    </div>
                    <h1 className="text-2xl text-center text-slate-800">
                      Ethical Elites AI
                    </h1>
                    <div className="w-40 flex justify-end items-center gap-4">
                        <button onClick={() => setCurrentView('profile')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            Profile
                        </button>
                        <button onClick={handleLogout} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            Logout
                        </button>
                    </div>
                  </header>

                  <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    {messages.map((msg) => (
                      <ChatMessage key={msg.id} message={msg} />
                    ))}
                    {isLoading && <TypingIndicator />}
                    {error && <div className="text-center text-red-500 text-sm">{error}</div>}
                  </main>

                  <footer className="w-full bg-white/90 backdrop-blur-sm">
                     <p className="text-xs text-center text-slate-500 px-4 pb-2">
                        Disclaimer: This AI is for informational purposes only and does not provide medical advice. Consult a healthcare professional for any health concerns.
                    </p>
                    <ChatInput onSendMessage={handleSendMessage} isLoading={!chat || isLoading} />
                  </footer>
                </>
              );
          case 'profile':
              return <UserProfile onClose={() => setCurrentView('home')} />;
          case 'appointment':
              return <BookAppointmentPage onClose={() => setCurrentView('home')} />;
          case 'symptom-checker':
              return <SymptomCheckerPage onClose={() => setCurrentView('home')} />;
          case 'home':
          default:
              return <HomePage onNavigate={setCurrentView} onLogout={handleLogout} />;
      }
  }

  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }
  
  return (
    <div className="flex flex-col h-screen font-sans bg-transparent">
        {renderAuthenticatedView()}
    </div>
  );
};

export default App;