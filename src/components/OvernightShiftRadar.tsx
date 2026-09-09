import { useState } from 'react';
import {
  Zap,
  TrendingUp,
  AlertTriangle,
  Flame,
  ArrowUpRight,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { PoliticalSignal } from '../types';

interface OvernightShiftRadarProps {
  signals: PoliticalSignal[];
}

export default function OvernightShiftRadar({ signals }: OvernightShiftRadarProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('ALL');

  const filteredSignals = signals.filter(s => {
    const matchesLevel = selectedLevel === 'ALL' || s.level === selectedLevel;
    const matchesTimeframe = selectedTimeframe === 'ALL' || s.timeframe.includes(selectedTimeframe);
    return matchesLevel && matchesTimeframe;
  });

  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'HIGH SIGNAL':
        return {
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          border: 'border-rose-500/40',
          glow: 'from-rose-950/30 to-slate-900',
          icon: Flame,
          iconColor: 'text-rose-400'
        };
      case 'MEDIUM SIGNAL':
        return {
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          border: 'border-amber-500/40',
          glow: 'from-amber-950/30 to-slate-900',
          icon: AlertTriangle,
          iconColor: 'text-amber-400'
        };
      default:
        return {
          badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
          border: 'border-sky-500/40',
          glow: 'from-sky-950/30 to-slate-900',
          icon: Sparkles,
          iconColor: 'text-sky-400'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg">
                <Zap className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">
                Overnight Political Shift Detector &amp; Early Warning Radar
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Algorithmic comparative analysis evaluating the previous 24 hours against 7-day, 30-day, and 90-day baselines. Detects rapid topic surges, abnormal politician media volume, regional activity anomalies, and sentiment polarizations.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs font-mono text-rose-300 font-bold">
              3 High Signals Detected
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> Severity:
            </span>
            {['ALL', 'HIGH SIGNAL', 'MEDIUM SIGNAL', 'EMERGING SIGNAL'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-slate-700 text-white border border-slate-600'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1">Timeframe:</span>
            {['ALL', '24h vs 7d', '24h vs 30d', 'Overnight Surge'].map(tf => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {filteredSignals.map(sig => {
          const style = getLevelStyle(sig.level);
          const Icon = style.icon;
          return (
            <div
              key={sig.id}
              className={`bg-gradient-to-r ${style.glow} border ${style.border} rounded-xl p-5 shadow-lg relative overflow-hidden transition-all`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-slate-900/80 border border-slate-800 ${style.iconColor} shrink-0 mt-0.5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase border ${style.badge}`}>
                        {sig.level}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {sig.targetType}:
                      </span>
                      <span className="text-sm font-black text-white">
                        {sig.targetName}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-300 leading-relaxed max-w-4xl">
                      {sig.context}
                    </p>
                  </div>
                </div>

                <div className="text-left md:text-right shrink-0 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-medium text-slate-400 block">{sig.changeMetric}</span>
                  <span className="text-2xl font-black text-white font-mono">{sig.changeValue}</span>
                  <span className="text-[10px] text-emerald-400 block font-semibold">{sig.timeframe}</span>
                </div>
              </div>

              {/* Bottom Meta & Sentiment Shift */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                {sig.sentimentShift && (
                  <div className="flex items-center space-x-1.5 text-slate-300">
                    <span className="text-slate-400 font-medium">Sentiment Trajectory:</span>
                    <span className="font-semibold text-rose-300">{sig.sentimentShift}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3 font-mono text-[11px]">
                  <span>Statistical Confidence: <strong className="text-emerald-400">{(sig.confidenceScore * 100).toFixed(0)}%</strong></span>
                  <span>Detected: {new Date(sig.detectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} EAT</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
