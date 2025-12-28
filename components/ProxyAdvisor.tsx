
import React, { useState, useRef, useEffect } from 'react';
import { getProxyRecommendation } from '../services/geminiService';
import { ChatMessage, Language } from '../types';

interface ProxyAdvisorProps {
  lang: Language;
}

const ProxyAdvisor: React.FC<ProxyAdvisorProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: lang === 'vi' ? 'Chào bạn! Tôi là trợ lý AI. Bạn cần proxy cho việc gì?' : lang === 'zh' ? '你好！我是AI助手。您需要哪种代理？' : lang === 'ru' ? 'Привет! Я AI-помощник. Какой прокси вам нужен?' : 'Hello! I am your AI assistant. What do you need proxy for?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    const response = await getProxyRecommendation(input, lang);
    const aiMsg: ChatMessage = { role: 'assistant', content: response || "..." };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-8 right-8 w-16 h-16 bg-orange-600 rounded-full shadow-2xl flex items-center justify-center text-white z-50">
        {isOpen ? <span className="text-xl">✕</span> : <span className="text-2xl">💬</span>}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-80 sm:w-96 h-[500px] bg-slate-900 rounded-3xl shadow-2xl z-50 flex flex-col border border-slate-800 overflow-hidden">
          <div className="bg-orange-600 p-4 text-white font-bold">ProxyAdvisor AI</div>
          <div className="flex-grow p-4 overflow-y-auto bg-slate-950 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-orange-600 text-white' : 'bg-slate-900 text-slate-100 border border-slate-800'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-slate-800 bg-slate-900 flex space-x-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} className="flex-grow bg-slate-950 text-white rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500" placeholder="..." />
            <button onClick={handleSend} className="bg-orange-600 text-white p-2 rounded-xl">➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProxyAdvisor;
