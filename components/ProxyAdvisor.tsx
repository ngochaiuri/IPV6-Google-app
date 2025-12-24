
import React, { useState, useRef, useEffect } from 'react';
import { getProxyRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';

const ProxyAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Chào bạn! Tôi là trợ lý AI. Bạn đang cần proxy cho công việc gì để tôi tư vấn?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await getProxyRecommendation(input);
    const aiMsg: ChatMessage = { role: 'assistant', content: response || "Tôi không nhận được phản hồi." };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-orange-600 rounded-full shadow-2xl shadow-orange-900/40 flex items-center justify-center text-white hover:scale-110 transition-all z-50 active:scale-95 group"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
        )}
        <div className="absolute right-full mr-4 bg-slate-900 px-4 py-2 rounded-xl text-slate-100 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-slate-800">
          Tư vấn AI thông minh
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-80 sm:w-96 h-[500px] bg-slate-900 rounded-3xl shadow-2xl z-50 flex flex-col border border-slate-800 overflow-hidden">
          {/* Header */}
          <div className="bg-orange-600 p-4 text-white flex items-center">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">ProxyAdvisor AI</h3>
              <p className="text-xs opacity-80">Trực tuyến - Luôn sẵn sàng hỗ trợ</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto bg-slate-950 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-orange-600 text-white rounded-tr-none' 
                    : 'bg-slate-900 text-slate-100 rounded-tl-none border border-slate-800'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-800 bg-slate-900">
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ví dụ: Nuôi nick Facebook cần proxy nào?"
                className="flex-grow bg-slate-950 border-none text-white rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="bg-orange-600 text-white p-2 rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-500 mt-2">Được cung cấp bởi Gemini AI</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProxyAdvisor;
