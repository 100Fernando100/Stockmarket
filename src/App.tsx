import { useState } from 'react';
import Header from './components/Header';
import MarketOverview from './components/MarketOverview';
import IndicatorGrid from './components/IndicatorGrid';
import VideoSection from './components/VideoSection';
import MarketChart from './components/MarketChart';
import StockSelector from './components/StockSelector';
import Recommendation from './components/Recommendation';
import InvestorFeed from './components/InvestorFeed';
import ChatPanel from './components/ChatPanel';
import NewsFeed from './components/NewsFeed';
import Watchlist from './components/Watchlist';
import TrendingStocks from './components/TrendingStocks';

function App() {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <StockSelector selectedStock={selectedStock} setSelectedStock={setSelectedStock} />

            <MarketOverview selectedStock={selectedStock} />

            <MarketChart selectedStock={selectedStock} />

            <IndicatorGrid
              selectedStock={selectedStock}
              selectedIndicator={selectedIndicator}
              onIndicatorClick={setSelectedIndicator}
            />

            <VideoSection
              selectedStock={selectedStock}
              selectedIndicator={selectedIndicator}
            />

            <Recommendation selectedStock={selectedStock} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <InvestorFeed selectedStock={selectedStock} />
              <ChatPanel selectedStock={selectedStock} />
            </div>

            <NewsFeed selectedStock={selectedStock} />
          </div>

          <div className="space-y-8">
            <Watchlist selectedStock={selectedStock} onStockSelect={setSelectedStock} />
            <TrendingStocks onStockSelect={setSelectedStock} />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-700 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>Real-time market data and analysis dashboard</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
