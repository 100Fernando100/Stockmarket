import { TrendingUp, TrendingDown, Minus, User, Clock, ThumbsUp, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface InvestorFeedProps {
  selectedStock: string;
}

interface Recommendation {
  id: string;
  investor: string;
  avatar: string;
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  stock: string;
  price: number;
  reason: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export default function InvestorFeed({ selectedStock }: InvestorFeedProps) {
  const [filter, setFilter] = useState<'ALL' | 'BUY' | 'SELL' | 'HOLD'>('ALL');

  const allRecommendations: Recommendation[] = [
    {
      id: '1',
      investor: 'Sarah Chen',
      avatar: 'SC',
      recommendation: 'BUY',
      stock: 'AAPL',
      price: 178.25,
      reason: 'Strong iPhone 15 sales and services growth. P/E ratio attractive compared to historical average.',
      timestamp: '2 hours ago',
      likes: 142,
      comments: 23
    },
    {
      id: '2',
      investor: 'Michael Rodriguez',
      avatar: 'MR',
      recommendation: 'HOLD',
      stock: 'AAPL',
      price: 178.25,
      reason: 'Waiting for Q4 earnings report. Current valuation is fair but not compelling.',
      timestamp: '4 hours ago',
      likes: 89,
      comments: 15
    },
    {
      id: '3',
      investor: 'David Kim',
      avatar: 'DK',
      recommendation: 'BUY',
      stock: 'NVDA',
      price: 495.20,
      reason: 'AI chip demand continues to exceed supply. Data center revenue up 200% YoY.',
      timestamp: '5 hours ago',
      likes: 256,
      comments: 47
    },
    {
      id: '4',
      investor: 'Emma Thompson',
      avatar: 'ET',
      recommendation: 'SELL',
      stock: 'TSLA',
      price: 248.90,
      reason: 'Increasing competition in EV market. Valuation still too high despite recent correction.',
      timestamp: '6 hours ago',
      likes: 103,
      comments: 67
    },
    {
      id: '5',
      investor: 'James Park',
      avatar: 'JP',
      recommendation: 'BUY',
      stock: 'MSFT',
      price: 385.40,
      reason: 'Azure growth accelerating with AI integration. Office 365 subscriptions hitting new records.',
      timestamp: '7 hours ago',
      likes: 178,
      comments: 31
    },
    {
      id: '6',
      investor: 'Lisa Wang',
      avatar: 'LW',
      recommendation: 'HOLD',
      stock: 'GOOGL',
      price: 142.50,
      reason: 'Search dominance remains but AI competition from Microsoft is concerning. Monitoring closely.',
      timestamp: '9 hours ago',
      likes: 95,
      comments: 19
    },
    {
      id: '7',
      investor: 'Robert Martinez',
      avatar: 'RM',
      recommendation: 'BUY',
      stock: 'META',
      price: 352.10,
      reason: 'Metaverse investments showing promise. Instagram and WhatsApp monetization improving.',
      timestamp: '11 hours ago',
      likes: 167,
      comments: 38
    },
    {
      id: '8',
      investor: 'Sophia Lee',
      avatar: 'SL',
      recommendation: 'BUY',
      stock: 'AMZN',
      price: 155.80,
      reason: 'AWS margins expanding. E-commerce efficiency improvements driving profitability.',
      timestamp: '13 hours ago',
      likes: 134,
      comments: 26
    },
  ];

  const filteredRecommendations = allRecommendations.filter(rec => {
    const matchesStock = rec.stock === selectedStock;
    const matchesFilter = filter === 'ALL' || rec.recommendation === filter;
    return matchesStock && matchesFilter;
  });

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'BUY': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50';
      case 'SELL': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'HOLD': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/50';
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'BUY': return TrendingUp;
      case 'SELL': return TrendingDown;
      case 'HOLD': return Minus;
      default: return Minus;
    }
  };

  const sentiment = {
    buy: filteredRecommendations.filter(r => r.recommendation === 'BUY').length,
    sell: filteredRecommendations.filter(r => r.recommendation === 'SELL').length,
    hold: filteredRecommendations.filter(r => r.recommendation === 'HOLD').length,
  };

  const total = sentiment.buy + sentiment.sell + sentiment.hold;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <User className="w-6 h-6 mr-3 text-blue-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Community Sentiment</h2>
            <p className="text-sm text-slate-400 mt-1">What other investors are saying about {selectedStock}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === 'ALL'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('BUY')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === 'BUY'
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setFilter('HOLD')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === 'HOLD'
                ? 'bg-yellow-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Hold
          </button>
          <button
            onClick={() => setFilter('SELL')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === 'SELL'
                ? 'bg-red-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      {total > 0 && (
        <div className="mb-6 bg-slate-800/30 rounded-xl p-4 border border-slate-700">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Overall Sentiment</h3>
          <div className="flex gap-4 mb-3">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-emerald-400" />
              <span className="text-sm text-slate-300">Buy: <span className="font-bold text-emerald-400">{sentiment.buy}</span></span>
            </div>
            <div className="flex items-center">
              <Minus className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm text-slate-300">Hold: <span className="font-bold text-yellow-400">{sentiment.hold}</span></span>
            </div>
            <div className="flex items-center">
              <TrendingDown className="w-4 h-4 mr-2 text-red-400" />
              <span className="text-sm text-slate-300">Sell: <span className="font-bold text-red-400">{sentiment.sell}</span></span>
            </div>
          </div>
          <div className="flex w-full h-3 rounded-full overflow-hidden bg-slate-700">
            {sentiment.buy > 0 && (
              <div
                className="bg-emerald-500 transition-all duration-500"
                style={{ width: `${(sentiment.buy / total) * 100}%` }}
              />
            )}
            {sentiment.hold > 0 && (
              <div
                className="bg-yellow-500 transition-all duration-500"
                style={{ width: `${(sentiment.hold / total) * 100}%` }}
              />
            )}
            {sentiment.sell > 0 && (
              <div
                className="bg-red-500 transition-all duration-500"
                style={{ width: `${(sentiment.sell / total) * 100}%` }}
              />
            )}
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredRecommendations.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No recommendations for {selectedStock} yet</p>
          </div>
        ) : (
          filteredRecommendations.map((rec) => {
            const Icon = getRecommendationIcon(rec.recommendation);
            return (
              <div
                key={rec.id}
                className="bg-slate-800/30 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                      {rec.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{rec.investor}</h4>
                      <div className="flex items-center text-xs text-slate-400 mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {rec.timestamp}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full border ${getRecommendationColor(rec.recommendation)}`}>
                    <Icon className="w-3 h-3 mr-1" />
                    <span className="text-xs font-bold">{rec.recommendation}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-bold text-white mr-2">{rec.stock}</span>
                    <span className="text-sm text-slate-400">${rec.price}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{rec.reason}</p>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-slate-700">
                  <button className="flex items-center text-slate-400 hover:text-emerald-400 transition-colors">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span className="text-xs">{rec.likes}</span>
                  </button>
                  <button className="flex items-center text-slate-400 hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs">{rec.comments}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
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
      `}</style>
    </div>
  );
}
