import {
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  Zap,
  Target,
  Gauge,
  LineChart,
  DollarSign,
  Percent,
} from 'lucide-react';

interface IndicatorGridProps {
  selectedStock: string;
  selectedIndicator: string | null;
  onIndicatorClick: (indicator: string) => void;
}

export default function IndicatorGrid({ selectedStock, selectedIndicator, onIndicatorClick }: IndicatorGridProps) {
  const indicators = [
    {
      id: 'rsi',
      name: 'RSI (14)',
      value: '65.4',
      status: 'Neutral',
      icon: Activity,
      color: 'yellow',
      description: 'Relative Strength Index',
      range: '65.4/100',
    },
    {
      id: 'macd',
      name: 'MACD',
      value: '+12.5',
      status: 'Bullish',
      icon: TrendingUp,
      color: 'emerald',
      description: 'Moving Average Convergence',
      range: 'Above Signal',
    },
    {
      id: 'volume',
      name: 'Volume',
      value: '3.8B',
      status: 'High',
      icon: BarChart3,
      color: 'blue',
      description: 'Trading Volume',
      range: '+15% Avg',
    },
    {
      id: 'marketcap',
      name: 'Market Cap',
      value: '$42.1T',
      status: 'Growing',
      icon: PieChart,
      color: 'teal',
      description: 'Total Market Valuation',
      range: '+2.3% WoW',
    },
    {
      id: 'volatility',
      name: 'Volatility Index',
      value: '14.2',
      status: 'Low',
      icon: Zap,
      color: 'orange',
      description: 'VIX Fear Gauge',
      range: 'Below 20',
    },
    {
      id: 'pe',
      name: 'P/E Ratio',
      value: '23.5',
      status: 'Fair',
      icon: Target,
      color: 'cyan',
      description: 'Price to Earnings',
      range: 'Historical Avg',
    },
    {
      id: 'momentum',
      name: 'Momentum',
      value: '78.9',
      status: 'Strong',
      icon: Gauge,
      color: 'emerald',
      description: 'Price Momentum',
      range: 'Uptrend',
    },
    {
      id: 'ma50',
      name: 'Moving Avg (50)',
      value: '4,756',
      status: 'Above',
      icon: LineChart,
      color: 'blue',
      description: '50-Day MA',
      range: '+0.6% Current',
    },
    {
      id: '52w',
      name: '52W High/Low',
      value: '15.8%',
      status: 'Near High',
      icon: DollarSign,
      color: 'emerald',
      description: 'Year Range Position',
      range: '84.2% Range',
    },
    {
      id: 'advdec',
      name: 'Advance/Decline',
      value: '2.1:1',
      status: 'Positive',
      icon: Percent,
      color: 'teal',
      description: 'Breadth Indicator',
      range: 'Bullish Breadth',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
      emerald: {
        bg: 'bg-emerald-500/20',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        glow: 'hover:shadow-emerald-500/20',
      },
      blue: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        glow: 'hover:shadow-blue-500/20',
      },
      yellow: {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-400',
        border: 'border-yellow-500/30',
        glow: 'hover:shadow-yellow-500/20',
      },
      teal: {
        bg: 'bg-teal-500/20',
        text: 'text-teal-400',
        border: 'border-teal-500/30',
        glow: 'hover:shadow-teal-500/20',
      },
      orange: {
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
        glow: 'hover:shadow-orange-500/20',
      },
      cyan: {
        bg: 'bg-cyan-500/20',
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        glow: 'hover:shadow-cyan-500/20',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Technical Indicators</h2>
        <p className="text-slate-400">Real-time market metrics and analysis tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {indicators.map((indicator, index) => {
          const colors = getColorClasses(indicator.color);
          const Icon = indicator.icon;
          const isSelected = selectedIndicator === indicator.id;

          return (
            <button
              key={index}
              onClick={() => onIndicatorClick(indicator.id)}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border ${colors.border} hover:border-opacity-100 transition-all hover:shadow-xl ${colors.glow} group text-left w-full ${
                isSelected ? `ring-2 ring-offset-2 ring-offset-slate-900 ${colors.text.replace('text-', 'ring-')} scale-105 shadow-2xl` : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${colors.bg}`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                  {indicator.status}
                </span>
              </div>

              <h3 className="text-white font-semibold text-sm mb-1">{indicator.name}</h3>
              <p className="text-xs text-slate-400 mb-3">{indicator.description}</p>

              <div className="space-y-2">
                <p className={`text-2xl font-bold ${colors.text}`}>{indicator.value}</p>
                <p className="text-xs text-slate-500">{indicator.range}</p>
              </div>

              <div className="mt-4 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${colors.bg} ${colors.text.replace('text-', 'bg-')} transition-all group-hover:animate-pulse`}
                  style={{ width: `${50 + Math.random() * 50}%` }}
                />
              </div>

              {isSelected && (
                <div className="mt-3 text-xs text-center text-emerald-400 font-semibold animate-pulse">
                  ✓ Selected
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
