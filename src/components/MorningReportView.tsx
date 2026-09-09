import { useState } from 'react';
import Markdown from 'react-markdown';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Shield,
  Layers,
  AlertCircle,
  Calendar,
  Scale,
  DollarSign,
  TrendingDown,
  HeartPulse
} from 'lucide-react';
import { DailyReport } from '../types';

interface MorningReportViewProps {
  report: DailyReport;
  onGenerateAIBriefing: (customFocus?: string) => Promise<void>;
  isGenerating: boolean;
}

export default function MorningReportView({
  report,
  onGenerateAIBriefing,
  isGenerating
}: MorningReportViewProps) {
  const [copied, setCopied] = useState(false);
  const [customFocus, setCustomFocus] = useState('');
  const [activeViewMode, setActiveViewMode] = useState<'formatted' | 'structured' | 'markdown'>('formatted');

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(report.markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kenya-political-intelligence-${report.reportDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([report.markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kenya-political-intelligence-${report.reportDate}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action & Generation Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <FileText className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">
                Morning Political Intelligence Briefing
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Automated daily intelligence synthesis grounded in 47-county NLP entity extraction and verified public records.
            </p>
          </div>

          {/* Action Export Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setActiveViewMode('formatted')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeViewMode === 'formatted' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Executive View
              </button>
              <button
                onClick={() => setActiveViewMode('structured')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeViewMode === 'structured' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Evidence Tables
              </button>
              <button
                onClick={() => setActiveViewMode('markdown')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeViewMode === 'markdown' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Raw Markdown
              </button>
            </div>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium transition-all"
              title="Download as Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.MD</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium transition-all"
              title="Download structured JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs transition-all"
              title="Print Briefing / Save as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Synthesis Prompt Trigger */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Sparkles className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Optional: Specify custom strategic focus (e.g. 'Focus on Western Kenya Tawe movement and health sector strikes')..."
              value={customFocus}
              onChange={e => setCustomFocus(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={() => onGenerateAIBriefing(customFocus)}
            disabled={isGenerating}
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md ${
              isGenerating
                ? 'bg-amber-600/50 text-amber-200 cursor-wait'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white cursor-pointer'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating with Gemini 3.7...' : 'Synthesize Live Report (Gemini 3.7)'}</span>
          </button>
        </div>
      </div>

      {/* Main Report Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
        {/* Document Header */}
        <div className="border-b border-slate-800 pb-5 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono">
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-semibold uppercase">
              CONFIDENTIAL / OSINT STRATEGIC BRIEF
            </span>
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {report.reportDate}
              </span>
              <span>•</span>
              <span className="text-slate-400">Generated: {new Date(report.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} EAT</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white mt-3 uppercase tracking-tight">
            {report.title}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Synthesized by: <strong className="text-slate-200">{report.generatedByModel}</strong>
          </p>
        </div>

        {/* View Mode 1: Formatted Executive Markdown */}
        {activeViewMode === 'formatted' && (
          <div className="prose prose-invert max-w-none prose-headings:text-slate-100 prose-headings:font-bold prose-p:text-slate-300 prose-p:text-sm prose-p:leading-relaxed prose-li:text-slate-300 prose-li:text-sm prose-strong:text-white prose-table:text-xs prose-th:text-slate-200 prose-th:bg-slate-800 prose-th:p-2 prose-td:p-2 prose-td:border-slate-800 prose-hr:border-slate-800">
            <Markdown>{report.markdownContent}</Markdown>
          </div>
        )}

        {/* View Mode 2: Structured Evidence Tables */}
        {activeViewMode === 'structured' && (
          <div className="space-y-8">
            {/* Section 1: Executive Summary */}
            <div>
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
                1. Executive Strategic Summary
              </h3>
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-750 text-sm text-slate-200 leading-relaxed">
                {report.executiveSummary}
              </div>
            </div>

            {/* Section 2: Top Political Developments */}
            <div>
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">
                2. Top Political Developments &amp; Policy Inflection Points
              </h3>
              <div className="space-y-3">
                {report.topDevelopments.map((dev, idx) => (
                  <div key={idx} className="p-4 bg-slate-800/40 rounded-xl border border-slate-750">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{dev.title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold uppercase ${
                        dev.impactLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {dev.impactLevel} IMPACT
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                      {dev.description}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-slate-750 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                      <div>Entities: <strong className="text-slate-300">{dev.relatedEntities.join(', ')}</strong></div>
                      <div>Sources: <strong className="text-slate-300">{dev.sources.join(', ')}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2B: Socio-Economic & Cost-of-Living Synthesis */}
            {report.socioEconomicOverview && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center">
                  <Scale className="w-4 h-4 mr-2" />
                  3. Socio-Economic &amp; Cost-of-Living Stress Analysis
                </h3>

                <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-750 space-y-3">
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {report.socioEconomicOverview.macroeconomicSummary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-[11px] font-bold text-amber-400 block mb-1">Key Household Pressure Points:</span>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        {report.socioEconomicOverview.keyPressurePoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-[11px] font-bold text-sky-400 block mb-1">Rural vs Urban Divergence:</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {report.socioEconomicOverview.ruralUrbanDivergence}
                      </p>
                    </div>
                  </div>

                  {report.keyEconomicIndicators && report.keyEconomicIndicators.length > 0 && (
                    <div className="pt-3 border-t border-slate-750">
                      <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">Monitored Macro Indicators:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                        {report.keyEconomicIndicators.map((ind, i) => (
                          <div key={i} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                            <span className="text-[10px] text-slate-400 block truncate">{ind.name}</span>
                            <span className="text-xs font-black text-white font-mono block mt-0.5">{ind.value}</span>
                            <span className="text-[10px] text-emerald-400 font-mono">{ind.change}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 4: Politician Activity Leaderboard */}
            <div>
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">
                3. Politician Activity &amp; Momentum Leaders
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-800">
                  <thead className="bg-slate-800 text-slate-300 uppercase font-semibold">
                    <tr>
                      <th className="p-2.5">Politician</th>
                      <th className="p-2.5">Position</th>
                      <th className="p-2.5 text-right">Mentions</th>
                      <th className="p-2.5 text-right">Momentum</th>
                      <th className="p-2.5">Primary Driver</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {report.topPoliticiansByActivity.map((pol, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="p-2.5 font-bold text-white">{pol.name}</td>
                        <td className="p-2.5 text-slate-400">{pol.position}</td>
                        <td className="p-2.5 text-right font-mono text-slate-300">{pol.mentions}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-emerald-400">{pol.momentumScore}</td>
                        <td className="p-2.5 text-slate-300">{pol.keyDriver}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: 24h vs 7d Comparison */}
            <div>
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">
                4. 24-Hour vs 7-Day Baseline Metrics
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-800">
                  <thead className="bg-slate-800 text-slate-300 uppercase font-semibold">
                    <tr>
                      <th className="p-2.5">Metric</th>
                      <th className="p-2.5 text-right">24h Value</th>
                      <th className="p-2.5 text-right">7d Average</th>
                      <th className="p-2.5 text-right">Delta</th>
                      <th className="p-2.5">Analytical Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {report.comparison24hVs7d.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="p-2.5 font-bold text-slate-200">{row.metric}</td>
                        <td className="p-2.5 text-right font-mono text-slate-300">{row.value24h}</td>
                        <td className="p-2.5 text-right font-mono text-slate-400">{row.value7dAverage}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-emerald-400">{row.delta}</td>
                        <td className="p-2.5 text-slate-300">{row.interpretation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 5: Data Limitations & Verified Sources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center">
                  <Shield className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                  Data Limitations &amp; Governance
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                  {report.dataLimitations.map((lim, idx) => (
                    <li key={idx} className="leading-relaxed">{lim}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center">
                  <Layers className="w-3.5 h-3.5 text-sky-400 mr-1.5" />
                  Verified Media Source Ingestions
                </h4>
                <div className="space-y-1.5 text-xs">
                  {report.sourcesList.map((src, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-300">
                      <span>{src.name}</span>
                      <span className="font-mono text-emerald-400 font-semibold">{src.articlesAnalyzed} articles</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Mode 3: Raw Markdown Code */}
        {activeViewMode === 'markdown' && (
          <div>
            <textarea
              readOnly
              value={report.markdownContent}
              className="w-full h-96 p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300 focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
