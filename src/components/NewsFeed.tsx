import { Newspaper, Clock, TrendingUp, ExternalLink } from 'lucide-react';

interface NewsFeedProps {
  selectedStock: string;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  summary: string;
  url: string;
  stock: string;
}

export default function NewsFeed({ selectedStock }: NewsFeedProps) {
  const allNews: NewsItem[] = [
    {
      id: '1',
      title: 'Apple Announces Record-Breaking Q4 Earnings',
      source: 'Bloomberg',
      time: '1 hour ago',
      sentiment: 'positive',
      summary: 'iPhone sales exceed analyst expectations with 12% YoY growth in services revenue.',
      url: '#',
      stock: 'AAPL'
    },
    {
      id: '2',
      title: 'Supply Chain Concerns Impact Apple Production',
      source: 'Reuters',
      time: '3 hours ago',
      sentiment: 'negative',
      summary: 'Reports suggest potential delays in next-gen product launches due to component shortages.',
      url: '#',
      stock: 'AAPL'
    },
    {
      id: '3',
      title: 'Apple Vision Pro Sees Strong Pre-Orders',
      source: 'TechCrunch',
      time: '5 hours ago',
      sentiment: 'positive',
      summary: 'Early adoption rates surpass projections, indicating strong consumer interest.',
      url: '#',
      stock: 'AAPL'
    },
    {
      id: '4',
      title: 'NVIDIA Secures Major AI Partnership Deal',
      source: 'CNBC',
      time: '2 hours ago',
      sentiment: 'positive',
      summary: 'Tech giant signs multi-billion dollar agreement for AI chip supply.',
      url: '#',
      stock: 'NVDA'
    },
    {
      id: '5',
      title: 'NVIDIA Data Center Revenue Soars 200%',
      source: 'Financial Times',
      time: '4 hours ago',
      sentiment: 'positive',
      summary: 'AI boom drives unprecedented demand for high-performance computing chips.',
      url: '#',
      stock: 'NVDA'
    },
    {
      id: '6',
      title: 'Tesla Delivers Fewer Vehicles Than Expected',
      source: 'Wall Street Journal',
      time: '1 hour ago',
      sentiment: 'negative',
      summary: 'Q4 delivery numbers fall short of analyst estimates amid production challenges.',
      url: '#',
      stock: 'TSLA'
    },
    {
      id: '7',
      title: 'Tesla Expands Supercharger Network',
      source: 'The Verge',
      time: '6 hours ago',
      sentiment: 'positive',
      summary: 'Company announces 500 new charging stations across North America.',
      url: '#',
      stock: 'TSLA'
    },
  ];

  const stockNews = allNews.filter(news => news.stock === selectedStock);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'negative': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'neutral': return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Newspaper className="w-6 h-6 mr-3 text-blue-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Latest News</h2>
            <p className="text-sm text-slate-400 mt-1">{selectedStock} Market Updates</p>
          </div>
        </div>
        <button className="text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center">
          View All
          <ExternalLink className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {stockNews.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No news available for {selectedStock}</p>
          </div>
        ) : (
          stockNews.map((news) => (
            <a
              key={news.id}
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-slate-800/30 rounded-xl p-4 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">
                    {news.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-semibold text-slate-300">{news.source}</span>
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {news.time}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full border text-xs font-semibold ${getSentimentColor(news.sentiment)}`}>
                  {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
                </div>
              </div>
            </a>
          ))
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
