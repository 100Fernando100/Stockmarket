import { TrendingUp, ChevronDown } from 'lucide-react';

interface StockSelectorProps {
  selectedStock: string;
  setSelectedStock: (stock: string) => void;
}

export default function StockSelector({ selectedStock, setSelectedStock }: StockSelectorProps) {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$178.25', change: '+1.2%' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$142.50', change: '+0.8%' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$385.40', change: '+1.5%' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '$155.80', change: '-0.3%' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '$248.90', change: '+2.1%' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$495.20', change: '+3.4%' },
    { symbol: 'META', name: 'Meta Platforms', price: '$352.10', change: '+1.1%' },
    { symbol: 'JPM', name: 'JPMorgan Chase', price: '$165.30', change: '+0.5%' },
    { symbol: 'V', name: 'Visa Inc.', price: '$258.70', change: '+0.9%' },
    { symbol: 'WMT', name: 'Walmart Inc.', price: '$168.40', change: '+0.4%' },
  ];

  const currentStock = stocks.find(s => s.symbol === selectedStock) || stocks[0];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">Select Stock</h2>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{currentStock.price}</p>
          <p className={`text-sm font-semibold ${currentStock.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
            {currentStock.change}
          </p>
        </div>
      </div>

      <div className="relative">
        <select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white appearance-none cursor-pointer focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition pr-10"
        >
          {stocks.map((stock) => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.symbol} - {stock.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-sm text-slate-400">
          Click on any indicator below to see a detailed explanation for <span className="text-emerald-400 font-semibold">{currentStock.symbol}</span>
        </p>
      </div>
    </div>
  );
}
