import {
  NewsArticle,
  Politician,
  PoliticalParty,
  PoliticalTopic,
  CountyPoliticalProfile,
  PoliticalSignal,
  EmergingNarrative,
  DailyReport,
  PipelineStatus,
  Source
} from '../types';

export const api = {
  async getDashboardSummary() {
    const res = await fetch('/api/dashboard/summary');
    if (!res.ok) throw new Error('Failed to fetch dashboard summary');
    return res.json();
  },

  async getNews(params?: { topic?: string; politician?: string; county?: string; sentiment?: string; limit?: number; page?: number }) {
    const query = new URLSearchParams();
    if (params?.topic) query.set('topic', params.topic);
    if (params?.politician) query.set('politician', params.politician);
    if (params?.county) query.set('county', params.county);
    if (params?.sentiment) query.set('sentiment', params.sentiment);
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.page) query.set('page', params.page.toString());

    const res = await fetch(`/api/news?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch news articles');
    return res.json() as Promise<{ success: boolean; total: number; data: NewsArticle[] }>;
  },

  async getPoliticians(params?: { party?: string; coalition?: string; search?: string }) {
    const query = new URLSearchParams();
    if (params?.party) query.set('party', params.party);
    if (params?.coalition) query.set('coalition', params.coalition);
    if (params?.search) query.set('search', params.search);

    const res = await fetch(`/api/politicians?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch politicians');
    return res.json() as Promise<{ success: boolean; data: Politician[] }>;
  },

  async getParties() {
    const res = await fetch('/api/parties');
    if (!res.ok) throw new Error('Failed to fetch political parties');
    return res.json() as Promise<{ success: boolean; data: PoliticalParty[] }>;
  },

  async getTopics() {
    const res = await fetch('/api/topics');
    if (!res.ok) throw new Error('Failed to fetch political topics');
    return res.json() as Promise<{ success: boolean; data: PoliticalTopic[] }>;
  },

  async getCounties(region?: string) {
    const query = region ? `?region=${encodeURIComponent(region)}` : '';
    const res = await fetch(`/api/counties${query}`);
    if (!res.ok) throw new Error('Failed to fetch counties');
    return res.json() as Promise<{ success: boolean; total: number; data: CountyPoliticalProfile[] }>;
  },

  async getSignals() {
    const res = await fetch('/api/signals');
    if (!res.ok) throw new Error('Failed to fetch signals');
    return res.json() as Promise<{ success: boolean; data: PoliticalSignal[] }>;
  },

  async getNarratives() {
    const res = await fetch('/api/narratives');
    if (!res.ok) throw new Error('Failed to fetch narratives');
    return res.json() as Promise<{ success: boolean; data: EmergingNarrative[] }>;
  },

  async getSources() {
    const res = await fetch('/api/sources');
    if (!res.ok) throw new Error('Failed to fetch sources');
    return res.json() as Promise<{ success: boolean; data: Source[] }>;
  },

  async getDailyReport() {
    const res = await fetch('/api/daily-report');
    if (!res.ok) throw new Error('Failed to fetch daily report');
    return res.json() as Promise<{ success: boolean; data: DailyReport }>;
  },

  async getPipelineStatus() {
    const res = await fetch('/api/pipeline/status');
    if (!res.ok) throw new Error('Failed to fetch pipeline status');
    return res.json() as Promise<{ success: boolean; data: PipelineStatus }>;
  },

  async triggerPipelineRun() {
    const res = await fetch('/api/pipeline/run', { method: 'POST' });
    if (!res.ok) throw new Error('Failed to trigger pipeline');
    return res.json() as Promise<{ success: boolean; message: string; data: PipelineStatus }>;
  },

  async generateAIBriefing(customFocus?: string) {
    const res = await fetch('/api/ai/analyze-briefing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customFocus }),
    });
    if (!res.ok) throw new Error('Failed to generate AI briefing');
    return res.json() as Promise<{ success: boolean; report: DailyReport; source: string; message: string }>;
  },

  async queryStrategicAI(query: string) {
    const res = await fetch('/api/ai/strategic-query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error('Failed to query strategic AI');
    return res.json() as Promise<{ success: boolean; answer: string; sourcesUsed: string[] }>;
  }
};
