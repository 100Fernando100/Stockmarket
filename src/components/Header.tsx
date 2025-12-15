import { TrendingUp, BarChart3, Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Market Analytics</h1>
              <p className="text-xs text-slate-400">Real-time Trading Insights</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition">
              <BarChart3 className="w-4 h-4" />
              <span>Markets</span>
            </button>
            <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition">
              <Activity className="w-4 h-4" />
              <span>Indicators</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
