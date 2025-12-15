import { Star, TrendingUp, TrendingDown, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface WatchlistProps {
  selectedStock: string;
  onStockSelect: (stock: string) => void;
}

interface WatchlistStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function Watchlist({ selectedStock, onStockSelect }: WatchlistProps) {
  const [watchlist, setWatchlist] = useState<WatchlistStock[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.25, change: 2.15, changePercent: 1.22 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.20, change: 8.45, changePercent: 1.74 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 385.40, change: -1.25, changePercent: -0.32 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.90, change: 3.78, changePercent: 1.54 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.50, change: 1.89, changePercent: 1.34 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Star className="w-6 h-6 mr-3 text-amber-400 fill-amber-400" />
          <div>
            <h2 className="text-xl font-bold text-white">My Watchlist</h2>
            <p className="text-sm text-slate-400 mt-1">{watchlist.length} stocks tracked</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      <div className="space-y-3">
        {watchlist.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="mb-2">Your watchlist is empty</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Add your first stock
            </button>
          </div>
        ) : (
          watchlist.map((stock) => (
            <div
              key={stock.symbol}
              className={`bg-slate-800/30 rounded-xl p-4 border transition-all cursor-pointer group ${
                selectedStock === stock.symbol
                  ? 'border-blue-500 bg-slate-800/60'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => onStockSelect(stock.symbol)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-white font-bold">{stock.symbol}</h3>
                      <p className="text-xs text-slate-400">{stock.name}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWatchlist(stock.symbol);
                      }}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100"
                      aria-label="Remove from watchlist"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">${stock.price.toFixed(2)}</span>
                    <div className={`flex items-center ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      <span className="text-sm font-semibold">
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Add to Watchlist</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter stock symbol (e.g., AAPL)"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-all"
              >
                Add Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
