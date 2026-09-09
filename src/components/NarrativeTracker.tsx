import React from 'react';
import {
  Compass,
  TrendingUp,
  Activity,
  Users,
  MapPin,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { EmergingNarrative } from '../types';

interface NarrativeTrackerProps {
  narratives: EmergingNarrative[];
}

export default function NarrativeTracker({ narratives }: NarrativeTrackerProps) {
  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'Peak':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Accelerating':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Emerging':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center">
              <Compass className="w-5 h-5 text-emerald-400 mr-2" />
              Kenyan Political Narrative Lifecycles &amp; Discourse Radar
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Tracking the emergence, velocity, peak saturation, and maturation of dominant national political narratives across traditional media, broadcast channels, and civil society discussions.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>4 Active Strategic Narratives Monitored</span>
          </div>
        </div>
      </div>

      {/* Narratives List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {narratives.map(nar => (
          <div
            key={nar.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className={`text-[11px] px-2.5 py-0.5 rounded-md font-bold uppercase border ${getStageBadge(nar.lifecycleStage)}`}>
                  {nar.lifecycleStage} Stage
                </span>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-400">Velocity: </span>
                  <span className="text-sm font-extrabold text-emerald-400 font-mono">{nar.velocityScore}/100</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mt-3 leading-snug">
                {nar.headline}
              </h3>

              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {nar.summary}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              {/* Sentiment Profile */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                  <span>Sentiment Resonance Profile:</span>
                  <span className="font-mono text-emerald-400 font-semibold">{nar.sourcesCount} Verified Sources</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
                  <div style={{ width: `${nar.sentimentProfile.positive}%` }} className="bg-emerald-500"></div>
                  <div style={{ width: `${nar.sentimentProfile.neutral}%` }} className="bg-slate-500"></div>
                  <div style={{ width: `${nar.sentimentProfile.negative}%` }} className="bg-rose-500"></div>
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-emerald-400 font-semibold">{nar.sentimentProfile.positive}% Pos</span>
                  <span className="text-slate-400">{nar.sentimentProfile.neutral}% Neu</span>
                  <span className="text-rose-400 font-semibold">{nar.sentimentProfile.negative}% Neg</span>
                </div>
              </div>

              {/* Key Actors & Counties */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="text-slate-400 text-[11px]">Primary Actors:</span>
                  <span className="text-slate-200 text-[11px] font-medium truncate">
                    {nar.associatedPoliticians.join(', ')}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-400 text-[11px]">Key Counties:</span>
                  <span className="text-slate-200 text-[11px] font-medium truncate">
                    {nar.associatedCounties.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
