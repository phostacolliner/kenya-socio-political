import React from 'react';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Flame,
  ShieldCheck,
  ArrowUpRight,
  ExternalLink,
  Users,
  MapPin,
  FileText,
  Scale,
  DollarSign,
  HeartPulse,
  GraduationCap
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import {
  PoliticalSignal,
  PoliticalTopic,
  Politician,
  CountyPoliticalProfile,
  NewsArticle
} from '../types';

interface DashboardOverviewProps {
  signals: PoliticalSignal[];
  topics: PoliticalTopic[];
  politicians: Politician[];
  counties: CountyPoliticalProfile[];
  articles: NewsArticle[];
  onSelectPolitician: (name: string) => void;
  onSelectCounty: (name: string) => void;
  onNavigateTab: (tab: string) => void;
}

export default function DashboardOverview({
  signals,
  topics,
  politicians,
  counties,
  articles,
  onSelectPolitician,
  onSelectCounty,
  onNavigateTab
}: DashboardOverviewProps) {
  // 7-day trending simulation data
  const trendVelocityData = [
    { day: 'Wed', health: 180, costOfLiving: 240, westernTawe: 80, mtKenya: 190 },
    { day: 'Thu', health: 210, costOfLiving: 290, westernTawe: 95, mtKenya: 220 },
    { day: 'Fri', health: 230, costOfLiving: 310, westernTawe: 110, mtKenya: 260 },
    { day: 'Sat', health: 250, costOfLiving: 340, westernTawe: 135, mtKenya: 280 },
    { day: 'Sun', health: 290, costOfLiving: 370, westernTawe: 160, mtKenya: 310 },
    { day: 'Mon', health: 340, costOfLiving: 395, westernTawe: 185, mtKenya: 340 },
    { day: 'Tue (Today)', health: 388, costOfLiving: 420, westernTawe: 210, mtKenya: 360 }
  ];

  const momentumRankings = politicians.slice(0, 6).map(p => ({
    name: p.name.split(' ')[0] + ' ' + (p.name.split(' ')[1] || ''),
    fullName: p.name,
    score: p.momentumScore,
    growth: p.mentionGrowth24h,
    party: p.party
  }));

  const highSignals = signals.filter(s => s.level === 'HIGH SIGNAL');
  const hotspotCounties = counties.filter(c => c.politicalActivityIndex >= 85).slice(0, 5);

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'positive') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (sentiment === 'negative') return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Top Key Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* National Political Activity Index */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              National Activity Index
            </span>
            <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">74.8</span>
            <span className="flex items-center text-xs font-semibold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> +14.2% (24h)
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Computed across 47 devolved county nodes
          </p>
        </div>

        {/* Overnight High Signals */}
        <div
          onClick={() => onNavigateTab('shifts')}
          className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-4 shadow-md cursor-pointer hover:border-amber-500/60 transition-all backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
              Overnight High Signals
            </span>
            <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg animate-pulse">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-amber-400">{highSignals.length}</span>
            <span className="text-xs font-medium text-slate-400 flex items-center">
              Radar View <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 text-amber-400" />
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            SHA Health + Western Tawe + Gachagua Base
          </p>
        </div>

        {/* Active Hotspot Counties */}
        <div
          onClick={() => onNavigateTab('counties')}
          className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md cursor-pointer hover:border-slate-700 transition-all backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Hotspot Counties (PAI &gt; 85)
            </span>
            <span className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg">
              <Flame className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">11</span>
            <span className="text-xs text-rose-400 font-semibold">
              Nairobi, Kakamega, Nyeri...
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            High media volume & civic debate
          </p>
        </div>

        {/* Verified Data Sources */}
        <div
          onClick={() => onNavigateTab('pipeline')}
          className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md cursor-pointer hover:border-slate-700 transition-all backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Source Reliability Index
            </span>
            <span className="p-1.5 bg-sky-500/10 text-sky-400 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">93.4%</span>
            <span className="text-xs text-sky-400 font-semibold">
              364 Stories Ingested
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            8 Verified media &amp; gazette feeds
          </p>
        </div>
      </div>

      {/* High Signal Alert Banners */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center">
            <span className="w-2 h-2 rounded-full bg-rose-500 mr-2 animate-ping"></span>
            Critical Overnight Statistical Shifts
          </h3>
          <button
            onClick={() => onNavigateTab('shifts')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center"
          >
            View all signals <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {highSignals.map(sig => (
            <div
              key={sig.id}
              className="bg-gradient-to-br from-slate-900 to-slate-950 border border-rose-500/30 rounded-xl p-4 relative overflow-hidden shadow-lg"
            >
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-16 h-16 bg-rose-500/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {sig.level}
                </span>
                <span className="text-sm font-extrabold font-mono text-rose-400">
                  {sig.changeValue}
                </span>
              </div>
              <h4 className="mt-2.5 text-xs font-bold text-white leading-snug">
                {sig.targetName}
              </h4>
              <p className="mt-1.5 text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {sig.context}
              </p>
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-medium text-slate-400">{sig.changeMetric}</span>
                <span className="font-mono text-emerald-400">Confidence {(sig.confidenceScore * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Visuals Grid: 7-Day Topic Velocity & Politician Momentum Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 7-Day Velocity Chart (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center">
                <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
                7-Day Political Issue Velocity Trends
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Relative media mentions &amp; public debate volume in Kenya
              </p>
            </div>
            <div className="mt-2 sm:mt-0 flex items-center space-x-3 text-[11px]">
              <span className="flex items-center text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mr-1.5"></span> Cost of Living
              </span>
              <span className="flex items-center text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 mr-1.5"></span> SHA Health
              </span>
              <span className="flex items-center text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-1.5"></span> Western Tawe
              </span>
            </div>
          </div>

          <div className="h-64 mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendVelocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FACC15" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FACC15" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorTawe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="costOfLiving" name="Cost of Living" stroke="#FACC15" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
                <Area type="monotone" dataKey="health" name="SHA Healthcare" stroke="#F43F5E" strokeWidth={2} fillOpacity={1} fill="url(#colorHealth)" />
                <Area type="monotone" dataKey="westernTawe" name="Western Tawe" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorTawe)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Politician Momentum Score Leaderboard (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center">
                  <Users className="w-4 h-4 text-sky-400 mr-2" />
                  Political Momentum Index
                </h3>
                <p className="text-xs text-slate-400">
                  Weighted: Growth, Reach, Engagements, Sentiments
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('politicians')}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300"
              >
                Inspect All
              </button>
            </div>

            <div className="h-56 mt-3 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={momentumRankings} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 100]} stroke="#64748B" fontSize={10} tickLine={false} />
                  <YAxis type="category" dataKey="name" stroke="#94A3B8" fontSize={11} width={80} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                    formatter={(value: any) => [`${value} / 100`, 'Momentum Score']}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {momentumRankings.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : index === 1 ? '#38BDF8' : '#6366F1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Top Surging Leader:</span>
            <span className="font-bold text-emerald-400">
              Rigathi Gachagua (+64.2% mention surge)
            </span>
          </div>
        </div>
      </div>

      {/* Socio-Economic & Cost-of-Living Pulse Barometer */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center">
              <Scale className="w-4 h-4 text-emerald-400 mr-2" />
              National Socio-Economic &amp; Cost-of-Living Stress Barometer
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live macro indicators tracking inflation, statutory payroll deductions, and devolved civic pressure
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('socioeconomic')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center shrink-0"
          >
            Open Full Socio-Economic Radar <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] uppercase font-mono text-slate-400">Headline Inflation</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-lg font-black text-white">4.3%</span>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center">
                <TrendingDown className="w-3 h-3 mr-0.5" /> -0.3%
              </span>
            </div>
            <span className="text-[10px] text-slate-400">KNBS YoY Baseline</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] uppercase font-mono text-slate-400">Super Petrol (EPRA)</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-lg font-black text-white">KES 180.66</span>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center">
                <TrendingDown className="w-3 h-3 mr-0.5" /> -1.31
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Nairobi Retail / L</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] uppercase font-mono text-slate-400">2kg Unga (Retail)</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-lg font-black text-white">KES 135.00</span>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center">
                <TrendingDown className="w-3 h-3 mr-0.5" /> -5.00
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Urban Sifted Meal</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] uppercase font-mono text-slate-400">SHA Integration</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-lg font-black text-amber-400">68.4%</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                WARNING
              </span>
            </div>
            <span className="text-[10px] text-slate-400">18 CoG Referral Hubs</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 col-span-2 sm:col-span-4 lg:col-span-1">
            <span className="text-[10px] uppercase font-mono text-slate-400">Youth NEET Index</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-lg font-black text-rose-400">35.4%</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">
                CRITICAL
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Urban Underemployment</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Hotspot Counties & Live Monitored News Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hotspot Counties Spotlight (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center">
              <MapPin className="w-4 h-4 text-emerald-400 mr-2" />
              County Hotspot Radar
            </h3>
            <button
              onClick={() => onNavigateTab('counties')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              All 47 Counties
            </button>
          </div>

          <div className="mt-3 space-y-2.5">
            {hotspotCounties.map(county => (
              <div
                key={county.code}
                onClick={() => {
                  onSelectCounty(county.name);
                  onNavigateTab('counties');
                }}
                className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-lg cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{county.code}</span>
                    <span className="text-xs font-bold text-slate-100">{county.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-slate-700 text-slate-300 rounded">
                      {county.region}
                    </span>
                  </div>
                  <span className={`text-xs font-bold font-mono ${county.signalAlert === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}`}>
                    PAI {county.politicalActivityIndex}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[180px]">{county.topIssues[0]}</span>
                  <span className="text-emerald-400 font-semibold">+{county.overnightChangePct}% 24h</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Monitored News Stream (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center">
                <FileText className="w-4 h-4 text-amber-400 mr-2" />
                Verified Intelligence Feed (Recent Ingestions)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cleaned, hashed, entity-extracted national political reports
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('pipeline')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-200"
            >
              Inspect Raw DB
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {articles.slice(0, 4).map(art => (
              <div
                key={art.id}
                className="p-3.5 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-750 rounded-xl transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-300">{art.sourceName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-300 font-mono">
                      Reliability {(art.reliabilityScore * 100).toFixed(0)}%
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-semibold ${getSentimentColor(art.sentiment)}`}>
                      {art.sentiment} ({art.sentimentScore.toFixed(2)})
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(art.publicationDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <h4 className="mt-2 text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                  {art.title}
                </h4>

                <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {art.description}
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  {art.topics.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700">
                      {t}
                    </span>
                  ))}
                  {art.politicians.map(p => (
                    <span
                      key={p}
                      onClick={() => {
                        onSelectPolitician(p);
                        onNavigateTab('politicians');
                      }}
                      className="text-[10px] px-2 py-0.5 bg-emerald-950/40 text-emerald-300 rounded-md border border-emerald-800/40 cursor-pointer hover:bg-emerald-900/60"
                    >
                      {p}
                    </span>
                  ))}
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-[11px] text-sky-400 hover:text-sky-300 flex items-center"
                  >
                    Source Link <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
