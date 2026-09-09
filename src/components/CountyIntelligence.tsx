import { useState } from 'react';
import {
  MapPin,
  Search,
  AlertCircle,
  TrendingUp,
  Shield,
  Layers,
  CheckCircle2,
  Users,
  Compass,
  Scale,
  Wheat,
  HeartPulse,
  DollarSign
} from 'lucide-react';
import { CountyPoliticalProfile } from '../types';

interface CountyIntelligenceProps {
  counties: CountyPoliticalProfile[];
  initialSelectedCounty?: string;
}

export default function CountyIntelligence({
  counties,
  initialSelectedCounty
}: CountyIntelligenceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedCounty, setSelectedCounty] = useState<CountyPoliticalProfile>(
    counties.find(c => c.name.toLowerCase() === initialSelectedCounty?.toLowerCase()) || counties[0]
  );

  const regions = [
    'ALL',
    'Rift Valley',
    'Central',
    'Western',
    'Nyanza',
    'Coast',
    'Eastern',
    'North Eastern',
    'Nairobi'
  ];

  const filteredCounties = counties.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.includes(searchTerm) ||
      c.governor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === 'ALL' || c.region.toLowerCase() === selectedRegion.toLowerCase();
    return matchesSearch && matchesRegion;
  });

  const getAlertBadge = (alert: string) => {
    switch (alert) {
      case 'HIGH':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'EMERGING':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Region Filter Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center">
              <MapPin className="w-5 h-5 text-emerald-400 mr-2" />
              47 Counties Political Intelligence Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Devolved political activity indices, dominant regional coalitions, governor leadership, and local civic issues across all 47 counties of Kenya.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>47 Devolved Administrative Units Active</span>
          </div>
        </div>

        {/* Search & Region Selectors */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search county by name (e.g. Kakamega, Nyeri), code (001-047), or governor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {regions.map(reg => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: 47 Counties Grid (7 cols) + Deep County Inspector (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 47 County Card Grid (7 cols) */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[750px] overflow-y-auto pr-1">
            {filteredCounties.map(c => {
              const isSelected = selectedCounty.code === c.code;
              return (
                <div
                  key={c.code}
                  onClick={() => setSelectedCounty(c)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      #{c.code}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold uppercase border ${getAlertBadge(c.signalAlert)}`}>
                      {c.signalAlert === 'NONE' ? 'NORMAL' : c.signalAlert}
                    </span>
                  </div>

                  <h3 className="mt-1.5 text-sm font-extrabold text-white">
                    {c.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {c.region} Region
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Activity Index</span>
                    <span className="font-extrabold font-mono text-emerald-400">
                      {c.politicalActivityIndex}
                    </span>
                  </div>

                  {c.socioEconomic && (
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Poverty: <strong className={c.socioEconomic.povertyRatePct > 50 ? 'text-rose-400' : 'text-slate-300'}>{c.socioEconomic.povertyRatePct}%</strong></span>
                      <span className="truncate max-w-[100px] text-slate-400">{c.socioEconomic.mainEconomicPillar}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed County Political Dossier (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
          <div className="pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                County #{selectedCounty.code} • {selectedCounty.region}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-md font-bold uppercase border ${getAlertBadge(selectedCounty.signalAlert)}`}>
                {selectedCounty.signalAlert} ALERT
              </span>
            </div>
            <h3 className="text-2xl font-black text-white mt-1">{selectedCounty.name} County</h3>
            <p className="text-xs text-slate-400">
              Seat: {selectedCounty.headquarters} • Registered Voters: {selectedCounty.registeredVoters.toLocaleString()}
            </p>
          </div>

          {/* Activity Gauge & 24h Velocity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
              <span className="text-[11px] text-slate-400 font-semibold block">Political Activity Index</span>
              <span className="text-3xl font-black text-white font-mono">{selectedCounty.politicalActivityIndex}</span>
              <span className="text-[10px] text-slate-400 block">Out of 100 max</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
              <span className="text-[11px] text-slate-400 font-semibold block">24-Hour Velocity Shift</span>
              <span className="text-3xl font-black text-emerald-400 font-mono">+{selectedCounty.overnightChangePct}%</span>
              <span className="text-[10px] text-slate-400 block">{selectedCounty.recentEventsCount} monitored events</span>
            </div>
          </div>

          {/* Socio-Economic Profile Section */}
          {selectedCounty.socioEconomic && (
            <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                  <Scale className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                  Socio-Economic &amp; Livelihood Profile
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedCounty.socioEconomic.mainEconomicPillar}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Poverty Headcount Rate</span>
                  <span className="text-base font-black font-mono text-white">
                    {selectedCounty.socioEconomic.povertyRatePct}%
                  </span>
                  <span className="text-[10px] text-slate-400 block">KNBS Household Survey</span>
                </div>

                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Youth NEET / Underemployment</span>
                  <span className="text-base font-black font-mono text-amber-400">
                    {selectedCounty.socioEconomic.youthUnemploymentRatePct}%
                  </span>
                  <span className="text-[10px] text-slate-400 block">Ages 18–35</span>
                </div>

                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Staple Food Price Index</span>
                  <span className="text-base font-black font-mono text-white">
                    {selectedCounty.socioEconomic.stapleFoodPriceIndex}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Baseline = 100</span>
                </div>

                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">SHA Health Registration</span>
                  <span className="text-base font-black font-mono text-emerald-400">
                    {selectedCounty.socioEconomic.shaRegistrationPct}%
                  </span>
                  <span className="text-[10px] text-slate-400 block">Household Onboarding</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Commodity: <strong className="text-slate-200">{selectedCounty.socioEconomic.primaryCropOrCommodity}</strong></span>
                <span>ASAL: <strong className="text-slate-200">{selectedCounty.socioEconomic.asalDroughtPhase}</strong></span>
              </div>
            </div>
          )}

          {/* Leadership & Political Allegiances */}
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-750 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Governor</span>
                <span className="font-bold text-white">{selectedCounty.governor}</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-semibold text-[11px]">
                {selectedCounty.governorParty}
              </span>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-750 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Senator</span>
                <span className="font-bold text-white">{selectedCounty.senator}</span>
              </div>
              <span className="text-slate-400 text-[11px] font-mono">
                Senate Oversight Node
              </span>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-750 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Dominant Coalition</span>
                <span className="font-bold text-white">{selectedCounty.dominantCoalition}</span>
              </div>
              <span className="px-2 py-0.5 bg-slate-700 text-slate-200 rounded font-mono text-[10px]">
                {selectedCounty.dominantParty}
              </span>
            </div>
          </div>

          {/* Top Local Issues */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
              Primary County Friction &amp; Focus Issues
            </h4>
            <div className="space-y-1.5">
              {selectedCounty.topIssues.map((issue, idx) => (
                <div key={idx} className="p-2.5 bg-slate-800/70 rounded-lg border border-slate-750 text-xs text-slate-200 flex items-start space-x-2">
                  <span className="w-4 h-4 rounded bg-slate-700 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Influential Politicians in County */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center">
              <Users className="w-3.5 h-3.5 text-sky-400 mr-1.5" />
              Key Political Figures Tracked
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedCounty.keyPoliticians.map(pol => (
                <span key={pol} className="px-2.5 py-1 bg-slate-800 text-slate-200 border border-slate-700 rounded-md text-xs font-medium">
                  {pol}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
