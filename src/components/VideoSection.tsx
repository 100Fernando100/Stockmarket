import { Youtube, Edit3, Save, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VideoSectionProps {
  selectedStock: string;
  selectedIndicator: string | null;
}

export default function VideoSection({ selectedStock, selectedIndicator }: VideoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  const indicatorVideos: Record<string, { query: string; title: string; description: string }> = {
    rsi: {
      query: 'RSI+indicator+explained+trading',
      title: 'RSI (Relative Strength Index) Explained',
      description: 'Learn how RSI measures momentum and identifies overbought/oversold conditions',
    },
    macd: {
      query: 'MACD+indicator+explained+trading',
      title: 'MACD Trading Strategy',
      description: 'Understanding Moving Average Convergence Divergence for trend analysis',
    },
    volume: {
      query: 'volume+analysis+trading+explained',
      title: 'Volume Analysis in Trading',
      description: 'How to use volume to confirm price movements and trends',
    },
    marketcap: {
      query: 'market+cap+explained+stock+trading',
      title: 'Market Capitalization Explained',
      description: 'Understanding company valuation and market cap categories',
    },
    volatility: {
      query: 'VIX+volatility+index+explained',
      title: 'Volatility Index (VIX) Guide',
      description: 'The fear gauge and how it impacts trading decisions',
    },
    pe: {
      query: 'PE+ratio+explained+stock+valuation',
      title: 'P/E Ratio Analysis',
      description: 'Price to Earnings ratio for stock valuation',
    },
    momentum: {
      query: 'momentum+indicator+trading+explained',
      title: 'Momentum Trading Strategy',
      description: 'Using momentum indicators to identify strong trends',
    },
    ma50: {
      query: 'moving+average+trading+strategy',
      title: '50-Day Moving Average',
      description: 'How moving averages identify support and resistance levels',
    },
    '52w': {
      query: '52+week+high+low+trading+strategy',
      title: '52-Week High/Low Strategy',
      description: 'Trading based on yearly price ranges',
    },
    advdec: {
      query: 'advance+decline+line+market+breadth',
      title: 'Advance/Decline Line',
      description: 'Market breadth indicator for overall market health',
    },
  };

  const getVideoUrl = () => {
    if (isEditing && customUrl) {
      return customUrl;
    }

    if (selectedIndicator && indicatorVideos[selectedIndicator]) {
      const query = `${indicatorVideos[selectedIndicator].query}+${selectedStock}`;
      return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}`;
    }

    return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent('stock market trading basics')}`;
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const currentInfo = selectedIndicator && indicatorVideos[selectedIndicator]
    ? indicatorVideos[selectedIndicator]
    : { title: 'Market Education', description: 'Learn about trading and market analysis' };

  useEffect(() => {
    if (selectedIndicator) {
      setIsEditing(false);
    }
  }, [selectedIndicator]);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Youtube className="w-5 h-5 mr-2 text-red-500" />
            {currentInfo.title}
            {selectedStock && selectedIndicator && (
              <span className="ml-2 text-emerald-400 text-base font-normal">
                for {selectedStock}
              </span>
            )}
          </h2>
          <p className="text-sm text-slate-400 mt-1">{currentInfo.description}</p>
        </div>

        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              <span>Save</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" />
              <span>Custom URL</span>
            </>
          )}
        </button>
      </div>

      {!selectedIndicator && !isEditing && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-200 text-sm font-medium">Click on an indicator above</p>
              <p className="text-blue-300/70 text-xs mt-1">
                Select any of the 10 indicators to see educational videos about that specific indicator for {selectedStock}
              </p>
            </div>
          </div>
        </div>
      )}

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              YouTube Video URL or ID
            </label>
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... or video ID"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
            />
            <p className="text-xs text-slate-500 mt-2">
              Enter a custom YouTube URL to override automatic suggestions
            </p>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
          <iframe
            key={getVideoUrl()}
            src={getVideoUrl()}
            title="Market Analysis Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700">
        <div className="text-center">
          <p className="text-slate-400 text-xs">Selected Stock</p>
          <p className="text-emerald-400 font-semibold text-sm mt-1">{selectedStock}</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-xs">Indicator</p>
          <p className="text-white font-semibold text-sm mt-1">
            {selectedIndicator ? indicatorVideos[selectedIndicator]?.title.split(' ')[0] : 'None'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-xs">Content</p>
          <p className="text-white font-semibold text-sm mt-1">Educational</p>
        </div>
      </div>
    </div>
  );
}
