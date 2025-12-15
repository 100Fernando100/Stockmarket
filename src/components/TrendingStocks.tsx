import { Flame, TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface TrendingStocksProps {
  onStockSelect: (stock: string) => void;
}

interface TrendingStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  rank: number;
}

export default function TrendingStocks({ onStockSelect }: TrendingStocksProps) {
  const trendingStocks: TrendingStock[] = [
    {
      rank: 1,
      symbol: 'NVDA',
      name: 'NVIDIA',
      price: 495.20,
      change: 12.45,
      changePercent: 2.58,
      volume: '48.2M'
    },
    {
      rank: 2,
      symbol: 'TSLA',
      name: 'Tesla',
      price: 248.90,
      change: 8.76,
      changePercent: 3.64,
      volume: '125.6M'
    },
    {
      rank: 3,
      symbol: 'META',
      name: 'Meta',
      price: 352.10,
      change: 5.23,
      changePercent: 1.51,
      volume: '18.9M'
    },
    {
      rank: 4,
      symbol: 'AAPL',
      name: 'Apple',
      price: 178.25,
      change: 2.15,
      changePercent: 1.22,
      volume: '52.4M'
    },
    {
      rank: 5,
      symbol: 'AMD',
      name: 'AMD',
      price: 142.80,
      change: 4.32,
      changePercent: 3.12,
      volume: '64.3M'
    },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-br from-amber-500 to-orange-600 text-white';
      case 2: return 'bg-gradient-to-br from-slate-400 to-slate-500 text-white';
      case 3: return 'bg-gradient-to-br from-amber-700 to-amber-800 text-white';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Flame className="w-6 h-6 mr-3 text-orange-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Trending Now</h2>
            <p className="text-sm text-slate-400 mt-1">Most active stocks today</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {trendingStocks.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => onStockSelect(stock.symbol)}
            className="bg-slate-800/30 rounded-xl p-4 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${getRankColor(stock.rank)}`}>
                {stock.rank}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h3 className="text-white font-bold group-hover:text-blue-400 transition-colors">
                      {stock.symbol}
                    </h3>
                    <p className="text-xs text-slate-400">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">${stock.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className={`flex items-center text-sm font-semibold ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    <span>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-slate-500">
                    <Activity className="w-3 h-3 mr-1" />
                    {stock.volume}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">
          Updated every 5 minutes during market hours
        </p>
      </div>
    </div>
  );
}
