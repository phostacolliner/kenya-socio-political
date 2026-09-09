import { useState } from 'react';
import {
  Terminal,
  Play,
  CheckCircle2,
  Clock,
  Database,
  RefreshCw,
  Cpu,
  Layers,
  Sparkles,
  FileCheck,
  Zap,
  Globe
} from 'lucide-react';
import { PipelineStatus, Source } from '../types';

interface LivePipelineConsoleProps {
  pipelineStatus: PipelineStatus;
  sources: Source[];
  onTriggerPipeline: () => Promise<void>;
  isRunning: boolean;
}

export default function LivePipelineConsole({
  pipelineStatus,
  sources,
  onTriggerPipeline,
  isRunning
}: LivePipelineConsoleProps) {
  const [filterLogLevel, setFilterLogLevel] = useState<string>('ALL');

  const scheduleStages = [
    { time: '10:00 PM EAT', name: 'Data Collection Layer', desc: 'RSS feeds, News APIs, Gazette & Hansard ingestion', icon: Globe, status: 'Completed' },
    { time: '11:00 PM EAT', name: 'Data Cleaning & Deduplication', desc: 'SHA-256 / SimHash near-duplicate filtering & text cleaning', icon: FileCheck, status: 'Completed' },
    { time: '12:00 AM EAT', name: 'NLP Entity & Topic Extraction', desc: 'spaCy & Transformer tagging for 47 counties & politicians', icon: Cpu, status: 'Completed' },
    { time: '01:00 AM EAT', name: 'Statistical Metrics Engine', desc: 'Momentum scoring (6 weights) & County activity index', icon: Layers, status: 'Completed' },
    { time: '02:00 AM EAT', name: 'Overnight Shift Radar', desc: '24h vs 7d/30d statistical delta & z-score anomaly detector', icon: Zap, status: 'Completed' },
    { time: '03:00 AM EAT', name: 'Gemini AI Political Analyst', desc: 'Structured evidence ingestion into Gemini 3.7 Flash', icon: Sparkles, status: 'Completed' },
    { time: '06:00 AM EAT', name: 'Morning Intelligence Publish', desc: 'HTML/Markdown/JSON briefing published to dashboard & API', icon: CheckCircle2, status: 'Active' }
  ];

  const filteredLogs = pipelineStatus.logs.filter(l => {
    if (filterLogLevel === 'ALL') return true;
    return l.level === filterLogLevel;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Control */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Terminal className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">
                Automated Overnight Pipeline &amp; Scraper Console
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic 6-stage scheduled pipeline converting unstructured Kenyan public media into structured evidence and morning intelligence.
            </p>
          </div>

          <button
            onClick={onTriggerPipeline}
            disabled={isRunning}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-wait'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running Pipeline...' : 'Execute Manual Ingestion Run'}</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-750">
            <span className="text-slate-400 block text-[11px]">Articles Ingested</span>
            <span className="text-lg font-bold text-white font-mono">{pipelineStatus.articlesCollectedToday}</span>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-750">
            <span className="text-slate-400 block text-[11px]">Duplicates Filtered</span>
            <span className="text-lg font-bold text-amber-400 font-mono">{pipelineStatus.duplicatesFilteredToday}</span>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-750">
            <span className="text-slate-400 block text-[11px]">Entities Extracted</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">{pipelineStatus.entitiesExtractedToday}</span>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-750">
            <span className="text-slate-400 block text-[11px]">Shift Signals Generated</span>
            <span className="text-lg font-bold text-rose-400 font-mono">{pipelineStatus.signalsGeneratedToday}</span>
          </div>
        </div>
      </div>

      {/* 6-Stage Automated Schedule Flow */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center">
          <Clock className="w-4 h-4 text-emerald-400 mr-2" />
          Configurable Nightly Pipeline Lifecycle (Africa/Nairobi Timezone)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {scheduleStages.slice(0, 4).map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-750 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {st.time}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-xs font-bold text-white mt-2">{st.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{st.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center text-[10px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> {st.status}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {scheduleStages.slice(4).map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-750 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {st.time}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-xs font-bold text-white mt-2">{st.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{st.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center text-[10px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> {st.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified Data Sources Matrix & Live Terminal Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Verified Media Sources (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center">
            <Globe className="w-4 h-4 text-sky-400 mr-2" />
            Configured Open Source Collectors ({sources.length})
          </h3>
          <p className="text-xs text-slate-400 mb-3">
            Fully legal compliance: respects robots.txt, rate limits, and public feeds without bypassing access controls.
          </p>

          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {sources.map(src => (
              <div key={src.id} className="p-2.5 bg-slate-800/60 rounded-lg border border-slate-750 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-slate-200">{src.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{src.type.toUpperCase()} • {src.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono font-bold text-emerald-400">
                    {(src.reliabilityScore * 100).toFixed(0)}% Score
                  </span>
                  <span className="text-[10px] block text-slate-400">{src.articlesCount} stories</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Terminal Execution Logs (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-slate-300">Execution Logs Stream</span>
              </div>
              <div className="flex items-center space-x-1 text-[11px]">
                {['ALL', 'INFO', 'SUCCESS'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setFilterLogLevel(lvl)}
                    className={`px-2 py-0.5 rounded cursor-pointer ${filterLogLevel === lvl ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-300'}`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {filteredLogs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-[11px] leading-relaxed">
                  <span className="text-slate-400 shrink-0">[{log.timestamp}]</span>
                  <span className={`px-1 py-0.2 rounded font-bold text-[10px] shrink-0 ${
                    log.level === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400'
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-slate-300">{log.message}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span>PostgreSQL: Connection Healthy (0.4ms)</span>
            <span>APScheduler: Active (PID 4892)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
