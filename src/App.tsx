import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import PoliticianTracker from './components/PoliticianTracker';
import CountyIntelligence from './components/CountyIntelligence';
import OvernightShiftRadar from './components/OvernightShiftRadar';
import NarrativeTracker from './components/NarrativeTracker';
import MorningReportView from './components/MorningReportView';
import LivePipelineConsole from './components/LivePipelineConsole';
import GeminiAnalystChat from './components/GeminiAnalystChat';
import CodeArchitectureViewer from './components/CodeArchitectureViewer';
import SocioEconomicRadar from './components/SocioEconomicRadar';
import PoliticalSection from './components/PoliticalSection';
import EconomicSection from './components/EconomicSection';
import SocialSection from './components/SocialSection';

import {
  PoliticalSignal,
  PoliticalTopic,
  Politician,
  CountyPoliticalProfile,
  NewsArticle,
  DailyReport,
  PipelineStatus,
  Source
} from './types';

import {
  KENYA_COUNTIES_47,
  KENYA_POLITICIANS,
  KENYA_TOPICS,
  OVERNIGHT_SIGNALS,
  EMERGING_NARRATIVES,
  SAMPLE_ARTICLES,
  INITIAL_DAILY_REPORT,
  KENYA_SOURCES,
  INITIAL_PIPELINE_STATUS
} from './data/kenyaPoliticalData';

import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [pipelineRunning, setPipelineRunning] = useState<boolean>(false);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState<boolean>(false);

  // Core Intelligence Data States
  const [signals, setSignals] = useState<PoliticalSignal[]>(OVERNIGHT_SIGNALS);
  const [topics, setTopics] = useState<PoliticalTopic[]>(KENYA_TOPICS);
  const [politicians, setPoliticians] = useState<Politician[]>(KENYA_POLITICIANS);
  const [counties, setCounties] = useState<CountyPoliticalProfile[]>(KENYA_COUNTIES_47);
  const [articles, setArticles] = useState<NewsArticle[]>(SAMPLE_ARTICLES);
  const [dailyReport, setDailyReport] = useState<DailyReport>(INITIAL_DAILY_REPORT);
  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus>(INITIAL_PIPELINE_STATUS);
  const [sources, setSources] = useState<Source[]>(KENYA_SOURCES);

  // Selected details for deep drilldown navigation
  const [selectedPoliticianName, setSelectedPoliticianName] = useState<string>('');
  const [selectedCountyName, setSelectedCountyName] = useState<string>('');

  // Initial fetch from backend REST APIs
  useEffect(() => {
    async function loadData() {
      try {
        const [newsRes, polRes, countRes, sigRes, repRes, pipeRes, srcRes] = await Promise.allSettled([
          api.getNews({ limit: 20 }),
          api.getPoliticians(),
          api.getCounties(),
          api.getSignals(),
          api.getDailyReport(),
          api.getPipelineStatus(),
          api.getSources()
        ]);

        if (newsRes.status === 'fulfilled' && newsRes.value.data) setArticles(newsRes.value.data);
        if (polRes.status === 'fulfilled' && polRes.value.data) setPoliticians(polRes.value.data);
        if (countRes.status === 'fulfilled' && countRes.value.data) setCounties(countRes.value.data);
        if (sigRes.status === 'fulfilled' && sigRes.value.data) setSignals(sigRes.value.data);
        if (repRes.status === 'fulfilled' && repRes.value.data) setDailyReport(repRes.value.data);
        if (pipeRes.status === 'fulfilled' && pipeRes.value.data) setPipelineStatus(pipeRes.value.data);
        if (srcRes.status === 'fulfilled' && srcRes.value.data) setSources(srcRes.value.data);
      } catch (err) {
        console.warn('Using baseline seed data for offline resilience:', err);
      }
    }
    loadData();
  }, []);

  // Handler for manual pipeline run
  const handleRunPipeline = async () => {
    setPipelineRunning(true);
    try {
      const res = await api.triggerPipelineRun();
      if (res.data) {
        setPipelineStatus(res.data);
      }
    } catch (err) {
      console.error('Pipeline execution error:', err);
    } finally {
      setTimeout(() => setPipelineRunning(false), 1200);
    }
  };

  // Handler for dynamic Gemini briefing generation
  const handleGenerateAIBriefing = async (customFocus?: string) => {
    setIsGeneratingBrief(true);
    try {
      const res = await api.generateAIBriefing(customFocus);
      if (res.report) {
        setDailyReport(res.report);
      }
    } catch (err) {
      console.error('AI Briefing generation error:', err);
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  // Handler for AI strategic queries
  const handleSendStrategicQuery = async (query: string) => {
    return await api.queryStrategicAI(query);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAIQuery={() => setIsAIChatOpen(true)}
        pipelineRunning={pipelineRunning}
        onRunPipeline={handleRunPipeline}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <DashboardOverview
            signals={signals}
            topics={topics}
            politicians={politicians}
            counties={counties}
            articles={articles}
            onSelectPolitician={(name) => {
              setSelectedPoliticianName(name);
              setActiveTab('political');
            }}
            onSelectCounty={(name) => {
              setSelectedCountyName(name);
              setActiveTab('counties');
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {(activeTab === 'political' || activeTab === 'politicians') && (
          <PoliticalSection
            politicians={politicians}
            parties={[]}
            topics={topics}
            signals={signals}
            narratives={EMERGING_NARRATIVES}
            counties={counties}
            onSelectCounty={(name) => {
              setSelectedCountyName(name);
              setActiveTab('counties');
            }}
          />
        )}

        {activeTab === 'economic' && (
          <EconomicSection
            counties={counties}
            onSelectCounty={(name) => {
              setSelectedCountyName(name);
              setActiveTab('counties');
            }}
          />
        )}

        {activeTab === 'social' && (
          <SocialSection
            counties={counties}
            onSelectCounty={(name) => {
              setSelectedCountyName(name);
              setActiveTab('counties');
            }}
          />
        )}

        {activeTab === 'counties' && (
          <CountyIntelligence
            counties={counties}
            initialSelectedCounty={selectedCountyName}
          />
        )}

        {activeTab === 'socioeconomic' && (
          <SocioEconomicRadar
            counties={counties}
            onSelectCounty={(name) => {
              setSelectedCountyName(name);
              setActiveTab('counties');
            }}
          />
        )}

        {activeTab === 'shifts' && (
          <OvernightShiftRadar signals={signals} />
        )}

        {activeTab === 'narratives' && (
          <NarrativeTracker narratives={EMERGING_NARRATIVES} />
        )}

        {activeTab === 'report' && (
          <MorningReportView
            report={dailyReport}
            onGenerateAIBriefing={handleGenerateAIBriefing}
            isGenerating={isGeneratingBrief}
          />
        )}

        {activeTab === 'pipeline' && (
          <LivePipelineConsole
            pipelineStatus={pipelineStatus}
            sources={sources}
            onTriggerPipeline={handleRunPipeline}
            isRunning={pipelineRunning}
          />
        )}

        {activeTab === 'code' && (
          <CodeArchitectureViewer />
        )}
      </main>

      {/* Gemini AI Strategic Analyst Chat Modal */}
      <GeminiAnalystChat
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        onSendQuery={handleSendStrategicQuery}
      />

      {/* Global Intelligence Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Kenya Political Intelligence &amp; Data Platform</span>
            <span>•</span>
            <span>Grounded across 47 Devolved Counties</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span>FastAPI Backend</span>
            <span>•</span>
            <span>Gemini 3.7 Flash Engine</span>
            <span>•</span>
            <span>Non-Partisan OSINT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
