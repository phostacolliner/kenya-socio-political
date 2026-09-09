import { useState } from 'react';
import {
  HeartPulse,
  GraduationCap,
  Users,
  Briefcase,
  Wheat,
  ShieldAlert,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Activity,
  Layers,
  Building2,
  Scale,
  Sparkles,
  Info,
  ArrowUpRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { SocialIndicator, CountyPoliticalProfile } from '../types';
import { KENYA_SOCIAL_INDICATORS } from '../data/kenyaPoliticalData';

interface SocialSectionProps {
  counties: CountyPoliticalProfile[];
  onSelectCounty?: (countyName: string) => void;
}

export default function SocialSection({
  counties,
  onSelectCounty
}: SocialSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<'healthcare' | 'education' | 'youth' | 'labor' | 'drought' | 'trust'>('healthcare');

  // University NFM Funding Bands Breakdown
  const nfmBandsData = [
    { band: 'Band 1 (V. Vulnerable)', income: '< KES 5,995/mo', govtScholarship: 70, govtLoan: 25, householdPay: 5, fill: '#10b981' },
    { band: 'Band 2 (Highly Vulnerable)', income: 'KES 5,995 - 23,670', govtScholarship: 60, govtLoan: 30, householdPay: 10, fill: '#0ea5e9' },
    { band: 'Band 3 (Vulnerable)', income: 'KES 23,671 - 70,000', govtScholarship: 50, govtLoan: 30, householdPay: 20, fill: '#f59e0b' },
    { band: 'Band 4 (Moderate)', income: 'KES 70,001 - 120,000', govtScholarship: 40, govtLoan: 30, householdPay: 30, fill: '#f97316' },
    { band: 'Band 5 (Least Needy)', income: '> KES 120,000/mo', govtScholarship: 30, govtLoan: 30, householdPay: 40, fill: '#f43f5e' }
  ];

  // Institutional Trust Scores (-1.0 to +1.0)
  const institutionalTrustData = [
    { name: 'Judiciary & High Court', score: 0.42, status: 'High Public Trust', driver: 'Constitutional rulings on Finance Acts & Housing Levy' },
    { name: 'Religious & Faith Leaders', score: 0.35, status: 'Respected Moral Arbiters', driver: 'Clergy statements on healthcare & taxation' },
    { name: 'Media & Independent Press', score: 0.28, status: 'Active Watchdog Role', driver: 'Investigative reporting on public procurement' },
    { name: 'County Governments (CoG)', score: -0.05, status: 'Mixed Regional Delivery', driver: 'Hospital drug supply friction vs devolved projects' },
    { name: 'National Executive', score: -0.22, status: 'Contested Fiscal Reforms', driver: 'Taxation, SHA rollout & cost-of-living sentiment' },
    { name: '13th Parliament', score: -0.48, status: 'Low Public Approval', driver: 'Perceived party whip compliance on tax votes' },
    { name: 'National Police Service', score: -0.54, status: 'Acute Scrutiny', driver: 'Public assembly management and civic liberties protests' }
  ];

  // SHA Hospital Network Breakdown
  const shaIntegrationMetrics = [
    { tier: 'Level 4/5 County Hospitals', total: 395, onboarded: 348, pct: 88, status: 'Operational with Drug Deficits' },
    { tier: 'Level 6 National Referral (KNH/MTRH)', total: 6, onboarded: 6, pct: 100, status: 'Active System Pilot' },
    { tier: 'Faith-Based & Mission Hospitals (KCCB/CHAK)', total: 840, onboarded: 485, pct: 58, status: 'Disputing KES 19B NHIF Debt' },
    { tier: 'Private Clinics & Facilities', total: 4200, onboarded: 2450, pct: 58, status: 'Pre-Authorization Delay Backlog' }
  ];

  const getStatusBadge = (level: string) => {
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
                <Users className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">
                Kenya Social Dynamics &amp; Civic Stability Hub
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Comprehensive monitoring of social policies: Social Health Authority (SHA) rollout, University Student Funding model, Youth NEET underemployment, Trade Union strikes, and Institutional Trust ratings.
            </p>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg border border-slate-700 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveSubTab('healthcare')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'healthcare'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Healthcare &amp; SHA
            </button>
            <button
              onClick={() => setActiveSubTab('education')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'education'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Education &amp; NFM
            </button>
            <button
              onClick={() => setActiveSubTab('youth')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'youth'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Youth &amp; NEET Index
            </button>
            <button
              onClick={() => setActiveSubTab('labor')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'labor'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Labor &amp; Strikes Radar
            </button>
            <button
              onClick={() => setActiveSubTab('drought')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'drought'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ASAL Food Security
            </button>
            <button
              onClick={() => setActiveSubTab('trust')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'trust'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Institutional Trust
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">SHA Hospital Onboarding</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">SHA Portal</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">68.4%</span>
            <span className="text-xs font-bold text-amber-400">WARNING</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Faith-based facilities in arbitration</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">University Funding Appeals</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 font-mono">UFB / HELB</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">34.2%</span>
            <span className="text-xs font-bold text-rose-400">120k Appeals</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Band 4 &amp; 5 household invoice disputes</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Youth NEET Rate</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 font-mono">KNBS Urban</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">35.4%</span>
            <span className="text-xs font-bold text-rose-400">CRITICAL</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Ages 18–35 urban underemployment</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Food Relief Needs</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">NDMA ASAL</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">1.2M</span>
            <span className="text-xs font-bold text-emerald-400">NORMAL PHASE</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Adequate rains in Rift &amp; Coast</p>
        </div>
      </div>

      {/* SUB-VIEW 1: HEALTHCARE & SHA */}
      {activeSubTab === 'healthcare' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm lg:col-span-7 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <HeartPulse className="w-4 h-4 text-rose-400 mr-2" />
                    Social Health Authority (SHA/SHIF) Facility Integration Status
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">MoH Monitoring</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tracking the transition from legacy NHIF to SHA 2.75% mandatory statutory contribution across public, faith-based, and private healthcare providers.
                </p>
              </div>

              <div className="space-y-3">
                {shaIntegrationMetrics.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{item.tier}</span>
                      <span className="font-mono font-bold text-emerald-400">{item.pct}% Onboarded ({item.onboarded}/{item.total})</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.pct >= 85 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${item.pct}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Status: <strong className="text-slate-300">{item.status}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm lg:col-span-5 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mr-2" />
                  Key Healthcare Policy Friction Points
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Critical operational bottlenecks monitored for political escalation.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border-l-2 border-rose-500">
                  <span className="font-bold text-rose-300 block">Faith-Based Hospital Outstanding Debt</span>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    Catholic and Protestant mission hospitals (KCCB/CHAK) demand immediate liquidation of KES 19B in legacy NHIF debt before fully honoring cashless SHA pre-authorizations.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border-l-2 border-amber-500">
                  <span className="font-bold text-amber-300 block">Devolved Level 4/5 Referral Hospital Drug Stocks</span>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    KEMSA supply chain debt owed by 18 county governments has led to out-of-pocket prescription expenses for chronic oncology and kidney dialysis patients.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border-l-2 border-sky-500">
                  <span className="font-bold text-sky-300 block">Emergency &amp; Maternal Care Coverage</span>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    Linda Mama maternal benefit integration into SHA successfully activated across 94% of public dispensaries, reducing maternal health voter agitation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: EDUCATION & NFM */}
      {activeSubTab === 'education' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span className="flex items-center">
                  <GraduationCap className="w-4 h-4 text-sky-400 mr-2" />
                  Higher Education New Funding Model (NFM) Band Architecture
                </span>
                <span className="text-xs font-mono text-slate-400">HELB &amp; Universities Funding Board</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Analysis of the Means Testing Instrument (MTI) applied to university and TVET students, showing government scholarship vs loan vs parent out-of-pocket invoice ratios.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              {nfmBandsData.map((b, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-white block">{b.band}</span>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Household: {b.income}</span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-emerald-400">
                      <span>Scholarship:</span>
                      <strong>{b.govtScholarship}%</strong>
                    </div>
                    <div className="flex justify-between text-sky-400">
                      <span>HELB Loan:</span>
                      <strong>{b.govtLoan}%</strong>
                    </div>
                    <div className="flex justify-between text-rose-400 font-bold border-t border-slate-800 pt-1">
                      <span>Parent Pays:</span>
                      <strong>{b.householdPay}%</strong>
                    </div>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                    <div style={{ width: `${b.govtScholarship}%` }} className="bg-emerald-500 h-full"></div>
                    <div style={{ width: `${b.govtLoan}%` }} className="bg-sky-500 h-full"></div>
                    <div style={{ width: `${b.householdPay}%` }} className="bg-rose-500 h-full"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
              <strong className="text-amber-400">Student &amp; Parent Agitation Watch: </strong>
              Over 120,000 continuing students placed into Bands 4 and 5 submitted hardship re-categorization appeals. University student unions (UoN, Kenyatta, Moi, Egerton) have threatened class boycotts if semester 2 tuition fee invoices are not adjusted.
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: YOUTH & NEET */}
      {activeSubTab === 'youth' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center">
                  <Users className="w-4 h-4 text-rose-400 mr-2" />
                  Youth Underemployment (NEET) by Region
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Percentage of youth aged 18–35 Not in Education, Employment, or Training.
                </p>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">North Eastern &amp; ASAL Counties</span>
                    <span className="text-rose-400 font-bold">54.2% NEET</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '54.2%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Coast Region (Mombasa, Kilifi, Kwale)</span>
                    <span className="text-rose-400 font-bold">41.8% NEET</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '41.8%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Western &amp; Nyanza Hubs</span>
                    <span className="text-amber-400 font-bold">36.5% NEET</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '36.5%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Nairobi Metropolis</span>
                    <span className="text-amber-400 font-bold">32.4% NEET</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '32.4%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Central &amp; Mount Kenya Hubs</span>
                    <span className="text-emerald-400 font-bold">23.2% NEET</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '23.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center">
                  <Flame className="w-4 h-4 text-amber-400 mr-2" />
                  Gen-Z Civic Mobilization &amp; Digital Sentiment
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time indicators measuring youth political consciousness on X (Twitter), TikTok &amp; grassroots spaces.
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Digital Civic Hashtag Velocity</span>
                  <span className="font-mono font-bold text-rose-400">HIGH (42.8k posts/24h)</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Accountability &amp; Anti-Graft Sentiment</span>
                  <span className="font-mono font-bold text-amber-400">88% Demanding Audits</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Voter Card Registration Intent (18–24)</span>
                  <span className="font-mono font-bold text-emerald-400">68.2% Intend to Register</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Primary Issue Priority</span>
                  <span className="font-mono font-bold text-white">Jobs, SHA &amp; Rule of Law</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: LABOR & STRIKES */}
      {activeSubTab === 'labor' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Healthcare Workers (KMPDU / KUCO)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  MEDIATION ONGOING
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kenya Medical Practitioners, Pharmacists and Dentists Union (KMPDU) demanding posting of 1,210 medical intern doctors and full remittance of county statutory deductions (NSSF/SHA/Housing Levy).
              </p>
              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                Key Arbitrator: Ministry of Labour &amp; Public Service Commission
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Teachers Unions (KNUT &amp; KUPPET)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  AGREEMENT SIGNED
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Teachers Service Commission (TSC) secured phase 2 implementation of 2021–2025 Collective Bargaining Agreement (KES 13.5B disbursed), averting school calendar disruptions across primary and secondary schools.
              </p>
              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                Key Arbitrator: Teachers Service Commission (TSC)
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Matatu &amp; Transit Operators (MOA)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  STABLE TARIFFS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                EPRA pump fuel drop (-KES 1.31/L) provided operating cushion for urban public service vehicle SACCOs, maintaining stable passenger commuter fares across major Nairobi and Mombasa corridors.
              </p>
              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                Key Corridors: Thika Road, Jogoo Road, Mombasa-Malindi Highway
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">University Academic Staff (UASU)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  WATCHLIST
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                UASU monitoring implementation of return-to-work formula regarding basic salary adjustments and pension contribution backlogs across 35 public universities.
              </p>
              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                Key Institutions: UoN, JKUAT, KU, Moi University
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 5: ASAL DROUGHT & FOOD SECURITY */}
      {activeSubTab === 'drought' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span className="flex items-center">
                  <Wheat className="w-4 h-4 text-emerald-400 mr-2" />
                  National Drought Management Authority (NDMA) ASAL Phase Map
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">Overall: NORMAL / RECOVERY</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Monitoring 23 Arid and Semi-Arid Lands (ASAL) counties for forage regeneration, livestock body conditions, and grain reserves.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Normal Phase (17 Counties)</span>
                <p className="text-xs text-slate-300 mt-1">
                  Garissa, Wajir, Mandera, Marsabit, Samburu, Turkana, Isiolo, Narok, Kajiado, Makueni, Taita-Taveta, Kwale, Kilifi, Tana River, Lamu, Tharaka-Nithi, Embu.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/40">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Alert Phase (4 Counties)</span>
                <p className="text-xs text-slate-300 mt-1">
                  Baringo (North), West Pokot (Lowlands), Kitui (Eastern Drylands), Laikipia (North Ranches).
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/40">
                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">Alarm Phase (0 Counties)</span>
                <p className="text-xs text-slate-300 mt-1">
                  No counties currently in critical alarm phase due to favorable seasonal rainfall distribution.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-700">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Humanitarian Relief</span>
                <p className="text-xs text-slate-300 mt-1">
                  1.2M beneficiaries supported through cash transfers under Hunger Safety Net Programme (HSNP).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 6: INSTITUTIONAL TRUST */}
      {activeSubTab === 'trust' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span className="flex items-center">
                  <Scale className="w-4 h-4 text-emerald-400 mr-2" />
                  National Institutional Trust &amp; Confidence Barometer
                </span>
                <span className="text-xs font-mono text-slate-400">Citizen Perception Index</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Empirical net sentiment score (-1.0 to +1.0) synthesized from media analysis, civil society surveys, and public feedback across Kenya&apos;s key state organs.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {institutionalTrustData.map((inst, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{inst.name}</span>
                    <span
                      className={`font-mono font-bold ${
                        inst.score > 0.2 ? 'text-emerald-400' : inst.score > 0 ? 'text-sky-400' : 'text-rose-400'
                      }`}
                    >
                      {inst.score > 0 ? `+${inst.score}` : inst.score} ({inst.status})
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        inst.score > 0.2 ? 'bg-emerald-500' : inst.score > 0 ? 'bg-sky-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.max(10, ((inst.score + 1) / 2) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Key Driver: </strong>
                    {inst.driver}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
