import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, Project } from '../types';
import { PERSONAL_INFO } from '../constants';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hi there! 👋 I'm ${PERSONAL_INFO.name}'s AI Assistant.\n\nI can help you learn about:\n• Work experience and career background\n• Technical skills and expertise levels\n• Portfolio projects and technologies\n• Contact information and availability\n\nFeel free to ask me anything!`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions for users
  const suggestedQuestions = [
    "What technologies do you know?",
    "Tell me about your projects",
    "What's your experience?",
    "How can I contact you?",
  ];
  
  const MotionButton = motion.button as any;
  const MotionDiv = motion.div as any;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);


  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim() || isLoading) return;

    // Hide suggestions after first message
    if (showSuggestions) {
      setShowSuggestions(false);
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(textToSend);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat Error", error);
      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, something went wrong. Please try again! 😔"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      {/* Trigger Button */}
      <MotionButton
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with AI"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </MotionButton>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-[90vw] md:w-96 h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Sparkles size={18} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Ask AI Assistant</h3>
                <p className="text-xs text-slate-400">Powered by Gemini</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    }`}
                  >
                    {msg.role === 'model' && (
                       <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase tracking-wider font-bold">
                         <Bot size={12} /> AI
                       </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-indigo-400" />
                    <span className="text-xs text-slate-400">Thinking...</span>
                  </div>
                </div>
              )}

              {/* Suggested Questions */}
              {showSuggestions && messages.length === 1 && !isLoading && (
                <div className="space-y-2 mt-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Suggested Questions:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(question)}
                        className="text-left p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800 transition-all text-sm text-slate-300 hover:text-white"
                      >
                        💬 {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-800 border-t border-slate-700">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about my projects..."
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputText.trim()}
                  className="p-2 text-indigo-400 hover:text-white disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;