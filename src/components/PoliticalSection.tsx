import { useState } from 'react';
import {
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Building,
  Vote,
  Sparkles,
  Zap,
  Compass,
  ArrowUpRight,
  Filter,
  Search,
  CheckCircle2,
  PieChart,
  BarChart3,
  Layers,
  MapPin,
  ChevronRight
} from 'lucide-react';
import {
  Politician,
  PoliticalParty,
  PoliticalTopic,
  PoliticalSignal,
  EmergingNarrative,
  CountyPoliticalProfile
} from '../types';
import PoliticianTracker from './PoliticianTracker';
import OvernightShiftRadar from './OvernightShiftRadar';
import NarrativeTracker from './NarrativeTracker';

interface PoliticalSectionProps {
  politicians: Politician[];
  parties: PoliticalParty[];
  topics: PoliticalTopic[];
  signals: PoliticalSignal[];
  narratives: EmergingNarrative[];
  counties: CountyPoliticalProfile[];
  onSelectCounty?: (countyName: string) => void;
}

export default function PoliticalSection({
  politicians,
  parties,
  topics,
  signals,
  narratives,
  counties,
  onSelectCounty
}: PoliticalSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<'momentum' | 'coalitions' | 'shifts' | 'narratives' | 'simulator'>('momentum');
  const [selectedCoalitionFilter, setSelectedCoalitionFilter] = useState<string>('ALL');
  const [simMtKenyaShift, setSimMtKenyaShift] = useState<number>(35); // % independent/opposition shift
  const [simWesternShift, setSimWesternShift] = useState<number>(20); // % Tawe shift
  const [simYouthTurnout, setSimYouthTurnout] = useState<number>(68); // % turnout

  // Coalitions summary
  const coalitionStats = [
    {
      name: 'Kenya Kwanza / Broad-Based Govt',
      leader: 'William Ruto & Raila Odinga (Alliance)',
      seatShareEst: '58% of Parliament',
      senateControl: '37 / 67 Senators',
      baseRegions: ['Rift Valley (North/South)', 'Nyanza (Cabinet Wing)', 'Western (ANC/Ford-K)', 'Coast (Joho Faction)'],
      color: 'border-amber-500 bg-amber-950/20 text-amber-300',
      status: 'Consolidated Governance'
    },
    {
      name: 'Mt. Kenya Independent Caucus',
      leader: 'Rigathi Gachagua & Regional Leaders',
      seatShareEst: '18% of Parliament',
      senateControl: '12 / 67 Senators',
      baseRegions: ['Nyeri', 'Kiambu', 'Murang\'a', 'Kirinyaga', 'Nyandarua', 'Nakuru Diaspora'],
      color: 'border-blue-500 bg-blue-950/20 text-blue-300',
      status: 'High Ground Momentum'
    },
    {
      name: 'Azimio Hardline Opposition / Wiper Core',
      leader: 'Kalonzo Musyoka & Okiya Omtatah',
      seatShareEst: '16% of Parliament',
      senateControl: '11 / 67 Senators',
      baseRegions: ['Ukambani (Machakos, Makueni, Kitui)', 'Western (Busia Litigants)', 'Coast Activists'],
      color: 'border-emerald-500 bg-emerald-950/20 text-emerald-300',
      status: 'Active Legal & Civic Opposition'
    },
    {
      name: 'Tawe Independence Movement',
      leader: 'George Natembeya (Trans Nzoia Gov)',
      seatShareEst: '8% of Parliament',
      senateControl: '7 / 67 Senators',
      baseRegions: ['Trans Nzoia', 'Kakamega Northern Subcounties', 'Bungoma Border'],
      color: 'border-purple-500 bg-purple-950/20 text-purple-300',
      status: 'Grassroots Generational Re-alignment'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Political Section Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Vote className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">
                Kenya Political Intelligence &amp; Coalition Dynamics Hub
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time monitoring of Kenyan political leaders, broad-based coalition re-alignments, parliamentary voting blocs, narrative lifecycle velocity, and 2027 electoral projections.
            </p>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg border border-slate-700 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveSubTab('momentum')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'momentum'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Politician Momentum
            </button>
            <button
              onClick={() => setActiveSubTab('coalitions')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'coalitions'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Coalitions &amp; Parliament
            </button>
            <button
              onClick={() => setActiveSubTab('shifts')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'shifts'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Overnight Shifts ({signals.length})
            </button>
            <button
              onClick={() => setActiveSubTab('narratives')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'narratives'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Narrative Tracker
            </button>
            <button
              onClick={() => setActiveSubTab('simulator')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'simulator'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2027 Scenario Simulator
            </button>
          </div>
        </div>
      </div>

      {/* SUB-VIEW 1: POLITICIAN MOMENTUM */}
      {activeSubTab === 'momentum' && (
        <PoliticianTracker politicians={politicians} />
      )}

      {/* SUB-VIEW 2: COALITIONS & PARLIAMENT */}
      {activeSubTab === 'coalitions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coalitionStats.map((c, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {c.status}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{c.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Leadership: {c.leader}</p>
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-2 py-1 rounded border ${c.color}`}>
                    {c.seatShareEst}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400">Senate Representation</span>
                    <p className="text-sm font-bold text-slate-200 font-mono mt-0.5">{c.senateControl}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Key Coalition Dynamics</span>
                    <p className="text-sm font-bold text-emerald-400 font-mono mt-0.5">Active Blocs</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Core Regional Footholds:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {c.baseRegions.map((reg, rIdx) => (
                      <span key={rIdx} className="text-[11px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Parliamentary Strength Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center">
              <Building className="w-4 h-4 text-emerald-400 mr-2" />
              13th Parliament Legislative Voting Discipline &amp; Contentious Bills
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Finance &amp; Supplementary Appropriations</span>
                  <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono text-[10px] rounded">Passed</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Broad-based cabinet inclusion ensured 198 affirmative votes in the National Assembly with ODM parliamentary whips backing executive expenditure.
                </p>
                <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800">
                  Whips: Silvanus Osoro (KK) &amp; Junet Mohamed (ODM)
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Devolution Health Fund Split</span>
                  <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 font-mono text-[10px] rounded">In Mediation</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Council of Governors (CoG) and Senate joint committee disputing SHA capitation delay and county referral hospital debt allocations.
                </p>
                <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800">
                  Committee: Senate Health &amp; Devolution Committee
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Presidential Term Extension Bill</span>
                  <span className="px-1.5 py-0.5 bg-rose-500/20 text-rose-300 font-mono text-[10px] rounded">Shelved / Rejected</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Senator Cherargei 7-year term proposal met bipartisan pushback from both executive and opposition caucuses, triggering public stakeholder rejection.
                </p>
                <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800">
                  Public Participation: 92% Rejection Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: OVERNIGHT SHIFTS */}
      {activeSubTab === 'shifts' && (
        <OvernightShiftRadar signals={signals} />
      )}

      {/* SUB-VIEW 4: NARRATIVE TRACKER */}
      {activeSubTab === 'narratives' && (
        <NarrativeTracker narratives={narratives} />
      )}

      {/* SUB-VIEW 5: 2027 SCENARIO SIMULATOR */}
      {activeSubTab === 'simulator' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center">
                <Sparkles className="w-4 h-4 text-emerald-400 mr-2" />
                2027 Kenya Presidential Coalition Scenario Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Adjust regional voter realignment levers to simulate projected first-round presidential coalition shares based on historical IEBC registration figures (22.1M Registered Voters).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Levers */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-white">Mt. Kenya Realignment Shift</span>
                    <span className="font-mono text-emerald-400 font-bold">{simMtKenyaShift}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={simMtKenyaShift}
                    onChange={e => setSimMtKenyaShift(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Estimated swing from ruling coalition to regional caucus (5.7M Mt Kenya voters).
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-white">Western Tawe Movement Swing</span>
                    <span className="font-mono text-emerald-400 font-bold">{simWesternShift}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    value={simWesternShift}
                    onChange={e => setSimWesternShift(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Defection from established party kingpins to grassroots Tawe bloc (2.2M Western voters).
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-white">Gen-Z / Youth Turnout %</span>
                    <span className="font-mono text-emerald-400 font-bold">{simYouthTurnout}%</span>
                  </div>
                  <input
                    type="range"
                    min="45"
                    max="85"
                    value={simYouthTurnout}
                    onChange={e => setSimYouthTurnout(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">
                    National voter turnout rate among voters aged 18–35.
                  </span>
                </div>
              </div>

              {/* Simulation Projected Outcome */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 md:col-span-2 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Simulated 2027 First-Round Distribution
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      50% + 1 Threshold: Required
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-amber-300">Broad-Based Coalition (Ruto / ODM alliance)</span>
                        <span className="font-mono font-bold text-white">
                          {(52 - (simMtKenyaShift * 0.18) + (simWesternShift * 0.05)).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(10, 52 - (simMtKenyaShift * 0.18) + (simWesternShift * 0.05))}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-blue-300">Mt Kenya Unity Alliance / Third Force</span>
                        <span className="font-mono font-bold text-white">
                          {(14 + (simMtKenyaShift * 0.32)).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(5, 14 + (simMtKenyaShift * 0.32))}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-emerald-300">Azimio Hardline / Wiper-Tawe Coalition</span>
                        <span className="font-mono font-bold text-white">
                          {(22 + (simWesternShift * 0.28) + ((simYouthTurnout - 60) * 0.15)).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(5, 22 + (simWesternShift * 0.28) + ((simYouthTurnout - 60) * 0.15))}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
                  <strong className="text-emerald-400">Simulation Takeaway: </strong>
                  If the Mt Kenya swing exceeds 38% while Western fragments into the Tawe movement, the incumbent Broad-Based Coalition drops below the 50%+1 constitutional threshold, making a run-off scenario or second-round coalition pact mathematically probable.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
