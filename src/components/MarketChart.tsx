import { LineChart } from 'lucide-react';
import { useState } from 'react';

interface MarketChartProps {
  selectedStock: string;
}

export default function MarketChart({ selectedStock }: MarketChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('1D');

  const stockData: Record<string, { name: string; currentPrice: string; high: string; low: string; volume: string }> = {
    AAPL: { name: 'Apple Inc.', currentPrice: '178.25', high: '182.34', low: '175.12', volume: '52.3M' },
    GOOGL: { name: 'Alphabet Inc.', currentPrice: '142.50', high: '145.80', low: '140.20', volume: '28.5M' },
    MSFT: { name: 'Microsoft Corp.', currentPrice: '385.40', high: '390.15', low: '382.50', volume: '31.2M' },
    AMZN: { name: 'Amazon.com Inc.', currentPrice: '155.80', high: '158.90', low: '153.45', volume: '45.7M' },
    TSLA: { name: 'Tesla Inc.', currentPrice: '248.90', high: '255.20', low: '245.10', volume: '98.4M' },
    NVDA: { name: 'NVIDIA Corp.', currentPrice: '495.20', high: '502.30', low: '488.90', volume: '67.8M' },
    META: { name: 'Meta Platforms', currentPrice: '352.10', high: '358.45', low: '348.20', volume: '19.6M' },
    JPM: { name: 'JPMorgan Chase', currentPrice: '165.30', high: '168.50', low: '163.10', volume: '12.4M' },
    V: { name: 'Visa Inc.', currentPrice: '258.70', high: '262.40', low: '256.30', volume: '8.9M' },
    WMT: { name: 'Walmart Inc.', currentPrice: '168.40', high: '170.80', low: '166.90', volume: '14.2M' },
  };

  const currentStock = stockData[selectedStock] || stockData.AAPL;

  const generateChartData = (period: string) => {
    const dataPoints = period === '1D' ? 50 : period === '1W' ? 40 : period === '1M' ? 35 : period === '3M' ? 30 : 25;
    return Array.from({ length: dataPoints }).map(() => 20 + Math.random() * 80);
  };

  const chartData = generateChartData(selectedPeriod);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center">
            <LineChart className="w-5 h-5 mr-2 text-emerald-400" />
            {currentStock.name} ({selectedStock})
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Current Price: <span className="text-emerald-400 font-semibold">${currentStock.currentPrice}</span>
          </p>
        </div>

        <div className="flex space-x-2">
          {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition ${
                selectedPeriod === period
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64 flex items-end justify-between space-x-1">
        {chartData.map((height, i) => {
          const isPositive = i === 0 ? true : chartData[i] > chartData[i - 1];
          return (
            <div
              key={i}
              className={`flex-1 rounded-t transition-all hover:opacity-80 hover:scale-y-105 cursor-pointer ${
                isPositive ? 'bg-gradient-to-t from-emerald-500 to-emerald-400' : 'bg-gradient-to-t from-red-500 to-red-400'
              }`}
              style={{ height: `${height}%` }}
              title={`${selectedPeriod} - Bar ${i + 1}`}
            />
          );
        })}

        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
            <polyline
              points="0,80 50,75 100,60 150,65 200,45 250,50 300,35 350,40 400,25 450,30 500,20"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              className="opacity-60"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700">
        <div className="text-center">
          <p className="text-slate-400 text-xs">{selectedPeriod} High</p>
          <p className="text-emerald-400 font-bold text-lg mt-1">${currentStock.high}</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-xs">{selectedPeriod} Low</p>
          <p className="text-red-400 font-bold text-lg mt-1">${currentStock.low}</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-xs">Volume</p>
          <p className="text-teal-400 font-bold text-lg mt-1">{currentStock.volume}</p>
        </div>
      </div>
    </div>
  );
}
