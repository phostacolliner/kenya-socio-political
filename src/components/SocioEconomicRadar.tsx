import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Flame,
  DollarSign,
  Users,
  ShieldCheck,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Layers,
  Wheat,
  Search,
  Filter,
  ArrowUpRight,
  BarChart3,
  Scale,
  Building2,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import {
  EconomicIndicator,
  SocialIndicator,
  SocioEconomicCorrelation,
  CountyPoliticalProfile
} from '../types';
import {
  KENYA_ECONOMIC_INDICATORS,
  KENYA_SOCIAL_INDICATORS,
  SOCIO_ECONOMIC_CORRELATIONS
} from '../data/kenyaPoliticalData';

interface SocioEconomicRadarProps {
  counties: CountyPoliticalProfile[];
  onSelectCounty?: (countyName: string) => void;
}

export default function SocioEconomicRadar({
  counties,
  onSelectCounty
}: SocioEconomicRadarProps) {
  const [activeSubTab, setActiveSubTab] = useState<'indicators' | 'social' | 'correlations' | 'county_matrix'>('indicators');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [countyMetricSort, setCountyMetricSort] = useState<'poverty' | 'youth' | 'unga' | 'sha'>('poverty');
  const [countySearch, setCountySearch] = useState<string>('');

  const economicCategories = ['ALL', 'Inflation', 'Energy & Fuel', 'Currency & Debt', 'Commodities & Food', 'Trade & Agriculture'];

  const filteredEconomic = KENYA_ECONOMIC_INDICATORS.filter(ind => {
    return selectedCategory === 'ALL' || ind.category === selectedCategory;
  });

  // Sort counties by chosen socio-economic metric
  const sortedCounties = [...counties].filter(c => {
    return (
      c.name.toLowerCase().includes(countySearch.toLowerCase()) ||
      c.region.toLowerCase().includes(countySearch.toLowerCase()) ||
      c.socioEconomic?.mainEconomicPillar?.toLowerCase().includes(countySearch.toLowerCase())
    );
  }).sort((a, b) => {
    const aM = a.socioEconomic;
    const bM = b.socioEconomic;
    if (!aM || !bM) return 0;
    if (countyMetricSort === 'poverty') return bM.povertyRatePct - aM.povertyRatePct;
    if (countyMetricSort === 'youth') return bM.youthUnemploymentRatePct - aM.youthUnemploymentRatePct;
    if (countyMetricSort === 'unga') return bM.stapleFoodPriceIndex - aM.stapleFoodPriceIndex;
    if (countyMetricSort === 'sha') return bM.shaRegistrationPct - aM.shaRegistrationPct;
    return 0;
  });

  // Scatter data: Poverty Rate vs Political Activity Index
  const correlationScatterData = counties
    .filter(c => c.socioEconomic)
    .map(c => ({
      name: c.name,
      region: c.region,
      poverty: c.socioEconomic?.povertyRatePct || 0,
      activity: c.politicalActivityIndex,
      youthUnemp: c.socioEconomic?.youthUnemploymentRatePct || 0,
      party: c.dominantParty
    }));

  const getStatusColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse';
      case 'WARNING':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'ELEVATED':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'NORMAL':
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Scale className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">
                Kenya Socio-Economic & Political Stress Radar
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time monitoring of Kenyan macroeconomic indicators, social policy bottlenecks (SHA, HELB funding, Unga index), and their empirical correlation with political mobilization and voter alignment.
            </p>
          </div>

          {/* Quick Sub-Navigation Pills */}
          <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveSubTab('indicators')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'indicators'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Economic Indicators
            </button>
            <button
              onClick={() => setActiveSubTab('social')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'social'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Social Stability Watch
            </button>
            <button
              onClick={() => setActiveSubTab('correlations')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'correlations'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Political Correlations
            </button>
            <button
              onClick={() => setActiveSubTab('county_matrix')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'county_matrix'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              47 Counties Matrix
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Bar: Key Kenyan Barometers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Headline Inflation</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">KNBS</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">4.3%</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -0.3% pts
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Target range: 2.5% – 7.5%</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Super Petrol (Nrb)</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">EPRA</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">180.66</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -KES 1.31
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">KES / Litre maximum pump retail</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">2kg Unga Retail</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono">MoA</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">135.00</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -KES 5.00
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">National urban average maize meal</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">USD / KES FX</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">CBK</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">129.25</span>
            <span className="text-xs font-bold text-slate-300 flex items-center">
              STABLE
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Interbank weighted mean rate</p>
        </div>
      </div>

      {/* VIEW 1: ECONOMIC INDICATORS */}
      {activeSubTab === 'indicators' && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {economicCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEconomic.map(ind => {
              const isPositiveChange = ind.changePct24h > 0;
              return (
                <div
                  key={ind.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {ind.category}
                        </span>
                        <h3 className="text-sm font-bold text-white mt-1.5">{ind.name}</h3>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          ind.impactOnPolitics === 'HIGH'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {ind.impactOnPolitics} POLITICAL SENSITIVITY
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline justify-between bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-2xl font-black text-white font-mono">
                          {ind.currentValue.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 ml-1.5">{ind.unit}</span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-bold font-mono flex items-center justify-end ${
                            ind.trend === 'DOWN'
                              ? 'text-emerald-400'
                              : ind.trend === 'UP'
                              ? 'text-rose-400'
                              : 'text-slate-300'
                          }`}
                        >
                          {ind.trend === 'DOWN' && <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
                          {ind.trend === 'UP' && <TrendingUp className="w-3.5 h-3.5 mr-0.5" />}
                          {ind.changePct24h > 0 ? `+${ind.changePct24h}%` : `${ind.changePct24h}%`}
                        </span>
                        <span className="text-[10px] text-slate-400">Prev: {ind.previousValue}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {ind.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <div className="flex items-start space-x-1.5 text-[11px] text-amber-300 bg-amber-950/30 p-2.5 rounded-lg border border-amber-800/40">
                      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                      <span className="leading-tight">
                        <strong className="text-amber-200">Political Note:</strong> {ind.politicalSensitivityNote}
                      </span>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400 font-mono">
                      Source: {ind.sourceAgency}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: SOCIAL STABILITY WATCHLIST */}
      {activeSubTab === 'social' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {KENYA_SOCIAL_INDICATORS.map(soc => (
              <div
                key={soc.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 bg-slate-800 text-slate-200 rounded-lg">
                      {soc.category === 'Healthcare' && <HeartPulse className="w-4 h-4 text-rose-400" />}
                      {soc.category === 'Education' && <GraduationCap className="w-4 h-4 text-sky-400" />}
                      {soc.category === 'Youth & Employment' && <Users className="w-4 h-4 text-amber-400" />}
                      {soc.category === 'Labor & Strikes' && <Briefcase className="w-4 h-4 text-orange-400" />}
                      {soc.category === 'Food Security' && <Wheat className="w-4 h-4 text-emerald-400" />}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400">
                        {soc.category}
                      </span>
                      <h3 className="text-sm font-bold text-white">{soc.title}</h3>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border ${getStatusColor(soc.statusLevel)}`}>
                    {soc.statusLevel} RISK
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400">Operational Metric</span>
                    <p className="text-base font-black text-white font-mono mt-0.5">{soc.metricValue}</p>
                    <span className="text-[10px] text-slate-400">{soc.metricUnit}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Public Sentiment & Reach</span>
                    <p className="text-base font-black text-rose-400 font-mono mt-0.5">
                      {soc.publicSentimentScore > 0 ? `+${soc.publicSentimentScore}` : soc.publicSentimentScore}
                    </p>
                    <span className="text-[10px] text-slate-400">Affecting {soc.affectedCountiesCount} Counties</span>
                  </div>
                </div>

                <div className="text-xs space-y-2">
                  <div>
                    <strong className="text-slate-300">Political Risk Context:</strong>
                    <p className="text-slate-400 mt-0.5 leading-relaxed">{soc.politicalRiskSummary}</p>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 text-slate-300">
                    <strong className="text-emerald-400 font-semibold">Latest 24h Development: </strong>
                    <span>{soc.latestDevelopment}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-400">Key Stakeholders:</span>
                  {soc.keyStakeholders.map(st => (
                    <span key={st} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: SOCIO-ECONOMIC TO POLITICAL CORRELATIONS */}
      {activeSubTab === 'correlations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Correlation Chain Cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center">
                <Flame className="w-4 h-4 text-rose-400 mr-2" />
                Causal Transmission Chains (Economy → Society → Political Action)
              </h3>
              {SOCIO_ECONOMIC_CORRELATIONS.map(cor => (
                <div
                  key={cor.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                      Transmission Chain #{cor.id.replace('cor-', '')}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                      {cor.severity} SEVERITY
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-950 rounded-lg border-l-2 border-amber-500">
                      <span className="text-[10px] uppercase font-bold text-amber-400 block">1. Economic Factor / Policy Shift</span>
                      <span className="text-slate-200 mt-0.5 block">{cor.economicFactor}</span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-lg border-l-2 border-sky-500">
                      <span className="text-[10px] uppercase font-bold text-sky-400 block">2. Social Pressure & Household Impact</span>
                      <span className="text-slate-200 mt-0.5 block">{cor.socialPressure}</span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-lg border-l-2 border-rose-500">
                      <span className="text-[10px] uppercase font-bold text-rose-400 block">3. Resulting Political Alignment Shift</span>
                      <span className="text-rose-200 font-semibold mt-0.5 block">{cor.politicalOutcome}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center space-x-1">
                      <span>Regions:</span>
                      {cor.impactedRegions.map(r => (
                        <span key={r} className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 text-[10px]">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scatter Plot: Poverty Rate vs Political Activity */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <BarChart3 className="w-4 h-4 text-emerald-400 mr-2" />
                    Devolved Correlation: Poverty Rate vs Political Activity Index
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">47 Counties</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Scatter distribution showing how county-level economic strain correlates with grassroots political sensitivity and mobilization frequency.
                </p>

                <div className="h-72 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                      <XAxis
                        type="number"
                        dataKey="poverty"
                        name="Poverty Rate (%)"
                        unit="%"
                        domain={[10, 85]}
                        stroke="#64748b"
                        fontSize={11}
                      />
                      <YAxis
                        type="number"
                        dataKey="activity"
                        name="Political Activity Index"
                        domain={[40, 100]}
                        stroke="#64748b"
                        fontSize={11}
                      />
                      <ZAxis type="number" dataKey="youthUnemp" range={[40, 200]} name="Youth NEET %" />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-xs shadow-xl">
                                <p className="font-bold text-white">{data.name} County ({data.region})</p>
                                <p className="text-slate-300 mt-1">Poverty Rate: <strong className="text-emerald-400">{data.poverty}%</strong></p>
                                <p className="text-slate-300">Political Activity Index: <strong className="text-amber-400">{data.activity}/100</strong></p>
                                <p className="text-slate-300">Youth NEET %: <strong className="text-rose-400">{data.youthUnemp}%</strong></p>
                                <p className="text-slate-400 text-[10px] mt-1">Dominant Party: {data.party}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Scatter
                        name="Counties"
                        data={correlationScatterData}
                        fill="#10b981"
                      >
                        {correlationScatterData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.activity >= 85
                                ? '#f43f5e'
                                : entry.poverty >= 50
                                ? '#f59e0b'
                                : '#10b981'
                            }
                          />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
                <span className="font-semibold text-emerald-400">Analytical Synthesis: </span>
                Counties with high agricultural commercialization (Central &amp; Rift Valley) show elevated political activity driven by cash-crop prices (tea/coffee/milk), whereas high-poverty ASAL regions (Northern Kenya) mobilize primarily around equal share allocation and drought resilience feeds.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: 47 COUNTIES SOCIO-ECONOMIC MATRIX */}
      {activeSubTab === 'county_matrix' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter by county name, region, or economic pillar..."
                value={countySearch}
                onChange={e => setCountySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center space-x-1 text-xs">
              <span className="text-slate-400 mr-1">Sort by:</span>
              <button
                onClick={() => setCountyMetricSort('poverty')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  countyMetricSort === 'poverty' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Poverty Rate %
              </button>
              <button
                onClick={() => setCountyMetricSort('youth')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  countyMetricSort === 'youth' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Youth NEET %
              </button>
              <button
                onClick={() => setCountyMetricSort('unga')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  countyMetricSort === 'unga' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Food Price Index
              </button>
              <button
                onClick={() => setCountyMetricSort('sha')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  countyMetricSort === 'sha' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                SHA Registration %
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Code &amp; County</th>
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">Main Economic Pillar</th>
                    <th className="py-3 px-4 text-right">Poverty Rate</th>
                    <th className="py-3 px-4 text-right">Youth NEET %</th>
                    <th className="py-3 px-4 text-right">Food Price Index</th>
                    <th className="py-3 px-4 text-right">SHA Reg %</th>
                    <th className="py-3 px-4">ASAL Status</th>
                    <th className="py-3 px-4">Key Commodity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {sortedCounties.map(c => {
                    const se = c.socioEconomic;
                    return (
                      <tr
                        key={c.code}
                        onClick={() => onSelectCounty && onSelectCounty(c.name)}
                        className="hover:bg-slate-800/60 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4 font-bold text-white flex items-center space-x-2">
                          <span className="font-mono text-slate-400 text-[10px]">#{c.code}</span>
                          <span>{c.name}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">{c.region}</td>
                        <td className="py-3 px-4 font-medium text-slate-200">{se?.mainEconomicPillar || 'Mixed Agriculture'}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold">
                          <span className={se && se.povertyRatePct > 50 ? 'text-rose-400' : 'text-slate-200'}>
                            {se ? `${se.povertyRatePct}%` : 'N/A'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono">
                          <span className={se && se.youthUnemploymentRatePct > 40 ? 'text-amber-400 font-semibold' : 'text-slate-300'}>
                            {se ? `${se.youthUnemploymentRatePct}%` : 'N/A'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-300">
                          {se?.stapleFoodPriceIndex || 100}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-400">
                          {se ? `${se.shaRegistrationPct}%` : 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                              se?.asalDroughtPhase === 'Alert'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : se?.asalDroughtPhase === 'Normal'
                                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {se?.asalDroughtPhase || 'Non-ASAL'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {se?.primaryCropOrCommodity || 'General Produce'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
