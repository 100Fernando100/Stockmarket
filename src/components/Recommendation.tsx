import { TrendingUp, TrendingDown, Minus, Target, Activity, BarChart3, AlertCircle } from 'lucide-react';

interface RecommendationProps {
  selectedStock: string;
}

interface StockMetrics {
  currentPrice: number;
  high: number;
  low: number;
  volume: number;
  avgVolume: number;
  marketCap: number;
  pe: number;
  dayChange: number;
}

export default function Recommendation({ selectedStock }: RecommendationProps) {
  const stockMetrics: Record<string, StockMetrics> = {
    AAPL: { currentPrice: 178.25, high: 182.34, low: 175.12, volume: 52.3, avgVolume: 48.5, marketCap: 2800, pe: 28.5, dayChange: 2.3 },
    GOOGL: { currentPrice: 142.50, high: 145.80, low: 140.20, volume: 28.5, avgVolume: 25.2, marketCap: 1750, pe: 26.2, dayChange: 1.8 },
    MSFT: { currentPrice: 385.40, high: 390.15, low: 382.50, volume: 31.2, avgVolume: 29.8, marketCap: 2900, pe: 32.1, dayChange: 1.5 },
    AMZN: { currentPrice: 155.80, high: 158.90, low: 153.45, volume: 45.7, avgVolume: 42.3, marketCap: 1600, pe: 45.2, dayChange: 2.1 },
    TSLA: { currentPrice: 248.90, high: 255.20, low: 245.10, volume: 98.4, avgVolume: 85.6, marketCap: 790, pe: 68.5, dayChange: 3.5 },
    NVDA: { currentPrice: 495.20, high: 502.30, low: 488.90, volume: 67.8, avgVolume: 55.2, marketCap: 1220, pe: 55.8, dayChange: 2.8 },
    META: { currentPrice: 352.10, high: 358.45, low: 348.20, volume: 19.6, avgVolume: 18.9, marketCap: 920, pe: 24.3, dayChange: 1.9 },
    JPM: { currentPrice: 165.30, high: 168.50, low: 163.10, volume: 12.4, avgVolume: 11.8, marketCap: 480, pe: 12.5, dayChange: 1.2 },
    V: { currentPrice: 258.70, high: 262.40, low: 256.30, volume: 8.9, avgVolume: 8.2, marketCap: 540, pe: 31.2, dayChange: 0.9 },
    WMT: { currentPrice: 168.40, high: 170.80, low: 166.90, volume: 14.2, avgVolume: 13.5, marketCap: 450, pe: 28.7, dayChange: 1.1 },
  };

  const metrics = stockMetrics[selectedStock] || stockMetrics.AAPL;

  const calculateRecommendation = () => {
    let score = 50;
    const factors = [];

    const pricePosition = ((metrics.currentPrice - metrics.low) / (metrics.high - metrics.low)) * 100;
    if (pricePosition < 30) {
      score += 15;
      factors.push({ name: 'Price near support level', impact: '+15', positive: true });
    } else if (pricePosition > 70) {
      score -= 10;
      factors.push({ name: 'Price near resistance', impact: '-10', positive: false });
    } else {
      score += 5;
      factors.push({ name: 'Price in mid-range', impact: '+5', positive: true });
    }

    const volumeRatio = (metrics.volume / metrics.avgVolume) * 100;
    if (volumeRatio > 115) {
      score += 12;
      factors.push({ name: 'High trading volume', impact: '+12', positive: true });
    } else if (volumeRatio < 85) {
      score -= 8;
      factors.push({ name: 'Low trading volume', impact: '-8', positive: false });
    } else {
      score += 3;
      factors.push({ name: 'Normal trading volume', impact: '+3', positive: true });
    }

    if (metrics.dayChange > 2) {
      score += 10;
      factors.push({ name: 'Strong positive momentum', impact: '+10', positive: true });
    } else if (metrics.dayChange < 0) {
      score -= 12;
      factors.push({ name: 'Negative momentum', impact: '-12', positive: false });
    } else {
      score += 5;
      factors.push({ name: 'Positive momentum', impact: '+5', positive: true });
    }

    if (metrics.pe < 25) {
      score += 8;
      factors.push({ name: 'Attractive valuation', impact: '+8', positive: true });
    } else if (metrics.pe > 50) {
      score -= 10;
      factors.push({ name: 'High valuation risk', impact: '-10', positive: false });
    } else {
      score += 2;
      factors.push({ name: 'Fair valuation', impact: '+2', positive: true });
    }

    if (metrics.marketCap > 1000) {
      score += 5;
      factors.push({ name: 'Large-cap stability', impact: '+5', positive: true });
    }

    let recommendation = 'HOLD';
    let color = 'text-yellow-400';
    let bgColor = 'bg-yellow-500/20';
    let borderColor = 'border-yellow-500/50';
    let icon = Minus;

    if (score >= 70) {
      recommendation = 'STRONG BUY';
      color = 'text-emerald-400';
      bgColor = 'bg-emerald-500/20';
      borderColor = 'border-emerald-500/50';
      icon = TrendingUp;
    } else if (score >= 60) {
      recommendation = 'BUY';
      color = 'text-emerald-400';
      bgColor = 'bg-emerald-500/20';
      borderColor = 'border-emerald-500/50';
      icon = TrendingUp;
    } else if (score <= 40) {
      recommendation = 'SELL';
      color = 'text-red-400';
      bgColor = 'bg-red-500/20';
      borderColor = 'border-red-500/50';
      icon = TrendingDown;
    }

    return { recommendation, score, color, bgColor, borderColor, icon, factors };
  };

  const analysis = calculateRecommendation();
  const Icon = analysis.icon;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <div className="flex items-center mb-6">
        <Target className="w-6 h-6 mr-3 text-emerald-400" />
        <div>
          <h2 className="text-xl font-bold text-white">Investment Recommendation</h2>
          <p className="text-sm text-slate-400 mt-1">AI-powered analysis based on market indicators</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-1 ${analysis.bgColor} rounded-xl p-6 border-2 ${analysis.borderColor}`}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
              <Icon className={`w-8 h-8 ${analysis.color}`} />
            </div>
            <h3 className={`text-3xl font-bold ${analysis.color} mb-2`}>{analysis.recommendation}</h3>
            <p className="text-slate-400 text-sm mb-4">for {selectedStock}</p>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Confidence Score</span>
                <span className={`text-lg font-bold ${analysis.color}`}>{analysis.score}/100</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    analysis.score >= 70 ? 'bg-emerald-500' : analysis.score <= 40 ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${analysis.score}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-teal-400" />
              Analysis Factors
            </h3>
            <div className="space-y-3">
              {analysis.factors.map((factor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
                >
                  <div className="flex items-center">
                    {factor.positive ? (
                      <TrendingUp className="w-4 h-4 mr-3 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-3 text-red-400" />
                    )}
                    <span className="text-slate-300 text-sm">{factor.name}</span>
                  </div>
                  <span className={`text-sm font-bold ${factor.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {factor.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center mb-2">
                <BarChart3 className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-slate-400 text-xs">Key Metrics</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-xs">P/E Ratio</span>
                  <span className="text-white text-xs font-semibold">{metrics.pe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-xs">Market Cap</span>
                  <span className="text-white text-xs font-semibold">${metrics.marketCap}B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-xs">Day Change</span>
                  <span className={`text-xs font-semibold ${metrics.dayChange > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    +{metrics.dayChange}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-4 h-4 mr-2 text-amber-400" />
                <span className="text-slate-400 text-xs">Risk Level</span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-lg font-bold ${
                    analysis.score >= 70 ? 'text-emerald-400' : analysis.score <= 40 ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {analysis.score >= 70 ? 'LOW' : analysis.score <= 40 ? 'HIGH' : 'MEDIUM'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Based on volatility, valuation, and market conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <p className="text-xs text-slate-400 text-center">
          <AlertCircle className="w-3 h-3 inline mr-1" />
          This recommendation is generated algorithmically and should not be considered as financial advice.
          Always conduct your own research and consult with a financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
}
