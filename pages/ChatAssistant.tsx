import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { generateChatResponse } from '../services/geminiService';
import { Button, Card } from '../components/UI';
import { Send, Bot, User, RefreshCcw, Loader2 } from 'lucide-react';

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello. I am Mo.Nabil AI. I am ready to answer any question regarding Business Administration, Strategy, Finance, HR, or Marketing. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await generateChatResponse(history, userMessage.text);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I encountered an error connecting to the intelligence engine. Please try again.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col pt-6 pb-4 px-4 container mx-auto max-w-5xl">
      <div className="flex items-center justify-between mb-4">
        <div>
           <h2 className="text-2xl font-bold text-white flex items-center gap-2">
             <Bot className="text-royal-400" /> Mo.Nabil AI Assistant
           </h2>
           <p className="text-slate-400 text-sm">Expert guidance on any business topic</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setMessages([messages[0]])}>
          <RefreshCcw size={16} className="mr-2" /> Reset Chat
        </Button>
      </div>

      <Card className="flex-1 flex flex-col bg-slate-900/80 border-slate-800 shadow-2xl">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-royal-600' : 'bg-slate-700'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-royal-300" />}
                </div>
                
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-royal-600 text-white rounded-tr-sm' 
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-xs text-slate-500 mt-1 px-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[75%] gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                  <Bot size={16} className="text-royal-300" />
                </div>
                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-sm border border-slate-700 flex items-center gap-2">
                   <Loader2 className="animate-spin text-royal-400" size={18} />
                   <span className="text-slate-400 text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-950/50 border-t border-slate-800">
          <div className="relative flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about business strategies, definitions, or advice..."
              className="w-full bg-slate-900 text-white rounded-xl border border-slate-700 focus:border-royal-500 focus:ring-1 focus:ring-royal-500 p-3 pr-12 resize-none h-[52px] max-h-[120px] scrollbar-hide"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              className="absolute right-2 h-9 w-9 p-0 rounded-lg"
            >
              <Send size={18} />
            </Button>
          </div>
          <div className="text-center mt-2">
             <p className="text-xs text-slate-600">AI can make mistakes. Verify important business information.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatAssistant;