import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { generateChatResponse } from '../../services/ai';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your MPS AI Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await generateChatResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, I encountered an error connecting to my servers.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`mb-4 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transition-all duration-300 transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none absolute'
        }`}
      >
        {/* Header */}
        <div className="bg-amber-500 p-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Bot size={24} />
            <h3 className="font-bold text-lg">MPS Assistant</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.isBot 
                    ? 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-slate-700' 
                    : 'bg-blue-600 text-white rounded-tr-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm border border-gray-100 dark:border-slate-700">
                <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..." 
              className="w-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Floating Button */}
      <div className="relative mt-4">
        {!isOpen && (
          <span className="absolute -inset-2 rounded-full border-[3px] border-amber-500/50 dark:border-amber-400/50 animate-ping z-0"></span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-10 w-16 h-16 bg-blue-900 hover:bg-blue-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-[#161616] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 focus:outline-none ${!isOpen ? 'animate-bounce hover:animate-none' : 'hover:scale-110'}`}
        >
          {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
        </button>
      </div>
    </div>
  );
}
