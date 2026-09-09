import { useState } from 'react';
import {
  Users,
  Search,
  TrendingUp,
  MapPin,
  Tag,
  ShieldAlert,
  Flame,
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import { Politician } from '../types';

interface PoliticianTrackerProps {
  politicians: Politician[];
  selectedPoliticianName?: string;
}

export default function PoliticianTracker({
  politicians,
  selectedPoliticianName
}: PoliticianTrackerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParty, setSelectedParty] = useState('ALL');
  const [activePolitician, setActivePolitician] = useState<Politician | null>(
    politicians.find(p => p.name === selectedPoliticianName) || politicians[0] || null
  );

  const parties = ['ALL', 'UDA', 'ODM', 'Wiper', 'DAP-K', 'Independent'];

  const filteredPoliticians = politicians.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.homeCounty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesParty =
      selectedParty === 'ALL' ||
      p.party.toLowerCase().includes(selectedParty.toLowerCase());
    return matchesSearch && matchesParty;
  });

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'MEDIUM':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Methodology Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center">
              <Users className="w-5 h-5 text-emerald-400 mr-2" />
              Kenyan Politician Momentum &amp; Sentiment Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Multi-variable algorithmic scoring assessing media velocity, geographic spread, and public sentiment across 47 counties.
            </p>
          </div>

          {/* Formula weights pill */}
          <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-800/80 rounded-lg border border-slate-700/60 text-[11px] text-slate-300">
            <span className="font-semibold text-emerald-400">Formula Weights:</span>
            <span className="bg-slate-700/60 px-1.5 py-0.5 rounded">30% Mention Growth</span>
            <span className="bg-slate-700/60 px-1.5 py-0.5 rounded">20% Geo Spread</span>
            <span className="bg-slate-700/60 px-1.5 py-0.5 rounded">15% Engagement</span>
            <span className="bg-slate-700/60 px-1.5 py-0.5 rounded">15% Event Activity</span>
            <span className="bg-slate-700/60 px-1.5 py-0.5 rounded">10% Topics</span>
            <span className="bg-slate-700/60 px-1.5 py-0.5 rounded">10% Sentiment</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search politician by name, position, or home county..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
            {parties.map(pty => (
              <button
                key={pty}
                onClick={() => setSelectedParty(pty)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedParty === pty
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {pty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Politician Selector List (Left 5 cols) & Deep Analysis Inspector (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Politician Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[780px] overflow-y-auto pr-1">
          {filteredPoliticians.map(pol => {
            const isSelected = activePolitician?.id === pol.id;
            return (
              <div
                key={pol.id}
                onClick={() => setActivePolitician(pol)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{pol.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{pol.currentPosition}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-emerald-400 font-mono">
                      {pol.momentumScore}
                    </span>
                    <span className="text-[10px] block text-slate-400">Score / 100</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-medium">
                    {pol.party.split('(')[0]}
                  </span>
                  <span className="flex items-center text-emerald-400 font-semibold font-mono text-[11px]">
                    <TrendingUp className="w-3 h-3 mr-1" /> +{pol.mentionGrowth24h}% (24h)
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {pol.mentions24h} mentions
                  </span>
                </div>

                {/* Sentiment Mini Bar */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center space-x-2">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                    <div style={{ width: `${pol.sentimentBreakdown.positive}%` }} className="bg-emerald-500"></div>
                    <div style={{ width: `${pol.sentimentBreakdown.neutral}%` }} className="bg-slate-500"></div>
                    <div style={{ width: `${pol.sentimentBreakdown.negative}%` }} className="bg-rose-500"></div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {pol.sentimentScore > 0 ? `+${pol.sentimentScore.toFixed(2)}` : pol.sentimentScore.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Deep Politician Inspector (7 cols) */}
        {activePolitician ? (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            {/* Top Identity Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-extrabold text-white">{activePolitician.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold ${getRiskBadge(activePolitician.riskLevel)}`}>
                    {activePolitician.riskLevel} VOLATILITY
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium mt-1">
                  {activePolitician.currentPosition}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center">
                    <Layers className="w-3.5 h-3.5 text-slate-400 mr-1" /> {activePolitician.party}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1" /> Base: {activePolitician.homeCounty}
                  </span>
                </div>
              </div>

              {/* Big Momentum Gauge */}
              <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-950 rounded-xl border border-emerald-500/30 text-center min-w-[120px]">
                <span className="text-xs font-semibold text-slate-400 uppercase">Momentum</span>
                <div className="text-3xl font-black text-emerald-400 font-mono my-0.5">
                  {activePolitician.momentumScore}
                </div>
                <span className="text-[10px] text-emerald-300 font-semibold">
                  +{activePolitician.mentionGrowth24h}% velocity
                </span>
              </div>
            </div>

            {/* Momentum Formula Variable Breakdown */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center mb-3">
                <Info className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                6-Variable Momentum Breakdown
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-750">
                  <span className="text-slate-400 block text-[11px]">Mention Growth (30%)</span>
                  <span className="text-sm font-bold text-white font-mono">{activePolitician.momentumBreakdown.mentionGrowth} / 30</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-750">
                  <span className="text-slate-400 block text-[11px]">Geographic Spread (20%)</span>
                  <span className="text-sm font-bold text-white font-mono">{activePolitician.momentumBreakdown.geographicSpread} / 20</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-750">
                  <span className="text-slate-400 block text-[11px]">Public Engagement (15%)</span>
                  <span className="text-sm font-bold text-white font-mono">{activePolitician.momentumBreakdown.publicEngagement} / 15</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-750">
                  <span className="text-slate-400 block text-[11px]">Event Activity (15%)</span>
                  <span className="text-sm font-bold text-white font-mono">{activePolitician.momentumBreakdown.eventActivity} / 15</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-750">
                  <span className="text-slate-400 block text-[11px]">Topic Diversity (10%)</span>
                  <span className="text-sm font-bold text-white font-mono">{activePolitician.momentumBreakdown.topicDiversity} / 10</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-750">
                  <span className="text-slate-400 block text-[11px]">Sentiment Trend (10%)</span>
                  <span className="text-sm font-bold text-white font-mono">{activePolitician.momentumBreakdown.sentimentTrend} / 10</span>
                </div>
              </div>
            </div>

            {/* Sentiment Breakdown Ratio */}
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-750">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Observed Media Sentiment Tone</span>
                <span className="font-mono text-emerald-400">Score: {activePolitician.sentimentScore > 0 ? `+${activePolitician.sentimentScore}` : activePolitician.sentimentScore}</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div style={{ width: `${activePolitician.sentimentBreakdown.positive}%` }} className="bg-emerald-500" title={`Positive: ${activePolitician.sentimentBreakdown.positive}%`}></div>
                <div style={{ width: `${activePolitician.sentimentBreakdown.neutral}%` }} className="bg-slate-500" title={`Neutral: ${activePolitician.sentimentBreakdown.neutral}%`}></div>
                <div style={{ width: `${activePolitician.sentimentBreakdown.negative}%` }} className="bg-rose-500" title={`Negative: ${activePolitician.sentimentBreakdown.negative}%`}></div>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-emerald-400 font-semibold">{activePolitician.sentimentBreakdown.positive}% Positive</span>
                <span className="text-slate-300 font-semibold">{activePolitician.sentimentBreakdown.neutral}% Neutral</span>
                <span className="text-rose-400 font-semibold">{activePolitician.sentimentBreakdown.negative}% Negative</span>
              </div>
            </div>

            {/* Top Associated Topics & County Reach */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center">
                  <Tag className="w-3.5 h-3.5 text-sky-400 mr-1.5" />
                  Primary Associated Topics
                </h4>
                <div className="space-y-1.5">
                  {activePolitician.topTopics.map(t => (
                    <div key={t} className="p-2 bg-slate-800/70 rounded-lg text-xs text-slate-200 border border-slate-700/60">
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                  Primary County Footprint
                </h4>
                <div className="space-y-1.5">
                  {activePolitician.topCounties.map(c => (
                    <div key={c} className="p-2 bg-slate-800/70 rounded-lg text-xs text-slate-200 border border-slate-700/60 flex items-center justify-between">
                      <span>{c} County</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded font-semibold">Active Node</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Aliases & Tracking Note */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-start space-x-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-300">Monitored NLP Aliases: </span>
                <span>{activePolitician.aliases.join(', ')}</span>
                <p className="mt-1 text-[11px] text-slate-400">
                  *Disclaimer: Political momentum scores calculate observational media momentum and do not represent deterministic electoral forecasts.
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
