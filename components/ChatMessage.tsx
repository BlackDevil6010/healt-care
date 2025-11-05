
import React from 'react';
import { Message, Sender } from '../types';

interface ChatMessageProps {
  message: Message;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const AssistantIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.042 1.884l-3.23 1.292a1 1 0 00-.788 1.842l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.842l-3.23-1.292a.999.999 0 01-.042-1.884l2.65-1.06a1 1 0 000-1.84l-7-3zM10 6a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
          <AssistantIcon />
        </div>
      )}
      <div
        className={`max-w-md md:max-w-lg lg:max-w-2xl rounded-2xl px-4 py-3 shadow-md ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-white text-slate-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
