export interface Source {
  id: string;
  name: string;
  url: string;
  type: 'rss' | 'api' | 'web' | 'government' | 'gazette';
  reliabilityScore: number; // 0.0 to 1.0
  active: boolean;
  category: 'mainstream_news' | 'government_official' | 'broadcast' | 'independent_digital';
  articlesCount: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  fullText?: string;
  sourceId: string;
  sourceName: string;
  url: string;
  publicationDate: string; // ISO String
  collectionTimestamp: string;
  author?: string;
  language: string;
  contentHash: string;
  reliabilityScore: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number; // -1.0 to 1.0
  confidenceScore: number; // 0.0 to 1.0
  topics: string[];
  politicians: string[];
  parties: string[];
  counties: string[];
  institutions: string[];
}

export interface Politician {
  id: string;
  name: string;
  aliases: string[];
  currentPosition: string;
  party: string;
  coalition: string;
  homeCounty: string;
  avatarUrl?: string;
  mentions24h: number;
  mentions7d: number;
  mentions30d: number;
  mentionGrowth24h: number; // percentage
  sentimentScore: number; // -1.0 to +1.0
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  momentumScore: number; // 0 to 100
  momentumBreakdown: {
    mentionGrowth: number; // 30%
    geographicSpread: number; // 20%
    publicEngagement: number; // 15%
    eventActivity: number; // 15%
    topicDiversity: number; // 10%
    sentimentTrend: number; // 10%
  };
  topTopics: string[];
  topCounties: string[];
  activeEventsCount: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface PoliticalParty {
  id: string;
  name: string;
  abbreviation: string;
  coalition: string;
  leader: string;
  color: string;
  mentions24h: number;
  mentionGrowth: number;
  sentimentScore: number;
  dominantCounties: string[];
  coreIssues: string[];
}

export interface CountySocioEconomicMetrics {
  povertyRatePct: number;
  mainEconomicPillar: string;
  stapleFoodPriceIndex: number; // baseline 100
  youthUnemploymentRatePct: number;
  shaRegistrationPct: number;
  asalDroughtPhase: 'Normal' | 'Alert' | 'Alarm' | 'Emergency' | 'Non-ASAL';
  ownSourceRevenueTargetPct: number; // e.g. 74%
  primaryCropOrCommodity: string;
}

export interface CountyPoliticalProfile {
  code: string; // 001 to 047
  name: string;
  region: 'Coast' | 'North Eastern' | 'Eastern' | 'Central' | 'Rift Valley' | 'Western' | 'Nyanza' | 'Nairobi';
  headquarters: string;
  governor: string;
  governorParty: string;
  senator: string;
  registeredVoters: number;
  politicalActivityIndex: number; // 0 to 100
  dominantParty: string;
  dominantCoalition: string;
  topIssues: string[];
  keyPoliticians: string[];
  overnightChangePct: number;
  signalAlert: 'NONE' | 'EMERGING' | 'MEDIUM' | 'HIGH';
  recentEventsCount: number;
  socioEconomic?: CountySocioEconomicMetrics;
}

export interface EconomicIndicator {
  id: string;
  name: string;
  code: string;
  category: 'Inflation' | 'Energy & Fuel' | 'Currency & Debt' | 'Commodities & Food' | 'Trade & Agriculture';
  currentValue: number | string;
  unit: string;
  previousValue: number | string;
  changePct24h: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  impactOnPolitics: 'HIGH' | 'MEDIUM' | 'LOW';
  sourceAgency: string; // e.g. 'KNBS', 'EPRA', 'CBK', 'KRA'
  description: string;
  politicalSensitivityNote: string;
}

export interface SocialIndicator {
  id: string;
  title: string;
  category: 'Healthcare' | 'Education' | 'Youth & Employment' | 'Food Security' | 'Labor & Strikes';
  metricValue: string | number;
  metricUnit: string;
  statusLevel: 'NORMAL' | 'WARNING' | 'ELEVATED' | 'CRITICAL';
  affectedCountiesCount: number;
  keyStakeholders: string[];
  publicSentimentScore: number; // -1.0 to +1.0
  politicalRiskSummary: string;
  latestDevelopment: string;
}

export interface SocioEconomicCorrelation {
  id: string;
  economicFactor: string;
  socialPressure: string;
  politicalOutcome: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  impactedRegions: string[];
  mitigationSignals: string;
}

export interface PoliticalTopic {
  id: string;
  name: string;
  category: 'Governance' | 'Economy' | 'Elections' | 'Social Policy' | 'Security' | 'Regional' | 'Foreign Affairs';
  mentions24h: number;
  mentions7d: number;
  velocityChangePct: number; // % change 24h vs baseline
  sentimentScore: number;
  isHighSignal: boolean;
  relatedPoliticians: string[];
  relatedCounties: string[];
}

export interface PoliticalSignal {
  id: string;
  level: 'HIGH SIGNAL' | 'MEDIUM SIGNAL' | 'EMERGING SIGNAL';
  targetType: 'Topic' | 'Politician' | 'County' | 'Party' | 'Narrative';
  targetName: string;
  changeMetric: string;
  changeValue: string; // e.g. "+42%"
  timeframe: '24h vs 7d' | '24h vs 30d' | 'Overnight Surge';
  context: string;
  confidenceScore: number;
  detectedAt: string;
  sentimentShift?: string;
}

export interface EmergingNarrative {
  id: string;
  headline: string;
  summary: string;
  firstDetected: string;
  velocityScore: number; // 0 to 100
  lifecycleStage: 'Emerging' | 'Accelerating' | 'Peak' | 'Maturing' | 'Dissipating';
  associatedPoliticians: string[];
  associatedCounties: string[];
  associatedParties: string[];
  sentimentProfile: {
    positive: number;
    neutral: number;
    negative: number;
  };
  sourcesCount: number;
}

export interface DailyReport {
  id: string;
  reportDate: string;
  title: string;
  executiveSummary: string;
  topDevelopments: {
    title: string;
    description: string;
    impactLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
    relatedEntities: string[];
    sources: string[];
  }[];
  overnightShifts: PoliticalSignal[];
  topPoliticiansByActivity: {
    name: string;
    position: string;
    mentions: number;
    momentumScore: number;
    keyDriver: string;
  }[];
  topParties: {
    party: string;
    activitySummary: string;
    sentimentScore: number;
  }[];
  topIssues: {
    topic: string;
    mentions: number;
    velocity: string;
    summary: string;
  }[];
  regionalSignals: {
    countyOrRegion: string;
    activitySummary: string;
    tensionLevel: 'Calm' | 'Guarded' | 'Volatile' | 'Heated';
  }[];
  emergingNarratives: EmergingNarrative[];
  policyDevelopments: {
    billOrPolicy: string;
    status: string;
    publicReaction: string;
  }[];
  socioEconomicOverview?: {
    macroeconomicSummary: string;
    costOfLivingTrend: string;
    keyPressurePoints: string[];
    ruralUrbanDivergence: string;
  };
  keyEconomicIndicators?: {
    name: string;
    value: string;
    change: string;
    impact: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  }[];
  keySocialIndicators?: {
    metric: string;
    value: string;
    status: 'NORMAL' | 'WARNING' | 'ELEVATED' | 'CRITICAL';
  }[];
  politicalRisks: {
    risk: string;
    likelihood: 'Low' | 'Medium' | 'High';
    potentialImpact: string;
    mitigationSignals: string;
  }[];
  comparison24hVs7d: {
    metric: string;
    value24h: number | string;
    value7dAverage: number | string;
    delta: string;
    interpretation: string;
  }[];
  dataLimitations: string[];
  sourcesList: {
    name: string;
    type: string;
    articlesAnalyzed: number;
  }[];
  markdownContent: string;
  generatedAt: string;
  generatedByModel: string;
}

export interface PipelineStatus {
  lastRunTimestamp: string;
  nextScheduledRun: string;
  status: 'IDLE' | 'COLLECTING' | 'CLEANING' | 'NLP_PROCESSING' | 'METRICS_CALCULATION' | 'DETECTING_SHIFTS' | 'AI_ANALYZING' | 'COMPLETED' | 'ERROR';
  currentStage: string;
  progressPct: number;
  articlesCollectedToday: number;
  duplicatesFilteredToday: number;
  entitiesExtractedToday: number;
  signalsGeneratedToday: number;
  logs: {
    timestamp: string;
    level: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
    message: string;
  }[];
}
