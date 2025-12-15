import { MessageCircle, Send, Users, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface ChatPanelProps {
  selectedStock: string;
}

interface Message {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
  stock: string;
}

export default function ChatPanel({ selectedStock }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'TraderMike',
      avatar: 'TM',
      message: 'Just entered a position in AAPL at $178. Looking for a run to $185.',
      timestamp: '10:23 AM',
      stock: 'AAPL'
    },
    {
      id: '2',
      user: 'InvestSarah',
      avatar: 'IS',
      message: 'Anyone watching the volume on AAPL today? Looks bullish.',
      timestamp: '10:25 AM',
      stock: 'AAPL'
    },
    {
      id: '3',
      user: 'BullMarket99',
      avatar: 'BM',
      message: 'RSI showing overbought conditions. Might see a pullback.',
      timestamp: '10:28 AM',
      stock: 'AAPL'
    },
    {
      id: '4',
      user: 'TechAnalyst',
      avatar: 'TA',
      message: 'Support at $175 is holding strong. Good entry point if we dip.',
      timestamp: '10:31 AM',
      stock: 'AAPL'
    },
    {
      id: '5',
      user: 'DayTrader_X',
      avatar: 'DX',
      message: 'NVDA hitting new highs! AI sector is on fire 🔥',
      timestamp: '10:15 AM',
      stock: 'NVDA'
    },
    {
      id: '6',
      user: 'ChipInvestor',
      avatar: 'CI',
      message: 'NVDA earnings next week. Expecting strong numbers from data center.',
      timestamp: '10:18 AM',
      stock: 'NVDA'
    },
    {
      id: '7',
      user: 'ValueSeeker',
      avatar: 'VS',
      message: 'TSLA looking oversold on the daily chart. Could be a bounce coming.',
      timestamp: '09:45 AM',
      stock: 'TSLA'
    },
    {
      id: '8',
      user: 'EVBull',
      avatar: 'EB',
      message: 'Tesla delivery numbers were disappointing. Staying on the sidelines.',
      timestamp: '09:52 AM',
      stock: 'TSLA'
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState(247);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const stockMessages = messages.filter(msg => msg.stock === selectedStock);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [stockMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: 'You',
      avatar: 'YO',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      stock: selectedStock
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 flex flex-col h-[700px]">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle className="w-6 h-6 mr-3 text-teal-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Live Discussion</h2>
              <p className="text-sm text-slate-400">{selectedStock} Trading Room</p>
            </div>
          </div>
          <div className="flex items-center bg-emerald-500/20 px-3 py-2 rounded-lg border border-emerald-500/50">
            <Users className="w-4 h-4 mr-2 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">{activeUsers} online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {stockMessages.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          stockMessages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-semibold text-white">{msg.user}</span>
                  <span className="text-xs text-slate-500">{msg.timestamp}</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg rounded-tl-none px-3 py-2 border border-slate-700">
                  <p className="text-sm text-slate-300">{msg.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-700">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Share your thoughts on ${selectedStock}...`}
            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="bg-teal-500 hover:bg-teal-600 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-2">
          Be respectful and follow community guidelines. No financial advice.
        </p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.7);
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
