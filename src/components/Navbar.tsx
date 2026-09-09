import { useState, useEffect } from 'react';
import {
  Activity,
  Shield,
  Clock,
  Sparkles,
  RefreshCw,
  FileText,
  MapPin,
  Users,
  Compass,
  Zap,
  Terminal,
  Code2,
  Scale,
  Vote,
  DollarSign,
  HeartPulse
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAIQuery: () => void;
  pipelineRunning: boolean;
  onRunPipeline: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenAIQuery,
  pipelineRunning,
  onRunPipeline
}: NavbarProps) {
  const [nairobiTime, setNairobiTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Nairobi EAT Time (UTC+3)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Nairobi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setNairobiTime(now.toLocaleTimeString('en-GB', options) + ' EAT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Executive Dashboard', icon: Activity },
    { id: 'political', label: 'Political Intelligence', icon: Vote },
    { id: 'economic', label: 'Economic Intelligence', icon: DollarSign },
    { id: 'social', label: 'Social Intelligence', icon: HeartPulse },
    { id: 'counties', label: '47 Counties Intelligence', icon: MapPin },
    { id: 'shifts', label: 'Overnight Shift Radar', icon: Zap },
    { id: 'narratives', label: 'Narrative Tracker', icon: Compass },
    { id: 'report', label: 'Morning Briefing', icon: FileText },
    { id: 'pipeline', label: 'Data Pipeline & Scrapers', icon: Terminal },
    { id: 'code', label: 'Python Backend Architecture', icon: Code2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      {/* Top Banner with Kenya Flag colors & Live Status */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/4 bg-black"></div>
        <div className="h-full w-1/4 bg-red-600"></div>
        <div className="h-full w-1/4 bg-emerald-600"></div>
        <div className="h-full w-1/4 bg-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-slate-900 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-emerald-400/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-slate-100 uppercase">
                  K-SPEIS Kenya
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                  PES v3.0 Live
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Socio-Political &amp; Economic Intelligence System (47 Counties)
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center space-x-3">
            {/* Live Nairobi Clock */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700/60 text-xs font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{nairobiTime || 'Nairobi 06:00:00 EAT'}</span>
            </div>

            {/* Run Pipeline Button */}
            <button
              onClick={onRunPipeline}
              disabled={pipelineRunning}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pipelineRunning
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-wait'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600'
              }`}
              title="Trigger Overnight NLP Scrape & Shift Detector"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${pipelineRunning ? 'animate-spin text-amber-400' : 'text-slate-400'}`} />
              <span className="hidden lg:inline">{pipelineRunning ? 'Ingesting Feeds...' : 'Sync Feeds'}</span>
            </button>

            {/* AI Strategic Query Button */}
            <button
              onClick={onOpenAIQuery}
              className="flex items-center space-x-2 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-950/30 transition-all border border-emerald-400/40 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Ask AI Analyst</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-800/80 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
