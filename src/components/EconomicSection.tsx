import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Flame,
  Scale,
  Building2,
  Wheat,
  PieChart,
  BarChart3,
  Search,
  Filter,
  ArrowUpRight,
  Info,
  Layers,
  Fuel,
  Coins,
  Receipt,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { EconomicIndicator, CountyPoliticalProfile } from '../types';
import { KENYA_ECONOMIC_INDICATORS } from '../data/kenyaPoliticalData';

interface EconomicSectionProps {
  counties: CountyPoliticalProfile[];
  onSelectCounty?: (countyName: string) => void;
}

export default function EconomicSection({
  counties,
  onSelectCounty
}: EconomicSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<'macro' | 'cost_of_living' | 'agriculture' | 'fiscal_debt' | 'simulator'>('macro');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [fuelChangeSim, setFuelChangeSim] = useState<number>(0); // KES/L change
  const [forexChangeSim, setForexChangeSim] = useState<number>(0); // KES/USD change

  const categories = ['ALL', 'Inflation', 'Energy & Fuel', 'Currency & Debt', 'Commodities & Food', 'Trade & Agriculture'];

  const filteredEconomic = KENYA_ECONOMIC_INDICATORS.filter(ind => {
    return selectedCategory === 'ALL' || ind.category === selectedCategory;
  });

  // Regional Unga Index
  const ungaRegionalData = [
    { town: 'Eldoret', price: 125, label: 'Breadbasket Hub', status: 'Lowest' },
    { town: 'Kitale', price: 128, label: 'Trans Nzoia Farmgate', status: 'Low' },
    { town: 'Nakuru', price: 132, label: 'Central Rift', status: 'Moderate' },
    { town: 'Nairobi', price: 135, label: 'Capital Metropolis', status: 'Benchmark' },
    { town: 'Kisumu', price: 138, label: 'Lake Basin Hub', status: 'Elevated' },
    { town: 'Mombasa', price: 142, label: 'Coastal Port Hub', status: 'High' },
    { town: 'Garissa', price: 155, label: 'ASAL Northern Hub', status: 'Highest' }
  ];

  // Statutory deductions example for KES 50,000 gross salary
  const grossSalary = 50000;
  const paye = 7160; // PAYE after personal relief
  const nssf = 2160; // NSSF Tier I & II
  const housingLevy = grossSalary * 0.015; // 750
  const sha = grossSalary * 0.0275; // 1375
  const totalDeductions = paye + nssf + housingLevy + sha;
  const netTakeHome = grossSalary - totalDeductions;

  // Fiscal Debt Profile
  const debtAmortizationSchedule = [
    { year: '2024/25', externalDebtServicingKES: 1120, domesticDebtServicingKES: 980, totalKES: 2100 },
    { year: '2025/26', externalDebtServicingKES: 1040, domesticDebtServicingKES: 1020, totalKES: 2060 },
    { year: '2026/27', externalDebtServicingKES: 980, domesticDebtServicingKES: 1100, totalKES: 2080 },
    { year: '2027/28', externalDebtServicingKES: 1150, domesticDebtServicingKES: 1140, totalKES: 2290 }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <DollarSign className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">
                Kenya Economic &amp; Cost-of-Living Intelligence Hub
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live tracking of Kenyan macroeconomic barometers, EPRA fuel pump price cycles, food commodity indexes, fiscal revenue collections, and public debt sustainability.
            </p>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg border border-slate-700 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveSubTab('macro')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'macro'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Macro Indicators
            </button>
            <button
              onClick={() => setActiveSubTab('cost_of_living')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'cost_of_living'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cost of Living &amp; Unga Basket
            </button>
            <button
              onClick={() => setActiveSubTab('agriculture')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'agriculture'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tea, Coffee &amp; Agriculture
            </button>
            <button
              onClick={() => setActiveSubTab('fiscal_debt')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'fiscal_debt'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Fiscal, KRA &amp; Debt
            </button>
            <button
              onClick={() => setActiveSubTab('simulator')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'simulator'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Price Shock Simulator
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
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
          <p className="text-[10px] text-slate-400 mt-1">YoY target range: 2.5% – 7.5%</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">EPRA Super Petrol</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">Nairobi Retail</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">180.66</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -KES 1.31
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">KES / Litre maximum ceiling</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Central Bank Rate</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono">CBK MPC</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">12.75%</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -25 bps
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Easing monetary stance</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">USD / KES Rate</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">Interbank</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">129.25</span>
            <span className="text-xs font-bold text-slate-300">STABLE</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">CBK Forex Reserves: 4.1 Months</p>
        </div>
      </div>

      {/* SUB-VIEW 1: MACRO INDICATORS */}
      {activeSubTab === 'macro' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
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
            {filteredEconomic.map(ind => (
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
                      {ind.impactOnPolitics} SENSITIVITY
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
                      <span className="text-[10px] text-slate-400">Previous: {ind.previousValue}</span>
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
                      <strong className="text-amber-200">Political Transmission:</strong> {ind.politicalSensitivityNote}
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 font-mono">
                    Source Agency: {ind.sourceAgency}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: COST OF LIVING & UNGA BASKET */}
      {activeSubTab === 'cost_of_living' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Regional Unga Price Chart (7 cols) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <Wheat className="w-4 h-4 text-amber-400 mr-2" />
                    2kg Sifted Maize Flour (Unga) Retail Price by Town (KES)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">MoA Survey</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Maize meal is Kenya&apos;s principal food security barometer. Lower prices in the Western/Rift Valley granary contrast with elevated logistics markups in ASAL and coastal hubs.
                </p>

                <div className="h-64 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ungaRegionalData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                      <XAxis dataKey="town" stroke="#64748b" fontSize={11} />
                      <YAxis domain={[100, 170]} stroke="#64748b" fontSize={11} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-900 border border-slate-700 p-2.5 rounded text-xs shadow-xl">
                                <p className="font-bold text-white">{data.town} ({data.label})</p>
                                <p className="text-amber-400 mt-1 font-mono font-bold">KES {data.price}.00 / 2kg</p>
                                <span className="text-[10px] text-slate-400">Status: {data.status}</span>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                        {ungaRegionalData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.price >= 150 ? '#f43f5e' : entry.price >= 135 ? '#f59e0b' : '#10b981'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 mt-2">
                <span className="font-bold text-emerald-400">Household Impact: </span>
                A KES 10 change in 2kg unga retail translates to a direct 0.8% swing in urban low-income household disposable food budgets.
              </div>
            </div>

            {/* Formal Employee Payslip Deductions Breakdown (5 cols) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm lg:col-span-5 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center">
                  <Receipt className="w-4 h-4 text-emerald-400 mr-2" />
                  Statutory Deductions on KES 50,000 Gross Salary
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Visual breakdown of mandatory payroll deductions driving formal sector wage discontent.
                </p>
              </div>

              <div className="space-y-2.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Gross Monthly Salary</span>
                  <span className="font-bold text-white font-mono">KES 50,000.00</span>
                </div>

                <div className="flex justify-between py-1 text-slate-300">
                  <span>PAYE Income Tax (Net Relief)</span>
                  <span className="font-mono text-rose-400">- KES {paye.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between py-1 text-slate-300">
                  <span>NSSF Pension (Tier I &amp; II)</span>
                  <span className="font-mono text-rose-400">- KES {nssf.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between py-1 text-slate-300">
                  <span>Affordable Housing Levy (1.5%)</span>
                  <span className="font-mono text-rose-400">- KES {housingLevy.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between py-1 text-slate-300">
                  <span>Social Health Authority (SHA 2.75%)</span>
                  <span className="font-mono text-rose-400">- KES {sha.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between py-1.5 border-t border-slate-800 font-bold text-white bg-slate-900/80 px-2 rounded">
                  <span className="text-amber-300">Total Statutory Deductions</span>
                  <span className="font-mono text-amber-400">KES {totalDeductions.toLocaleString()}.00 ({(totalDeductions/grossSalary*100).toFixed(1)}%)</span>
                </div>

                <div className="flex justify-between py-1.5 font-bold text-white bg-emerald-950/40 px-2 rounded border border-emerald-800/40">
                  <span className="text-emerald-300">Net Take-Home Pay</span>
                  <span className="font-mono text-emerald-400">KES {netTakeHome.toLocaleString()}.00 ({(netTakeHome/grossSalary*100).toFixed(1)}%)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                *Effective take-home ratio has reduced from 79.4% in 2022 to 77.1% under current statutory provisions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: AGRICULTURE & EXPORT COMMODITIES */}
      {activeSubTab === 'agriculture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Mombasa Tea Auction</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono rounded">Weekly Sale</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white font-mono">$2.24</span>
                <span className="text-xs font-bold text-slate-400">USD / kg average</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Smallholder tea farmers under KTDA in Mt Kenya (East of Rift) receive higher premiums ($2.80/kg) compared to West of Rift ($2.05/kg), generating political agitation over factory bonus variance.
              </p>
              <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
                Key Counties: Nyeri, Murang&apos;a, Kericho, Bomet, Nyamira
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Nairobi Coffee Exchange</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono rounded">Grade AA</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white font-mono">$248.00</span>
                <span className="text-xs font-bold text-slate-400">USD / 50kg bag</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reforms under the Coffee Cherry Advance Revolving Fund (KES 4B disbursed) have improved direct grower payments, moderating grassroots dissatisfaction in Central Kenya cooperatives.
              </p>
              <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
                Key Counties: Kiambu, Nyeri, Kirinyaga, Embu, Meru
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Subsidized Fertilizer</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono rounded">NCPB Stores</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white font-mono">KES 2,500</span>
                <span className="text-xs font-bold text-slate-400">per 50kg bag</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Over 5.8 million bags distributed via e-voucher registration. High satisfaction in North Rift and Western maize belts, anchoring ruling coalition support in agricultural breadbaskets.
              </p>
              <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
                Key Counties: Uasin Gishu, Trans Nzoia, Bungoma, Nakuru
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: FISCAL, KRA & DEBT */}
      {activeSubTab === 'fiscal_debt' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KRA Collections vs Target */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center">
                  <Coins className="w-4 h-4 text-emerald-400 mr-2" />
                  KRA FY2024/25 Revenue Collection Performance
                </h3>
                <span className="text-xs font-mono text-slate-400">Target: KES 2.95 Trillion</span>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300 font-semibold">Income Tax &amp; PAYE</span>
                    <span className="font-mono text-emerald-400 font-bold">94.2% of target</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94.2%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300 font-semibold">Value Added Tax (VAT 16%)</span>
                    <span className="font-mono text-amber-400 font-bold">89.6% of target</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '89.6%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300 font-semibold">Customs &amp; Port Duties</span>
                    <span className="font-mono text-emerald-400 font-bold">92.1% of target</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92.1%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300 font-semibold">Excise Duty</span>
                    <span className="font-mono text-rose-400 font-bold">83.4% of target</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '83.4%' }}></div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                The revenue deficit creates pressure on National Treasury disbursement schedules to the 47 county governments, leading to delays in devolved hospital workers salaries.
              </p>
            </div>

            {/* Debt Amortization Chart */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center">
                  <BarChart3 className="w-4 h-4 text-amber-400 mr-2" />
                  Kenya Annual Debt Servicing Obligation (KES Billions)
                </h3>
                <span className="text-xs font-mono text-slate-400">National Treasury</span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={debtAmortizationSchedule} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} domain={[0, 2500]} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-slate-900 border border-slate-700 p-2.5 rounded text-xs shadow-xl">
                              <p className="font-bold text-white">{d.year} Debt Servicing</p>
                              <p className="text-sky-400">External: KES {d.externalDebtServicingKES}B</p>
                              <p className="text-amber-400">Domestic: KES {d.domesticDebtServicingKES}B</p>
                              <p className="text-white font-bold border-t border-slate-800 pt-1 mt-1">Total: KES {d.totalKES}B</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="externalDebtServicingKES" name="External Debt" stackId="a" fill="#0ea5e9" />
                    <Bar dataKey="domesticDebtServicingKES" name="Domestic Debt" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-amber-400">Fiscal Policy Note: </strong>
                Over 62% of ordinary tax revenue is allocated directly to debt service, leaving limited fiscal headroom for discretionary developmental spending.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 5: PRICE SHOCK SIMULATOR */}
      {activeSubTab === 'simulator' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center">
                <Fuel className="w-4 h-4 text-emerald-400 mr-2" />
                Kenyan Household Price Shock &amp; Public Discontent Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Simulate how hypothetical fluctuations in EPRA fuel tariffs or currency exchange transmit across public transit fares, unga prices, and citizen political stress scores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-white">EPRA Super Petrol Adjustment</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {fuelChangeSim > 0 ? `+KES ${fuelChangeSim}` : `KES ${fuelChangeSim}`} / L
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="30"
                    value={fuelChangeSim}
                    onChange={e => setFuelChangeSim(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>-KES 20 (Subsidy)</span>
                    <span>Current (KES 180.66)</span>
                    <span>+KES 30 (Global Surge)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-white">CBK USD/KES Rate Fluctuation</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {forexChangeSim > 0 ? `+${forexChangeSim} KES` : `${forexChangeSim} KES`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-15"
                    max="25"
                    value={forexChangeSim}
                    onChange={e => setForexChangeSim(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>114.25 KES (Strengthen)</span>
                    <span>129.25 KES (Current)</span>
                    <span>154.25 KES (Weaken)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Simulated Household Impact Outputs
                  </span>

                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400">Simulated Super Petrol</span>
                      <p className="text-base font-black text-white font-mono mt-0.5">
                        KES {(180.66 + fuelChangeSim + (forexChangeSim * 0.35)).toFixed(2)}
                      </p>
                      <span className="text-[10px] text-slate-400">per litre at pump</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400">Simulated 2kg Unga Price</span>
                      <p className="text-base font-black text-white font-mono mt-0.5">
                        KES {(135.00 + (fuelChangeSim * 0.42) + (forexChangeSim * 0.28)).toFixed(2)}
                      </p>
                      <span className="text-[10px] text-slate-400">urban retail average</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400">Matatu / Transit Fares</span>
                      <p className="text-base font-black text-amber-400 font-mono mt-0.5">
                        {(fuelChangeSim * 0.85).toFixed(1)}% shift
                      </p>
                      <span className="text-[10px] text-slate-400">Nairobi commuter average</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400">Public Discontent Score</span>
                      <p className={`text-base font-black font-mono mt-0.5 ${
                        (42 + (fuelChangeSim * 1.2) + (forexChangeSim * 0.9)) > 60 ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {Math.min(100, Math.max(10, (42 + (fuelChangeSim * 1.2) + (forexChangeSim * 0.9)))).toFixed(0)} / 100
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {(42 + (fuelChangeSim * 1.2) + (forexChangeSim * 0.9)) > 60 ? 'High Agitation' : 'Manageable'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-emerald-400">Macro Analysis: </strong>
                  Transport and food inflation account for over 52% of the Kenyan Consumer Price Index (CPI) weight. Fuel and forex shifts transmit into consumer basket prices within 14 to 28 days.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
