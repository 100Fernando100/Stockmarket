import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useState } from 'react';

interface MarketOverviewProps {
  selectedStock: string;
}

export default function MarketOverview({ selectedStock }: MarketOverviewProps) {
  const [selectedMarket, setSelectedMarket] = useState<string>('S&P 500');

  const markets = [
    { name: 'S&P 500', value: '4,783.45', change: '+1.24%', positive: true, volume: '3.2B' },
    { name: 'NASDAQ', value: '15,095.14', change: '+1.67%', positive: true, volume: '4.8B' },
    { name: 'DOW JONES', value: '37,305.16', change: '-0.32%', positive: false, volume: '2.1B' },
    { name: 'RUSSELL 2000', value: '2,067.89', change: '+0.89%', positive: true, volume: '1.5B' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {markets.map((market, index) => (
        <div
          key={index}
          onClick={() => setSelectedMarket(market.name)}
          className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 cursor-pointer group ${
            selectedMarket === market.name
              ? 'border-emerald-500 shadow-2xl shadow-emerald-500/20 scale-105 -translate-y-1'
              : 'border-slate-700 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-105 hover:-translate-y-1'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium group-hover:text-emerald-300 transition-colors">{market.name}</p>
              <p className="text-2xl font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">{market.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${market.positive ? 'bg-emerald-500/20 group-hover:bg-emerald-500/40' : 'bg-red-500/20 group-hover:bg-red-500/40'} transition-colors`}>
              {market.positive ? (
                <TrendingUp className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-sm font-semibold ${market.positive ? 'text-emerald-400' : 'text-red-400'}`}>
              {market.change}
            </span>
            <span className="text-xs text-slate-500 flex items-center">
              <Activity className="w-3 h-3 mr-1" />
              {market.volume}
            </span>
          </div>

          <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${market.positive ? 'bg-emerald-500 group-hover:bg-emerald-400' : 'bg-red-500 group-hover:bg-red-400'} group-hover:animate-pulse`}
              style={{ width: market.positive ? '75%' : '35%' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
