import { useState } from 'react';
import Markdown from 'react-markdown';
import {
  Sparkles,
  X,
  Send,
  Shield,
  Bot,
  User,
  RefreshCw,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface GeminiAnalystChatProps {
  isOpen: boolean;
  onClose: () => void;
  onSendQuery: (query: string) => Promise<{ answer: string; sourcesUsed: string[] }>;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sources?: string[];
  timestamp: string;
}

export default function GeminiAnalystChat({
  isOpen,
  onClose,
  onSendQuery
}: GeminiAnalystChatProps) {
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: `Habari. I am the **Kenya Strategic Intelligence AI Analyst** powered by Google Gemini 3.7 Flash. 
I have real-time access to the indexed 47-county political database, overnight momentum scores, entity extractions, and verified Kenyan news reports.

How can I assist your political intelligence assessment today?`,
      timestamp: '06:00 EAT'
    }
  ]);

  const presetQueries = [
    'Assess the political momentum of the Tawe movement in Western Kenya.',
    'Compare Rigathi Gachagua and Kithure Kindiki momentum scores across Mt. Kenya.',
    'Which 3 counties have the highest political volatility today and why?',
    'What are the primary media narratives surrounding the SHA healthcare transition?'
  ];

  if (!isOpen) return null;

  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await onSendQuery(queryText);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.answer,
        sources: response.sourcesUsed,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: `Error processing query: ${err.message || 'Unable to reach intelligence engine.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl h-[640px] flex flex-col shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white">Kenya Strategic AI Analyst</h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Gemini 3.7 Flash
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Grounded in 47 Counties • Objective Political OSINT Intelligence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-sky-600 text-white' : 'bg-emerald-700 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-800 border border-slate-750 text-slate-200 shadow-md'
                }`}
              >
                {msg.sender === 'ai' ? (
                  <div className="prose prose-invert max-w-none prose-p:my-1 prose-headings:text-slate-100 prose-headings:text-xs prose-li:my-0.5 prose-strong:text-white">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}

                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-700/80 text-[10px] text-slate-400 flex flex-wrap items-center gap-1.5">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span>Sources: {msg.sources.join(', ')}</span>
                  </div>
                )}

                <div className={`mt-1 text-[9px] font-mono ${msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'} text-right`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-emerald-400 p-3 bg-slate-800/60 rounded-xl w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
              <span>Synthesizing evidence across 47 county databases...</span>
            </div>
          )}
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap">Suggested:</span>
          {presetQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-lg whitespace-nowrap border border-slate-700 transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask a question about Kenyan politicians, county signals, or policy issues..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage(inputQuery)}
            className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={() => handleSendMessage(inputQuery)}
            disabled={!inputQuery.trim() || loading}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
