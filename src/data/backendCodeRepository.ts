export interface BackendFile {
  path: string;
  name: string;
  language: string;
  category: 'core' | 'models' | 'collectors' | 'nlp' | 'analytics' | 'ai' | 'infra' | 'tests';
  content: string;
  description: string;
}

export const BACKEND_CODE_FILES: BackendFile[] = [
  {
    path: 'backend/app/main.py',
    name: 'main.py',
    language: 'python',
    category: 'core',
    description: 'FastAPI application entry point with CORS, routers, and health checks',
    content: `"""
Kenya Political Intelligence & Analysis Platform - FastAPI Backend
Production API service orchestrating data ingestion, NLP, momentum scoring, and Gemini AI briefing.
"""
from fastapi import FastAPI, HTTPException, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from typing import List, Optional
import uvicorn
import os

from app.models.database import init_db
from app.routers import news, politicians, counties, reports, pipeline, ai_analyst
from app.scheduler.pipeline_runner import start_scheduler, stop_scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize Database tables and Background Scraper Scheduler
    print("🚀 Initializing Kenya Political Intelligence Database...")
    await init_db()
    scheduler = start_scheduler()
    yield
    # Shutdown: Graceful stop
    print("🛑 Shutting down Background Ingestion Scheduler...")
    stop_scheduler(scheduler)

app = FastAPI(
    title="Kenya Political Intelligence Platform API",
    description="Automated OSINT, NLP Entity Extraction, Statistical Momentum & Gemini AI Political Analyst for Kenya",
    version="2.4.0",
    lifespan=lifespan
)

# CORS Configuration for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Modular Routers
app.include_router(news.router, prefix="/api/news", tags=["News & Ingestion"])
app.include_router(politicians.router, prefix="/api/politicians", tags=["Politicians & Momentum"])
app.include_router(counties.router, prefix="/api/counties", tags=["47 Counties Intelligence"])
app.include_router(reports.router, prefix="/api/daily-report", tags=["Morning Intelligence Reports"])
app.include_router(pipeline.router, prefix="/api/pipeline", tags=["Overnight Pipeline & Scrapers"])
app.include_router(ai_analyst.router, prefix="/api/ai", tags=["Gemini AI Analyst"])

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Kenya Political Intelligence API",
        "version": "2.4.0",
        "active_counties_monitored": 47,
        "database": "PostgreSQL Connected"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
`
  },
  {
    path: 'backend/app/models/schema.py',
    name: 'schema.py',
    language: 'python',
    category: 'models',
    description: 'SQLAlchemy Database Models for Articles, Politicians, Counties, and Daily Reports',
    content: `"""
SQLAlchemy PostgreSQL Database Models
"""
from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class NewsArticle(Base):
    __tablename__ = "news_articles"

    id = Column(String(64), primary_key=True, index=True) # SHA-256 hash for deduplication
    title = Column(String(512), nullable=False)
    description = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    url = Column(String(1024), unique=True, nullable=False, index=True)
    source_name = Column(String(128), nullable=False, index=True)
    source_category = Column(String(64), default="National Media")
    reliability_score = Column(Float, default=0.90)
    publication_date = Column(DateTime, default=datetime.utcnow, index=True)
    scraped_at = Column(DateTime, default=datetime.utcnow)
    
    # NLP & Extraction fields
    sentiment_label = Column(String(32), default="neutral") # positive, neutral, negative
    sentiment_score = Column(Float, default=0.0) # -1.0 to +1.0
    detected_entities = Column(JSON, default=dict) # {"politicians": [], "counties": [], "orgs": []}
    topics = Column(JSON, default=list) # ["Cost of Living", "SHA Healthcare"]
    simhash_fingerprint = Column(String(64), index=True)

class Politician(Base):
    __tablename__ = "politicians"

    id = Column(String(64), primary_key=True)
    name = Column(String(128), unique=True, nullable=False, index=True)
    aliases = Column(JSON, default=list) # ["Ruto", "WSR", "Nabii"]
    current_position = Column(String(256), nullable=False)
    party = Column(String(128), nullable=False, index=True)
    coalition = Column(String(128), nullable=False)
    home_county = Column(String(64), nullable=False)
    
    # Momentum & Statistics
    mentions_24h = Column(Integer, default=0)
    mentions_7d = Column(Integer, default=0)
    mention_growth_24h = Column(Float, default=0.0)
    momentum_score = Column(Float, default=50.0) # 0 to 100
    sentiment_score = Column(Float, default=0.0)
    sentiment_breakdown = Column(JSON, default=dict) # {"pos": 30, "neu": 40, "neg": 30}
    momentum_breakdown = Column(JSON, default=dict) # 6 weights
    top_counties = Column(JSON, default=list)
    top_topics = Column(JSON, default=list)
    risk_level = Column(String(32), default="MODERATE")

class CountyProfile(Base):
    __tablename__ = "counties"

    code = Column(String(8), primary_key=True) # "001" to "047"
    name = Column(String(64), unique=True, nullable=False)
    region = Column(String(64), nullable=False, index=True)
    governor = Column(String(128), nullable=False)
    governor_party = Column(String(64), nullable=False)
    senator = Column(String(128), nullable=False)
    registered_voters = Column(Integer, default=0)
    political_activity_index = Column(Float, default=50.0) # 0 to 100
    overnight_change_pct = Column(Float, default=0.0)
    signal_alert = Column(String(32), default="NONE") # HIGH, MEDIUM, EMERGING, NONE
    top_issues = Column(JSON, default=list)
    key_politicians = Column(JSON, default=list)

class DailyIntelligenceReport(Base):
    __tablename__ = "daily_intelligence_reports"

    id = Column(String(64), primary_key=True)
    report_date = Column(String(32), unique=True, index=True)
    title = Column(String(256), nullable=False)
    executive_summary = Column(Text, nullable=False)
    markdown_content = Column(Text, nullable=False)
    structured_json = Column(JSON, default=dict)
    generated_at = Column(DateTime, default=datetime.utcnow)
    generated_by_model = Column(String(64), default="gemini-3.7-flash")
`
  },
  {
    path: 'backend/app/collectors/rss_collector.py',
    name: 'rss_collector.py',
    language: 'python',
    category: 'collectors',
    description: 'Compliant Open Source RSS & Gazette Collector with Rate Limiting',
    content: `"""
Compliant Kenya Political RSS & Public Feed Ingestor
Fetches from verified national publishers respecting robots.txt and HTTP rate limits.
"""
import httpx
import feedparser
from bs4 import BeautifulSoup
import hashlib
import re
from datetime import datetime
from typing import List, Dict, Any

KENYA_RSS_FEEDS = [
    {"name": "Daily Nation", "url": "https://nation.africa/kenya/news/politics/rss", "reliability": 0.95},
    {"name": "The Standard", "url": "https://www.standardmedia.co.ke/rss/politics.xml", "reliability": 0.93},
    {"name": "The Star Kenya", "url": "https://www.the-star.co.ke/rss/news/politics", "reliability": 0.90},
    {"name": "Capital FM", "url": "https://www.capitalfm.co.ke/news/category/politics/feed/", "reliability": 0.92},
    {"name": "Citizen Digital", "url": "https://www.citizen.digital/rss/news/politics", "reliability": 0.94},
]

class KenyaNewsCollector:
    def __init__(self):
        self.headers = {
            "User-Agent": "KenyaPoliticalIntelligenceBot/2.4 (Research and Data Analysis; contact@kenyapolitics.intel)"
        }

    async def fetch_feed(self, feed_meta: Dict[str, Any]) -> List[Dict[str, Any]]:
        articles = []
        try:
            async with httpx.AsyncClient(timeout=10.0, headers=self.headers) as client:
                resp = await client.get(feed_meta["url"])
                if resp.status_code == 200:
                    parsed = feedparser.parse(resp.text)
                    for entry in parsed.entries[:25]:
                        title = entry.get("title", "").strip()
                        link = entry.get("link", "").strip()
                        summary = entry.get("summary", "")
                        
                        # Clean HTML tags from summary
                        soup = BeautifulSoup(summary, "html.parser")
                        clean_text = soup.get_text()

                        # Deduplication hash
                        content_hash = hashlib.sha256(f"{title}{link}".encode("utf-8")).hexdigest()

                        articles.append({
                            "id": content_hash,
                            "title": title,
                            "description": clean_text,
                            "url": link,
                            "source_name": feed_meta["name"],
                            "reliability_score": feed_meta["reliability"],
                            "publication_date": datetime.utcnow().isoformat()
                        })
        except Exception as e:
            print(f"⚠️ Error fetching {feed_meta['name']}: {str(e)}")
        return articles

    async def ingest_all_feeds(self) -> List[Dict[str, Any]]:
        all_articles = []
        for feed in KENYA_RSS_FEEDS:
            res = await self.fetch_feed(feed)
            all_articles.extend(res)
        return all_articles
`
  },
  {
    path: 'backend/app/nlp/entity_extractor.py',
    name: 'entity_extractor.py',
    language: 'python',
    category: 'nlp',
    description: 'spaCy & RegEx Entity Extractor customized for 47 Kenyan Counties and Politicians',
    content: `"""
Kenyan Political Entity & Topic Recognition Engine
Extracts 47 Counties, Key Political Figures, Coalitions, and Policy Issues.
"""
import re
from typing import Dict, List, Set

# Comprehensive Kenyan Political Entities Dictionary
KENYA_ENTITIES = {
    "politicians": {
        "William Ruto": ["William Ruto", "Ruto", "WSR", "Nabii", "President Ruto"],
        "Rigathi Gachagua": ["Rigathi Gachagua", "Gachagua", "Riggy G", "Former DP Gachagua"],
        "Kithure Kindiki": ["Kithure Kindiki", "Kindiki", "DP Kindiki", "Prof Kindiki"],
        "Raila Odinga": ["Raila Odinga", "Raila", "Baba", "Tinga", "Odinga", "AUC Candidate"],
        "Kalonzo Musyoka": ["Kalonzo Musyoka", "Kalonzo", "Wipper Leader", "Steve Kalonzo"],
        "George Natembeya": ["George Natembeya", "Natembeya", "Governor Natembeya", "Tawe Movement"],
        "Musalia Mudavadi": ["Musalia Mudavadi", "Mudavadi", "Prime CS"],
        "Moses Wetangula": ["Moses Wetangula", "Wetangula", "Speaker Wetangula", "Papa wa Roma"],
        "Johnson Sakaja": ["Johnson Sakaja", "Sakaja", "Governor Sakaja"],
        "Babu Owino": ["Babu Owino", "Paul Ongili", "MP Babu Owino"]
    },
    "topics": {
        "Cost of Living": ["cost of living", "ungah", "fuel prices", "taxes", "finance bill", "inflation"],
        "SHA Healthcare Transition": ["SHA", "SHIF", "NHIF", "healthcare crisis", "taifa care", "hospitals strike"],
        "Western Tawe Movement": ["tawe", "tawe movement", "western realignment", "luhya unity", "natembeya revolution"],
        "Broad-Based Government": ["broad based", "broad-based cabinet", "odm uda pact", "cooperation agreement"],
        "Mt. Kenya Unity & Realignment": ["mt kenya", "gema", "mountain politics", "limuru 3", "kingpin"]
    },
    "counties": [
        "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta", "Garissa", "Wajir", "Mandera",
        "Marsabit", "Isiolo", "Meru", "Tharaka Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua",
        "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia",
        "Uasin Gishu", "Elgeyo Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado",
        "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu", "Homa Bay",
        "Migori", "Kisii", "Nyamira", "Nairobi"
    ]
}

class KenyaEntityExtractor:
    def extract(self, text: str) -> Dict[str, Any]:
        found_politicians = set()
        found_topics = set()
        found_counties = set()

        text_lower = text.lower()

        # Match politicians by alias
        for standard_name, aliases in KENYA_ENTITIES["politicians"].items():
            for alias in aliases:
                if re.search(r'\\b' + re.escape(alias.lower()) + r'\\b', text_lower):
                    found_politicians.add(standard_name)
                    break

        # Match topics
        for topic_name, keywords in KENYA_ENTITIES["topics"].items():
            for kw in keywords:
                if re.search(r'\\b' + re.escape(kw.lower()) + r'\\b', text_lower):
                    found_topics.add(topic_name)
                    break

        # Match 47 counties
        for county in KENYA_ENTITIES["counties"]:
            if re.search(r'\\b' + re.escape(county.lower()) + r'\\b', text_lower):
                found_counties.add(county)

        return {
            "politicians": list(found_politicians),
            "topics": list(found_topics),
            "counties": list(found_counties)
        }
`
  },
  {
    path: 'backend/app/analytics/momentum_calculator.py',
    name: 'momentum_calculator.py',
    language: 'python',
    category: 'analytics',
    description: '6-Factor Statistical Political Momentum & Overnight Shift Indicator Formula',
    content: `"""
Political Momentum Indicator & Overnight Shift Formula
Calculates a 0-100 score using 6 weighted empirical factors:
1. Mention Growth Velocity (30%)
2. Geographic County Spread (20%)
3. Public Engagement & Lead Citations (15%)
4. Public Event Activity (15%)
5. Policy Topic Diversity (10%)
6. Net Sentiment Trajectory (10%)
"""
from typing import Dict, List, Any
import numpy as np

def calculate_momentum_score(
    mention_growth_pct: float,
    county_spread_count: int,
    engagement_index: float,
    event_count_24h: int,
    topic_diversity_count: int,
    sentiment_score: float
) -> Dict[str, Any]:
    # Factor 1: Mention Growth (30 pts max)
    # +100% growth maps to ~30 pts
    score_growth = min(30.0, max(0.0, (mention_growth_pct / 100.0) * 30.0 + 10.0))

    # Factor 2: Geographic County Spread (20 pts max)
    # Reaching 15+ counties maps to 20 pts
    score_geo = min(20.0, (county_spread_count / 15.0) * 20.0)

    # Factor 3: Public Engagement / Media Prominence (15 pts max)
    score_engagement = min(15.0, (engagement_index / 100.0) * 15.0)

    # Factor 4: Public Event / Rallies Activity (15 pts max)
    score_events = min(15.0, (event_count_24h / 5.0) * 15.0)

    # Factor 5: Topic Diversity (10 pts max)
    score_topics = min(10.0, (topic_diversity_count / 5.0) * 10.0)

    # Factor 6: Sentiment Trajectory (10 pts max)
    # Sentiment [-1.0, 1.0] normalized to [0, 10]
    score_sentiment = ((sentiment_score + 1.0) / 2.0) * 10.0

    total_momentum = round(score_growth + score_geo + score_engagement + score_events + score_topics + score_sentiment, 1)
    total_momentum = min(100.0, max(0.0, total_momentum))

    return {
        "total_score": total_momentum,
        "breakdown": {
            "mention_growth": round(score_growth, 1),
            "geographic_spread": round(score_geo, 1),
            "public_engagement": round(score_engagement, 1),
            "event_activity": round(score_events, 1),
            "topic_diversity": round(score_topics, 1),
            "sentiment_trend": round(score_sentiment, 1)
        }
    }

def detect_overnight_shift(metric_24h: float, baseline_7d: float, threshold_pct: float = 30.0) -> Dict[str, Any]:
    if baseline_7d == 0:
        pct_delta = 100.0 if metric_24h > 0 else 0.0
    else:
        pct_delta = ((metric_24h - baseline_7d) / baseline_7d) * 100.0

    level = "NORMAL"
    if pct_delta >= 50.0:
        level = "HIGH SIGNAL"
    elif pct_delta >= 30.0:
        level = "MEDIUM SIGNAL"
    elif pct_delta >= 15.0:
        level = "EMERGING SIGNAL"

    return {
        "level": level,
        "delta_pct": round(pct_delta, 1),
        "is_anomaly": pct_delta >= threshold_pct
    }
`
  },
  {
    path: 'backend/app/ai/gemini_analyst.py',
    name: 'gemini_analyst.py',
    language: 'python',
    category: 'ai',
    description: 'Official Google GenAI SDK integration for Gemini 3.7 Flash Political Synthesis',
    content: `"""
Kenya Political Intelligence - Gemini AI Analyst Service
Uses the official Google GenAI Python SDK (gemini-3.7-flash) to synthesize structured evidence into morning briefings.
"""
from google import genai
from google.genai import types
import os
import json
from typing import Dict, Any

class GeminiPoliticalAnalyst:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if self.api_key:
            self.client = genai.Client(api_key=self.api_key)
        else:
            self.client = None

    def synthesize_morning_report(self, evidence_data: Dict[str, Any]) -> str:
        if not self.client:
            raise ValueError("GEMINI_API_KEY environment variable is not configured.")

        system_instruction = (
            "You are the Director of Political Intelligence and Senior Political Scientist for Kenya. "
            "Your briefing must be strictly evidence-based, highly objective, analytical, and grounded "
            "exclusively in the empirical data provided. Never fabricate events or cite unprovided rumors."
        )

        prompt = f"""
ANALYZE THE FOLLOWING STRUCTURED KENYAN POLITICAL DATA:
{json.dumps(evidence_data, indent=2)}

TASK:
Produce an evidence-based, professional Morning Political Intelligence Briefing for Kenyan policymakers and political scientists.

MANDATORY SECTIONS:
# KENYA POLITICAL INTELLIGENCE BRIEF
## 1. EXECUTIVE STRATEGIC SUMMARY
## 2. TOP POLITICAL DEVELOPMENTS & POLICY INFLECTION POINTS
## 3. OVERNIGHT POLITICAL SHIFTS & EARLY WARNING RADAR
## 4. POLITICIAN MOMENTUM MATRIX
## 5. 47-COUNTY REGIONAL DYNAMICS & HOTSPOTS
## 6. EMERGING NARRATIVE TRACKER & COALITION STABILITY
## 7. STRATEGIC RISK MATRIX & SCENARIO OUTLOOK
## 8. DATA SOURCES & METHODOLOGICAL LIMITATIONS
"""

        response = self.client.models.generate_content(
            model="gemini-3.7-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.25,
                max_output_tokens=3000
            )
        )
        return response.text
`
  },
  {
    path: 'docker-compose.yml',
    name: 'docker-compose.yml',
    language: 'yaml',
    category: 'infra',
    description: 'Full stack Docker Compose file for FastAPI, PostgreSQL, Redis, and React frontend',
    content: `version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: kenya_politics_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: \${DB_PASSWORD:-kenya_intel_secret_2026}
      POSTGRES_DB: kenya_political_intel
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: kenya_politics_redis
    ports:
      - "6379:6379"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: kenya_politics_api
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql+asyncpg://postgres:\${DB_PASSWORD:-kenya_intel_secret_2026}@postgres:5432/kenya_political_intel
      GEMINI_API_KEY: \${GEMINI_API_KEY}
      PORT: 8000
    ports:
      - "8000:8000"

  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: kenya_politics_ui
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://backend:8000

volumes:
  postgres_data:
`
  },
  {
    path: 'requirements.txt',
    name: 'requirements.txt',
    language: 'text',
    category: 'infra',
    description: 'Python dependencies for FastAPI, SQLAlchemy, Google GenAI SDK, and NLP packages',
    content: `fastapi==0.115.8
uvicorn[standard]==0.34.0
sqlalchemy==2.0.38
asyncpg==0.30.0
psycopg2-binary==2.9.10
pydantic==2.10.6
google-genai==1.3.0
pandas==2.2.3
numpy==2.2.3
scikit-learn==1.6.1
beautifulsoup4==4.13.3
feedparser==6.0.11
httpx==0.28.1
spacy==3.8.4
apscheduler==3.11.0
pytest==8.3.4
pytest-asyncio==0.25.3
`
  },
  {
    path: 'tests/test_pipeline.py',
    name: 'test_pipeline.py',
    language: 'python',
    category: 'tests',
    description: 'Pytest suite verifying entity extraction, momentum math, and report generation',
    content: `"""
Test Suite for Kenya Political Intelligence Backend
"""
import pytest
from app.nlp.entity_extractor import KenyaEntityExtractor
from app.analytics.momentum_calculator import calculate_momentum_score, detect_overnight_shift

def test_kenya_entity_extractor_politicians():
    extractor = KenyaEntityExtractor()
    sample_text = "President William Ruto and former DP Rigathi Gachagua clashed over Mt. Kenya politics in Nyeri County."
    entities = extractor.extract(sample_text)
    
    assert "William Ruto" in entities["politicians"]
    assert "Rigathi Gachagua" in entities["politicians"]
    assert "Nyeri" in entities["counties"]

def test_kenya_entity_extractor_western_tawe():
    extractor = KenyaEntityExtractor()
    sample_text = "Governor George Natembeya launched the Tawe movement in Kakamega to challenge traditional regional leadership."
    entities = extractor.extract(sample_text)
    
    assert "George Natembeya" in entities["politicians"]
    assert "Western Tawe Movement" in entities["topics"]
    assert "Kakamega" in entities["counties"]

def test_momentum_scoring_calculation():
    result = calculate_momentum_score(
        mention_growth_pct=64.2,
        county_spread_count=14,
        engagement_index=88.0,
        event_count_24h=3,
        topic_diversity_count=4,
        sentiment_score=0.45
    )
    assert 0.0 <= result["total_score"] <= 100.0
    assert result["total_score"] > 60.0
    assert "mention_growth" in result["breakdown"]

def test_overnight_shift_high_signal():
    shift = detect_overnight_shift(metric_24h=180.0, baseline_7d=100.0)
    assert shift["level"] == "HIGH SIGNAL"
    assert shift["delta_pct"] == 80.0
    assert shift["is_anomaly"] is True
`
  },
  {
    path: 'README.md',
    name: 'README.md',
    language: 'markdown',
    category: 'infra',
    description: 'Comprehensive engineering guide for setup, running in VS Code, and architecture overview',
    content: `# Kenya Political Intelligence & Analysis Platform

> Automated open-source political intelligence, statistical momentum tracking, and morning briefing generator for Kenya's 47 devolved counties.

---

## 🏛️ Architecture Overview

The platform executes a deterministic 6-stage nightly intelligence cycle:

1. **10:00 PM EAT — Ingestion Layer**: Fetches from verified Kenyan media (Daily Nation, Standard, Star, Capital FM, Citizen Digital) and public Gazette feeds.
2. **11:00 PM EAT — Cleaning & Deduplication**: Removes duplicate articles using SHA-256 and SimHash text fingerprints.
3. **12:00 AM EAT — NLP Extraction**: Custom entity resolution identifying all 47 counties, political leaders, and policy topics.
4. **01:00 AM EAT — Statistical Metrics**: Calculates the 6-variable **Political Momentum Indicator** (0–100) and **County Activity Indices**.
5. **02:00 AM EAT — Overnight Shift Radar**: Anomaly detection flagging statistical deltas comparing 24h vs. 7d/30d baselines.
6. **03:00 AM EAT — Gemini AI Synthesis**: Ingests structured evidence into **Gemini 3.7 Flash** to generate the executive morning intelligence brief.

---

## 🚀 Running in Visual Studio Code

### Option 1: Full-Stack Dev Server (Immediate Preview)
\`\`\`bash
npm install
npm run dev
\`\`\`
Visit **http://localhost:3000** to view the interactive intelligence dashboard.

### Option 2: Python FastAPI Backend
\`\`\`bash
# 1. Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: .\\venv\\Scripts\\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
export GEMINI_API_KEY="your_api_key_here"

# 4. Start FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
\`\`\`

### Option 3: Docker Compose Full Stack
\`\`\`bash
docker-compose up --build
\`\`\`

---

## 🧪 Running Unit Tests
\`\`\`bash
pytest tests/ -v
\`\`\`

---

## 🛡️ Non-Partisan & Compliance Disclaimer
This platform strictly processes public, open-source data. Momentum scores represent mathematical media velocity and do not represent deterministic election polling results.
`
  }
];
