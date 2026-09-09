import {
  CountyPoliticalProfile,
  Politician,
  PoliticalParty,
  PoliticalTopic,
  PoliticalSignal,
  EmergingNarrative,
  DailyReport,
  Source,
  NewsArticle,
  PipelineStatus,
  EconomicIndicator,
  SocialIndicator,
  SocioEconomicCorrelation
} from '../types';

export const KENYA_SOURCES: Source[] = [
  {
    id: 'src-nation',
    name: 'Daily Nation (Nation Media Group)',
    url: 'https://nation.africa/kenya/rss',
    type: 'rss',
    reliabilityScore: 0.94,
    active: true,
    category: 'mainstream_news',
    articlesCount: 142
  },
  {
    id: 'src-standard',
    name: 'The Standard Media',
    url: 'https://www.standardmedia.co.ke/rss/politics.xml',
    type: 'rss',
    reliabilityScore: 0.91,
    active: true,
    category: 'mainstream_news',
    articlesCount: 118
  },
  {
    id: 'src-star',
    name: 'The Star Kenya',
    url: 'https://www.the-star.co.ke/rss/news/politics',
    type: 'rss',
    reliabilityScore: 0.88,
    active: true,
    category: 'mainstream_news',
    articlesCount: 135
  },
  {
    id: 'src-capital',
    name: 'Capital FM Kenya',
    url: 'https://www.capitalfm.co.ke/news/feed/',
    type: 'rss',
    reliabilityScore: 0.90,
    active: true,
    category: 'broadcast',
    articlesCount: 89
  },
  {
    id: 'src-citizen',
    name: 'Citizen Digital',
    url: 'https://www.citizen.digital/rss/news',
    type: 'rss',
    reliabilityScore: 0.93,
    active: true,
    category: 'broadcast',
    articlesCount: 156
  },
  {
    id: 'src-kbc',
    name: 'Kenya Broadcasting Corporation (KBC)',
    url: 'https://www.kbc.co.ke/feed/',
    type: 'rss',
    reliabilityScore: 0.89,
    active: true,
    category: 'government_official',
    articlesCount: 64
  },
  {
    id: 'src-gazette',
    name: 'Kenya Gazette & Parliament Hansard',
    url: 'https://www.kenyalaw.org/kenya_gazette',
    type: 'government',
    reliabilityScore: 0.99,
    active: true,
    category: 'government_official',
    articlesCount: 22
  },
  {
    id: 'src-business-daily',
    name: 'Business Daily Africa',
    url: 'https://www.businessdailyafrica.com/feed',
    type: 'rss',
    reliabilityScore: 0.95,
    active: true,
    category: 'mainstream_news',
    articlesCount: 78
  }
];

export const KENYA_COUNTIES_47: CountyPoliticalProfile[] = [
  { code: '001', name: 'Mombasa', region: 'Coast', headquarters: 'Mombasa City', governor: 'Abdulswamad Shariff Nassir', governorParty: 'ODM', senator: 'Mohammed Faki', registeredVoters: 580223, politicalActivityIndex: 78, dominantParty: 'ODM', dominantCoalition: 'Azimio la Umoja', topIssues: ['Port Operations & Logistics', 'Blue Economy Devolution', 'Municipal Land Rates'], keyPoliticians: ['Abdulswamad Nassir', 'Ali Hassan Joho', 'Mohammed Faki'], overnightChangePct: 14.5, signalAlert: 'MEDIUM', recentEventsCount: 6, socioEconomic: { povertyRatePct: 27.1, mainEconomicPillar: 'Port Logistics & Tourism', stapleFoodPriceIndex: 112, youthUnemploymentRatePct: 38.2, shaRegistrationPct: 72.4, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 82.5, primaryCropOrCommodity: 'Maritime Port Cargo & Fisheries' } },
  { code: '002', name: 'Kwale', region: 'Coast', headquarters: 'Kwale', governor: 'Fatuma Achani', governorParty: 'UDA', senator: 'Issa Boy Juma', registeredVoters: 328253, politicalActivityIndex: 54, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza', topIssues: ['Titanium Mining Royalties', 'Tourism Revival', 'Squatter Resettlement'], keyPoliticians: ['Fatuma Achani', 'Salim Mvurya'], overnightChangePct: 3.2, signalAlert: 'NONE', recentEventsCount: 2, socioEconomic: { povertyRatePct: 47.4, mainEconomicPillar: 'Mining, Sugar & Coastal Tourism', stapleFoodPriceIndex: 104, youthUnemploymentRatePct: 41.5, shaRegistrationPct: 61.2, asalDroughtPhase: 'Alert', ownSourceRevenueTargetPct: 64.0, primaryCropOrCommodity: 'Sugarcane, Cassava, Titanium' } },
  { code: '003', name: 'Kilifi', region: 'Coast', headquarters: 'Kilifi', governor: 'Gideon Mung\'aro', governorParty: 'ODM', senator: 'Stewart Madzayo', registeredVoters: 582631, politicalActivityIndex: 68, dominantParty: 'ODM', dominantCoalition: 'Azimio la Umoja', topIssues: ['Vipingo Land Disputes', 'County Cash Allocation Delay', 'Cashew Nut Revival'], keyPoliticians: ['Gideon Mung\'aro', 'Stewart Madzayo', 'Aisha Jumwa'], overnightChangePct: 18.2, signalAlert: 'MEDIUM', recentEventsCount: 4, socioEconomic: { povertyRatePct: 46.4, mainEconomicPillar: 'Cashew Nuts, Tourism & Coconut Farming', stapleFoodPriceIndex: 106, youthUnemploymentRatePct: 43.1, shaRegistrationPct: 59.8, asalDroughtPhase: 'Alert', ownSourceRevenueTargetPct: 68.3, primaryCropOrCommodity: 'Coconuts, Cashew Nuts & Fishing' } },
  { code: '004', name: 'Tana River', region: 'Coast', headquarters: 'Hola', governor: 'Dhadho Godhana', governorParty: 'ODM', senator: 'Danson Mungatana', registeredVoters: 141096, politicalActivityIndex: 48, dominantParty: 'ODM', dominantCoalition: 'Azimio la Umoja', topIssues: ['Tana Delta Irrigation', 'Pastoralist Land Rights', 'Flood Mitigation'], keyPoliticians: ['Dhadho Godhana', 'Danson Mungatana'], overnightChangePct: 2.1, signalAlert: 'NONE', recentEventsCount: 1, socioEconomic: { povertyRatePct: 62.2, mainEconomicPillar: 'Pastoralism & Irrigation Schemes', stapleFoodPriceIndex: 114, youthUnemploymentRatePct: 49.0, shaRegistrationPct: 48.2, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 42.1, primaryCropOrCommodity: 'Beef Cattle & Irrigated Rice' } },
  { code: '005', name: 'Lamu', region: 'Coast', headquarters: 'Lamu', governor: 'Issa Timamy', governorParty: 'ANC', senator: 'Joseph Kamau Githuku', registeredVoters: 79157, politicalActivityIndex: 58, dominantParty: 'ANC', dominantCoalition: 'Kenya Kwanza', topIssues: ['LAPSSET Corridor Benefits', 'Boni Forest Security', 'Historical Land Injustices'], keyPoliticians: ['Issa Timamy', 'Ruweida Obo'], overnightChangePct: 6.4, signalAlert: 'NONE', recentEventsCount: 2, socioEconomic: { povertyRatePct: 28.5, mainEconomicPillar: 'Port Shipping, Tourism & Cotton', stapleFoodPriceIndex: 108, youthUnemploymentRatePct: 36.4, shaRegistrationPct: 66.7, asalDroughtPhase: 'Alert', ownSourceRevenueTargetPct: 58.9, primaryCropOrCommodity: 'Cotton, Mangoes & Marine Fish' } },
  { code: '006', name: 'Taita-Taveta', region: 'Coast', headquarters: 'Mwatate', governor: 'Andrew Mwadime', governorParty: 'Independent', senator: 'Johnes Mwaruma', registeredVoters: 181821, politicalActivityIndex: 51, dominantParty: 'Independent', dominantCoalition: 'Neutral', topIssues: ['Tsavo National Park Revenue Share', 'Gemstone Mining Leases'], keyPoliticians: ['Andrew Mwadime', 'Dan Mwazo'], overnightChangePct: 4.8, signalAlert: 'NONE', recentEventsCount: 2, socioEconomic: { povertyRatePct: 32.3, mainEconomicPillar: 'Gemstone Mining, Sisal & Horticulture', stapleFoodPriceIndex: 103, youthUnemploymentRatePct: 33.8, shaRegistrationPct: 71.0, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 61.4, primaryCropOrCommodity: 'Bananas, Sisal & Green Grams' } },
  { code: '007', name: 'Garissa', region: 'North Eastern', headquarters: 'Garissa', governor: 'Nathif Jama Adam', governorParty: 'ODM', senator: 'Abdulkadir Haji', registeredVoters: 207435, politicalActivityIndex: 65, dominantParty: 'ODM', dominantCoalition: 'Azimio la Umoja', topIssues: ['Northern Border Security', 'ID Issuance & Vetting Policy', 'Dadaab Refugee Repatriation'], keyPoliticians: ['Nathif Jama', 'Aden Duale', 'Abdulkadir Haji'], overnightChangePct: 12.0, signalAlert: 'NONE', recentEventsCount: 3, socioEconomic: { povertyRatePct: 65.5, mainEconomicPillar: 'Livestock Trade & Cross-Border Commerce', stapleFoodPriceIndex: 118, youthUnemploymentRatePct: 52.4, shaRegistrationPct: 44.0, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 48.6, primaryCropOrCommodity: 'Camel, Goats & Livestock' } },
  { code: '008', name: 'Wajir', region: 'North Eastern', headquarters: 'Wajir', governor: 'Ahmed Abdullahi', governorParty: 'ODM', senator: 'Abass Sheikh Mohamed', registeredVoters: 207758, politicalActivityIndex: 59, dominantParty: 'ODM', dominantCoalition: 'Azimio la Umoja', topIssues: ['Drought Resilience Funds', 'Cross-Border Grazing Accords'], keyPoliticians: ['Ahmed Abdullahi', 'Adan Keynan'], overnightChangePct: 5.3, signalAlert: 'NONE', recentEventsCount: 2, socioEconomic: { povertyRatePct: 62.6, mainEconomicPillar: 'Pastoralist Livestock Economy', stapleFoodPriceIndex: 120, youthUnemploymentRatePct: 54.1, shaRegistrationPct: 41.5, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 39.8, primaryCropOrCommodity: 'Livestock & Hides/Skins' } },
  { code: '009', name: 'Mandera', region: 'North Eastern', headquarters: 'Mandera', governor: 'Mohamed Adan Khalif', governorParty: 'UDM', senator: 'Ali Roba', registeredVoters: 217030, politicalActivityIndex: 62, dominantParty: 'UDM', dominantCoalition: 'Kenya Kwanza', topIssues: ['Border Surveillance', 'Equalization Fund Disbursals'], keyPoliticians: ['Ali Roba', 'Mohamed Khalif'], overnightChangePct: 7.9, signalAlert: 'NONE', recentEventsCount: 3, socioEconomic: { povertyRatePct: 77.6, mainEconomicPillar: 'Tri-border Commerce & Pastoralism', stapleFoodPriceIndex: 124, youthUnemploymentRatePct: 58.0, shaRegistrationPct: 38.2, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 45.2, primaryCropOrCommodity: 'Livestock & Irrigated Fruits' } },
  { code: '010', name: 'Marsabit', region: 'Eastern', headquarters: 'Marsabit', governor: 'Mohamud Ali', governorParty: 'UDM', senator: 'Mohamed Said Chute', registeredVoters: 166912, politicalActivityIndex: 53, dominantParty: 'UDM', dominantCoalition: 'Kenya Kwanza', topIssues: ['Inter-Clan Peace Treaties', 'Lake Turkana Wind Power Compensations'], keyPoliticians: ['Mohamud Ali', 'Ukur Yatani'], overnightChangePct: 3.5, signalAlert: 'NONE', recentEventsCount: 1, socioEconomic: { povertyRatePct: 63.7, mainEconomicPillar: 'Renewable Wind Energy & Pastoralism', stapleFoodPriceIndex: 119, youthUnemploymentRatePct: 51.0, shaRegistrationPct: 49.3, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 41.0, primaryCropOrCommodity: 'Camels, Cattle & Fish (L. Turkana)' } },
  { code: '011', name: 'Isiolo', region: 'Eastern', headquarters: 'Isiolo', governor: 'Abdi Hassan Guyo', governorParty: 'Jubilee', senator: 'Fatuma Dullo', registeredVoters: 89504, politicalActivityIndex: 57, dominantParty: 'Jubilee', dominantCoalition: 'Azimio / Independent', topIssues: ['Isiolo Resort City Land Title Disputes', 'Pastoral Cattle Rustling'], keyPoliticians: ['Abdi Guyo', 'Fatuma Dullo'], overnightChangePct: 8.1, signalAlert: 'NONE', recentEventsCount: 2, socioEconomic: { povertyRatePct: 51.9, mainEconomicPillar: 'Transport Gateway, Abattoirs & Tourism', stapleFoodPriceIndex: 110, youthUnemploymentRatePct: 46.2, shaRegistrationPct: 55.4, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 53.7, primaryCropOrCommodity: 'Livestock Meat Export & Sand Harvesting' } },
  { code: '012', name: 'Meru', region: 'Eastern', headquarters: 'Meru', governor: 'Kawira Mwangaza', governorParty: 'Independent', senator: 'Kathuri Murungi', registeredVoters: 772139, politicalActivityIndex: 89, dominantParty: 'UDA / Independent', dominantCoalition: 'Kenya Kwanza Contest', topIssues: ['Gubernatorial Impeachment Fallout', 'Miraa Export Market Access', 'County Assembly Friction'], keyPoliticians: ['Kawira Mwangaza', 'Mithika Linturi', 'Kathuri Murungi'], overnightChangePct: 38.6, signalAlert: 'HIGH', recentEventsCount: 9, socioEconomic: { povertyRatePct: 19.4, mainEconomicPillar: 'Miraa (Khat), Coffee, Tea & Bananas', stapleFoodPriceIndex: 96, youthUnemploymentRatePct: 24.8, shaRegistrationPct: 76.5, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 84.1, primaryCropOrCommodity: 'Miraa, Specialty Arabica & Dairy' } },
  { code: '013', name: 'Tharaka-Nithi', region: 'Eastern', headquarters: 'Kathwana', governor: 'Muthomi Njuki', governorParty: 'UDA', senator: 'Mwenda Gataya', registeredVoters: 231932, politicalActivityIndex: 72, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza', topIssues: ['Kindiki Deputy Presidency Backing', 'Mt Kenya East Political Caucus'], keyPoliticians: ['Kithure Kindiki', 'Muthomi Njuki'], overnightChangePct: 24.1, signalAlert: 'MEDIUM', recentEventsCount: 5, socioEconomic: { povertyRatePct: 23.8, mainEconomicPillar: 'Tea, Coffee, Green Grams & Mining', stapleFoodPriceIndex: 98, youthUnemploymentRatePct: 27.2, shaRegistrationPct: 74.0, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 72.8, primaryCropOrCommodity: 'Tea, Green Grams (Ndengu) & Sorghum' } },
  { code: '014', name: 'Embu', region: 'Eastern', headquarters: 'Embu', governor: 'Cecily Mbarire', governorParty: 'UDA', senator: 'Alexander Mundigi', registeredVoters: 334302, politicalActivityIndex: 76, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza', topIssues: ['UDA Party Chairmanship Politics', 'Coffee Cherry Advance Fund'], keyPoliticians: ['Cecily Mbarire', 'Justin Muturi', 'Manyatta MPs'], overnightChangePct: 19.4, signalAlert: 'MEDIUM', recentEventsCount: 4, socioEconomic: { povertyRatePct: 28.2, mainEconomicPillar: 'Coffee, Macadamia, Tea & Rice (Mwea)', stapleFoodPriceIndex: 97, youthUnemploymentRatePct: 26.5, shaRegistrationPct: 78.2, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 79.4, primaryCropOrCommodity: 'Macadamia Nuts, Coffee & Mangoes' } },
  { code: '015', name: 'Kitui', region: 'Eastern', headquarters: 'Kitui', governor: 'Julius Malombe', governorParty: 'Wiper', senator: 'Enoch Wambua', registeredVoters: 532758, politicalActivityIndex: 73, dominantParty: 'Wiper', dominantCoalition: 'Azimio la Umoja', topIssues: ['Kalonzo 2027 Presidential Bid', 'Coal Mining Policy in Mui Basin'], keyPoliticians: ['Kalonzo Musyoka', 'Julius Malombe', 'Enoch Wambua', 'Charity Ngilu'], overnightChangePct: 15.6, signalAlert: 'NONE', recentEventsCount: 4, socioEconomic: { povertyRatePct: 47.5, mainEconomicPillar: 'Green Grams, Honey, Charcoal & Mining', stapleFoodPriceIndex: 105, youthUnemploymentRatePct: 37.0, shaRegistrationPct: 63.4, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 62.0, primaryCropOrCommodity: 'Green Grams, Honey & Livestock' } },
  { code: '016', name: 'Machakos', region: 'Eastern', headquarters: 'Machakos', governor: 'Wavinya Ndeti', governorParty: 'Wiper', senator: 'Agnes Kavindu Muthama', registeredVoters: 687565, politicalActivityIndex: 81, dominantParty: 'Wiper', dominantCoalition: 'Azimio la Umoja', topIssues: ['Kalonzo Kingpin Mandate', 'Konza Technopolis Expansion', 'County Health Strikes'], keyPoliticians: ['Wavinya Ndeti', 'Kalonzo Musyoka', 'Alfred Mutua'], overnightChangePct: 21.0, signalAlert: 'MEDIUM', recentEventsCount: 7, socioEconomic: { povertyRatePct: 23.3, mainEconomicPillar: 'Manufacturing, Real Estate & Fruit Farming', stapleFoodPriceIndex: 101, youthUnemploymentRatePct: 29.8, shaRegistrationPct: 77.1, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 83.2, primaryCropOrCommodity: 'Mangoes, French Beans & Cement' } },
  { code: '017', name: 'Makueni', region: 'Eastern', headquarters: 'Wote', governor: 'Mutula Kilonzo Jnr', governorParty: 'Wiper', senator: 'Dan Maanzo', registeredVoters: 479401, politicalActivityIndex: 75, dominantParty: 'Wiper', dominantCoalition: 'Azimio la Umoja', topIssues: ['Thwake Dam Project Audit', 'Ukambani Unity Declaration'], keyPoliticians: ['Mutula Kilonzo Jnr', 'Dan Maanzo', 'Kivutha Kibwana'], overnightChangePct: 11.2, signalAlert: 'NONE', recentEventsCount: 4, socioEconomic: { povertyRatePct: 34.8, mainEconomicPillar: 'Mango Processing, Citrus & Universal Health', stapleFoodPriceIndex: 102, youthUnemploymentRatePct: 31.4, shaRegistrationPct: 81.5, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 76.5, primaryCropOrCommodity: 'Mangoes, Oranges & Pulses' } },
  { code: '018', name: 'Nyandarua', region: 'Central', headquarters: 'Ol Kalou', governor: 'Kiarie Badilisha', governorParty: 'UDA', senator: 'John Methu', registeredVoters: 361165, politicalActivityIndex: 71, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza / Mt Kenya Shift', topIssues: ['Potato Processing Minimum Price', 'Mt Kenya Ground Sentiment'], keyPoliticians: ['Kiarie Badilisha', 'John Methu', 'Faith Gitau'], overnightChangePct: 17.5, signalAlert: 'NONE', recentEventsCount: 4, socioEconomic: { povertyRatePct: 24.5, mainEconomicPillar: 'Irish Potatoes, Cabbage, Dairy & Cut Flowers', stapleFoodPriceIndex: 92, youthUnemploymentRatePct: 22.1, shaRegistrationPct: 79.2, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 74.3, primaryCropOrCommodity: 'Irish Potatoes & Fresh Cow Milk' } },
  { code: '019', name: 'Nyeri', region: 'Central', headquarters: 'Nyeri', governor: 'Mutahi Kahiga', governorParty: 'UDA', senator: 'Wahome Wamatinga', registeredVoters: 481632, politicalActivityIndex: 94, dominantParty: 'UDA / Gachagua Base', dominantCoalition: 'Mt Kenya Resistance / KK Split', topIssues: ['Gachagua Impeachment Backlash', 'Coffee & Tea Guaranteed Minimum Returns', 'Broad-Based Govt Opposition'], keyPoliticians: ['Rigathi Gachagua', 'Mutahi Kahiga', 'Duncan Maina Mathenge'], overnightChangePct: 49.3, signalAlert: 'HIGH', recentEventsCount: 14, socioEconomic: { povertyRatePct: 15.3, mainEconomicPillar: 'Specialty Arabica Coffee, Tea & Dairy', stapleFoodPriceIndex: 94, youthUnemploymentRatePct: 21.0, shaRegistrationPct: 84.6, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 88.0, primaryCropOrCommodity: 'Arabica Coffee, Black Tea & Horticulture' } },
  { code: '020', name: 'Kirinyaga', region: 'Central', headquarters: 'Kerugoya', governor: 'Anne Waiguru', governorParty: 'UDA', senator: 'Kamau Murango', registeredVoters: 359858, politicalActivityIndex: 86, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza', topIssues: ['Council of Governors Transition', 'Mwea Rice Irrigation Subsidies', 'Mt Kenya Kingpin Tug-of-war'], keyPoliticians: ['Anne Waiguru', 'Martha Karua', 'Kamau Murango'], overnightChangePct: 29.8, signalAlert: 'MEDIUM', recentEventsCount: 8, socioEconomic: { povertyRatePct: 20.0, mainEconomicPillar: 'Mwea Pishori Rice, Tea & French Beans', stapleFoodPriceIndex: 93, youthUnemploymentRatePct: 22.9, shaRegistrationPct: 82.1, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 85.6, primaryCropOrCommodity: 'Basmati/Pishori Rice & Black Tea' } },
  { code: '021', name: 'Murang\'a', region: 'Central', headquarters: 'Murang\'a', governor: 'Irungu Kang\'ata', governorParty: 'UDA', senator: 'Joe Nyutu', registeredVoters: 620929, politicalActivityIndex: 91, dominantParty: 'UDA', dominantCoalition: 'Mt Kenya Dynamic Shift', topIssues: ['Kangata Care Healthcare Pilot', 'Kigumo Water Compact', 'Broad-Based Alliance Pushback'], keyPoliticians: ['Irungu Kang\'ata', 'Ndindi Nyoro', 'Joe Nyutu', 'Sabina Chege'], overnightChangePct: 41.2, signalAlert: 'HIGH', recentEventsCount: 11, socioEconomic: { povertyRatePct: 18.2, mainEconomicPillar: 'Avocados (Hass), Coffee, Tea & Dairy', stapleFoodPriceIndex: 95, youthUnemploymentRatePct: 23.4, shaRegistrationPct: 86.3, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 89.2, primaryCropOrCommodity: 'Hass Avocados & Black Tea' } },
  { code: '022', name: 'Kiambu', region: 'Central', headquarters: 'Kiambu', governor: 'Kimani Wamatangi', governorParty: 'UDA', senator: 'Karungo wa Thang\'wa', registeredVoters: 1275008, politicalActivityIndex: 95, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza Ground Split', topIssues: ['Affordable Housing Levy Resentment', 'Gachagua Sympathy Wave', 'County Assembly Clashes'], keyPoliticians: ['Kimani Wamatangi', 'Kimani Ichung\'wah', 'Karungo wa Thang\'wa', 'Alice Ng\'ang\'a'], overnightChangePct: 46.7, signalAlert: 'HIGH', recentEventsCount: 16, socioEconomic: { povertyRatePct: 14.8, mainEconomicPillar: 'Real Estate, Light Industry, Tea & Coffee', stapleFoodPriceIndex: 99, youthUnemploymentRatePct: 25.1, shaRegistrationPct: 85.0, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 91.5, primaryCropOrCommodity: 'Coffee, Tea, Poultry & Dairy' } },
  { code: '023', name: 'Turkana', region: 'Rift Valley', headquarters: 'Lodwar', governor: 'Jeremiah Lomorukai', governorParty: 'ODM', senator: 'James Lomenen', registeredVoters: 238528, politicalActivityIndex: 61, dominantParty: 'ODM', dominantCoalition: 'Broad-Based Alliance', topIssues: ['Tullow Oil Early Extraction Accord', 'Cattle Rustling along Kerio Valley'], keyPoliticians: ['Jeremiah Lomorukai', 'John Munyes'], overnightChangePct: 8.5, signalAlert: 'NONE', recentEventsCount: 3, socioEconomic: { povertyRatePct: 79.4, mainEconomicPillar: 'Pastoralism, Fisheries & Oil Exploration', stapleFoodPriceIndex: 122, youthUnemploymentRatePct: 56.5, shaRegistrationPct: 39.1, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 37.4, primaryCropOrCommodity: 'Fish (Tilapia/Nile Perch) & Pastoral Stock' } },
  { code: '024', name: 'West Pokot', region: 'Rift Valley', headquarters: 'Kapenguria', governor: 'Simon Kachapin', governorParty: 'UDA', senator: 'Julius Murgor', registeredVoters: 214574, politicalActivityIndex: 58, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza', topIssues: ['Peace Caravans with Pokot-Karamojong', 'Cemtech Cement Plant Operations'], keyPoliticians: ['Simon Kachapin', 'John Lonyangapuo'], overnightChangePct: 4.2, signalAlert: 'NONE', recentEventsCount: 2, socioEconomic: { povertyRatePct: 57.3, mainEconomicPillar: 'Pastoralism, Limestone Mining & Maize', stapleFoodPriceIndex: 108, youthUnemploymentRatePct: 42.0, shaRegistrationPct: 51.6, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 49.0, primaryCropOrCommodity: 'Beef Cattle & Limestone/Cement' } },
  { code: '025', name: 'Samburu', region: 'Rift Valley', headquarters: 'Maralal', governor: 'Lati Lelelit', governorParty: 'UDA', senator: 'Steve Lelegwe', registeredVoters: 100014, politicalActivityIndex: 56, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza', topIssues: ['Conservancy Revenue Sharing', 'Malaso Drought Relief'], keyPoliticians: ['Lati Lelelit', 'Steve Lelegwe'], overnightChangePct: 3.8, signalAlert: 'NONE', recentEventsCount: 2, socioEconomic: { povertyRatePct: 73.0, mainEconomicPillar: 'Wildlife Conservancies & Pastoralism', stapleFoodPriceIndex: 117, youthUnemploymentRatePct: 48.9, shaRegistrationPct: 43.8, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 44.5, primaryCropOrCommodity: 'Livestock & Eco-Tourism Services' } },
  { code: '026', name: 'Trans Nzoia', region: 'Rift Valley', headquarters: 'Kitale', governor: 'George Natembeya', governorParty: 'DAP-K', senator: 'Allan Chesang', registeredVoters: 398917, politicalActivityIndex: 88, dominantParty: 'DAP-K / Tawe Movement', dominantCoalition: 'Tawe Independence Shift', topIssues: ['Tawe Movement Rebellion vs Wetangula/Mudavadi', 'Kitale Maize Subsidy Buying', 'County Hospital Upgrades'], keyPoliticians: ['George Natembeya', 'Moses Wetangula', 'Chris Wamalwa'], overnightChangePct: 58.4, signalAlert: 'HIGH', recentEventsCount: 12, socioEconomic: { povertyRatePct: 34.0, mainEconomicPillar: 'Commercial Maize Basket & Dairy Farming', stapleFoodPriceIndex: 88, youthUnemploymentRatePct: 31.0, shaRegistrationPct: 73.5, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 78.0, primaryCropOrCommodity: 'Commercial Maize (National Granary) & Milk' } },
  { code: '027', name: 'Uasin Gishu', region: 'Rift Valley', headquarters: 'Eldoret City', governor: 'Jonathan Bii (Koti Ne Waka)', governorParty: 'UDA', senator: 'Jackson Mandago', registeredVoters: 506138, politicalActivityIndex: 92, dominantParty: 'UDA', dominantCoalition: 'Presidential Stronghold (KK)', topIssues: ['Eldoret City Status Charter roll-out', 'Finland Education Scholarship Probe', 'Fertilizer Subsidies'], keyPoliticians: ['William Ruto', 'Jonathan Bii', 'Jackson Mandago', 'Oscar Sudi'], overnightChangePct: 22.4, signalAlert: 'MEDIUM', recentEventsCount: 13, socioEconomic: { povertyRatePct: 26.1, mainEconomicPillar: 'Grain Milling, Commercial Wheat & Athletics', stapleFoodPriceIndex: 90, youthUnemploymentRatePct: 28.5, shaRegistrationPct: 83.2, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 86.4, primaryCropOrCommodity: 'Wheat, Maize & High-Value Athletics' } },
  { code: '028', name: 'Elgeyo-Marakwet', region: 'Rift Valley', headquarters: 'Iten', governor: 'Wisley Rotich', governorParty: 'UDA', senator: 'William Kisang', registeredVoters: 211882, politicalActivityIndex: 64, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza', topIssues: ['High Altitude Athlete Training Hubs', 'Kerio Valley Anti-Banditry Police Units'], keyPoliticians: ['Kipchumba Murkomen', 'Wisley Rotich'], overnightChangePct: 12.8, signalAlert: 'NONE', recentEventsCount: 3, socioEconomic: { povertyRatePct: 43.4, mainEconomicPillar: 'Potatoes, High-Altitude Athletics & Fluorspar', stapleFoodPriceIndex: 94, youthUnemploymentRatePct: 33.2, shaRegistrationPct: 69.4, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 67.2, primaryCropOrCommodity: 'Irish Potatoes, Passion Fruits & Sports' } },
  { code: '029', name: 'Nandi', region: 'Rift Valley', headquarters: 'Kapsabet', governor: 'Stephen Sang', governorParty: 'UDA', senator: 'Samson Cherargei', registeredVoters: 406288, politicalActivityIndex: 79, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza', topIssues: ['Cherargei Presidential Term Limit Bill Debate', 'Multinational Tea Plucking Automation'], keyPoliticians: ['Samson Cherargei', 'Stephen Sang'], overnightChangePct: 27.6, signalAlert: 'MEDIUM', recentEventsCount: 6, socioEconomic: { povertyRatePct: 28.1, mainEconomicPillar: 'Multinational & Smallholder Tea, Maize', stapleFoodPriceIndex: 92, youthUnemploymentRatePct: 27.8, shaRegistrationPct: 75.8, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 75.3, primaryCropOrCommodity: 'Black Tea & Sugarcane' } },
  { code: '030', name: 'Baringo', region: 'Rift Valley', headquarters: 'Kabarnet', governor: 'Benjamin Cheboi', governorParty: 'UDA', senator: 'William Cheptumo', registeredVoters: 281053, politicalActivityIndex: 67, dominantParty: 'UDA / KANU', dominantCoalition: 'Kenya Kwanza / KANU Base', topIssues: ['Geothermal Exploration in Lake Baringo', 'Livestock Feed Program'], keyPoliticians: ['Gideon Moi', 'Benjamin Cheboi', 'William Cheptumo'], overnightChangePct: 9.3, signalAlert: 'NONE', recentEventsCount: 4, socioEconomic: { povertyRatePct: 52.2, mainEconomicPillar: 'Pastoralism, Honey, Geothermal & Coffee', stapleFoodPriceIndex: 107, youthUnemploymentRatePct: 41.3, shaRegistrationPct: 60.1, asalDroughtPhase: 'Alert', ownSourceRevenueTargetPct: 56.4, primaryCropOrCommodity: 'Honey, Goat Meat & Pastoral Cattle' } },
  { code: '031', name: 'Laikipia', region: 'Rift Valley', headquarters: 'Rumuruti', governor: 'Joshua Irungu', governorParty: 'UDA', senator: 'John Kinyua', registeredVoters: 263012, politicalActivityIndex: 66, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza', topIssues: ['Private Wildlife Ranch Grazing Rights', 'County Seat Relocation to Rumuruti'], keyPoliticians: ['Joshua Irungu', 'Mwangi Kiunjuri'], overnightChangePct: 11.4, signalAlert: 'NONE', recentEventsCount: 3, socioEconomic: { povertyRatePct: 37.9, mainEconomicPillar: 'Beef Ranching, Eco-Tourism & Horticulture', stapleFoodPriceIndex: 102, youthUnemploymentRatePct: 32.0, shaRegistrationPct: 72.8, asalDroughtPhase: 'Alert', ownSourceRevenueTargetPct: 73.1, primaryCropOrCommodity: 'Commercial Beef & Cut Flowers' } },
  { code: '032', name: 'Nakuru', region: 'Rift Valley', headquarters: 'Nakuru City', governor: 'Susan Kihika', governorParty: 'UDA', senator: 'Tabitha Karanja (Keroche)', registeredVoters: 1054856, politicalActivityIndex: 87, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza', topIssues: ['Nakuru War Memorial Hospital Crisis', 'Geothermal Power Expansion in Olkaria', 'Kikuyu-Kalenjin Rift Valley Coalition Health'], keyPoliticians: ['Susan Kihika', 'Tabitha Karanja', 'Lee Kinyanjui'], overnightChangePct: 26.2, signalAlert: 'MEDIUM', recentEventsCount: 10, socioEconomic: { povertyRatePct: 26.9, mainEconomicPillar: 'Geothermal Energy, Agro-Processing & Floriculture', stapleFoodPriceIndex: 96, youthUnemploymentRatePct: 28.0, shaRegistrationPct: 81.4, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 87.5, primaryCropOrCommodity: 'Cut Roses (Naivasha), Maize & Dairy' } },
  { code: '033', name: 'Narok', region: 'Rift Valley', headquarters: 'Narok', governor: 'Patrick Ntutu', governorParty: 'UDA', senator: 'Ledama Olekina', registeredVoters: 397619, politicalActivityIndex: 82, dominantParty: 'UDA / ODM', dominantCoalition: 'Contested', topIssues: ['Maasai Mara Management Plan', 'Mau Forest Conservation Buffer', 'Wheat Pricing'], keyPoliticians: ['Ledama Olekina', 'Patrick Ole Ntutu'], overnightChangePct: 20.1, signalAlert: 'MEDIUM', recentEventsCount: 6, socioEconomic: { povertyRatePct: 33.7, mainEconomicPillar: 'Commercial Wheat, Mara Tourism & Livestock', stapleFoodPriceIndex: 98, youthUnemploymentRatePct: 34.5, shaRegistrationPct: 67.2, asalDroughtPhase: 'Alert', ownSourceRevenueTargetPct: 82.0, primaryCropOrCommodity: 'Commercial Wheat, Barley & Beef' } },
  { code: '034', name: 'Kajiado', region: 'Rift Valley', headquarters: 'Kajiado', governor: 'Joseph Ole Lenku', governorParty: 'ODM', senator: 'Samuel Kanar Seki', registeredVoters: 463273, politicalActivityIndex: 78, dominantParty: 'ODM / UDA', dominantCoalition: 'Broad-Based Gov Alignment', topIssues: ['Amboseli National Park Remittance to County', 'Nairobi Metropolis Land Zoning'], keyPoliticians: ['Joseph Ole Lenku', 'Katoo Ole Metito'], overnightChangePct: 16.3, signalAlert: 'NONE', recentEventsCount: 5, socioEconomic: { povertyRatePct: 28.0, mainEconomicPillar: 'Real Estate, Livestock, Tourism & Mining (Soda Ash)', stapleFoodPriceIndex: 100, youthUnemploymentRatePct: 30.5, shaRegistrationPct: 75.3, asalDroughtPhase: 'Normal', ownSourceRevenueTargetPct: 80.2, primaryCropOrCommodity: 'Soda Ash (L. Magadi), Beef & Building Stone' } },
  { code: '035', name: 'Kericho', region: 'Rift Valley', headquarters: 'Kericho', governor: 'Erick Mutai', governorParty: 'UDA', senator: 'Aaron Cheruiyot', registeredVoters: 428067, politicalActivityIndex: 84, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza Base', topIssues: ['Gubernatorial Impeachment Invalidation', 'Senate Majority Leader Agenda', 'Multinational Tea Land Rates'], keyPoliticians: ['Aaron Cheruiyot', 'Erick Mutai'], overnightChangePct: 31.5, signalAlert: 'MEDIUM', recentEventsCount: 8, socioEconomic: { povertyRatePct: 21.4, mainEconomicPillar: 'Global Black Tea Production & Sugarcane', stapleFoodPriceIndex: 93, youthUnemploymentRatePct: 24.6, shaRegistrationPct: 80.5, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 81.0, primaryCropOrCommodity: 'Premium Black Tea & Sugarcane' } },
  { code: '036', name: 'Bomet', region: 'Rift Valley', headquarters: 'Bomet', governor: 'Hillary Barchok', governorParty: 'UDA', senator: 'Wakoli Hillary Sigei', registeredVoters: 376985, politicalActivityIndex: 74, dominantParty: 'UDA', dominantCoalition: 'Kenya Kwanza', topIssues: ['Dairy Processing Plants', 'South Rift Infrastructure'], keyPoliticians: ['Hillary Barchok', 'Isaac Ruto (Chama Cha Mashinani)'], overnightChangePct: 14.1, signalAlert: 'NONE', recentEventsCount: 4, socioEconomic: { povertyRatePct: 31.8, mainEconomicPillar: 'Tea Smallholders, Commercial Dairy & Maize', stapleFoodPriceIndex: 91, youthUnemploymentRatePct: 27.0, shaRegistrationPct: 77.0, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 73.5, primaryCropOrCommodity: 'Tea & Processed Dairy' } },
  { code: '037', name: 'Kakamega', region: 'Western', headquarters: 'Kakamega', governor: 'Fernandes Barasa', governorParty: 'ODM', senator: 'Boni Khalwale', registeredVoters: 844551, politicalActivityIndex: 90, dominantParty: 'ODM', dominantCoalition: 'Azimio / Broad-Based', topIssues: ['Mumias Sugar Factory Leases', 'Western Kenya Political Re-alignment (Tawe vs ODM)', 'Gold Mining Regulations in Rosterman'], keyPoliticians: ['Fernandes Barasa', 'Boni Khalwale', 'Wycliffe Oparanya', 'Cleophas Malala'], overnightChangePct: 58.2, signalAlert: 'HIGH', recentEventsCount: 14, socioEconomic: { povertyRatePct: 35.8, mainEconomicPillar: 'Sugarcane Agro-Industry & Smallholder Food Crops', stapleFoodPriceIndex: 97, youthUnemploymentRatePct: 36.2, shaRegistrationPct: 71.8, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 76.0, primaryCropOrCommodity: 'Sugarcane (Mumias/Butali) & Maize' } },
  { code: '038', name: 'Vihiga', region: 'Western', headquarters: 'Mbale', governor: 'Wilber Ottichilo', governorParty: 'ODM', senator: 'Godfrey Osotsi', registeredVoters: 310043, politicalActivityIndex: 73, dominantParty: 'ODM / ANC', dominantCoalition: 'Broad-Based Alliance', topIssues: ['Mudavadi Prime Cabinet Secretary Powerbase', 'Granite Processing Factory'], keyPoliticians: ['Musalia Mudavadi', 'Godfrey Osotsi', 'Wilber Ottichilo'], overnightChangePct: 17.8, signalAlert: 'NONE', recentEventsCount: 5, socioEconomic: { povertyRatePct: 39.4, mainEconomicPillar: 'Granite Mining, Tea Smallholdings & Poultry', stapleFoodPriceIndex: 98, youthUnemploymentRatePct: 37.5, shaRegistrationPct: 73.0, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 69.4, primaryCropOrCommodity: 'Tea, Bananas & Granite Processing' } },
  { code: '039', name: 'Bungoma', region: 'Western', headquarters: 'Bungoma', governor: 'Kenneth Lusaka', governorParty: 'Ford-Kenya', senator: 'David Wakoli', registeredVoters: 646598, politicalActivityIndex: 85, dominantParty: 'Ford-Kenya', dominantCoalition: 'Kenya Kwanza (Wetangula Hub)', topIssues: ['Speaker Wetangula Parliament Balancing Act', 'Nzoia Sugar Privatization Push', 'Tawe Movement Contestation'], keyPoliticians: ['Moses Wetangula', 'Kenneth Lusaka', 'Didmus Barasa'], overnightChangePct: 34.0, signalAlert: 'MEDIUM', recentEventsCount: 9, socioEconomic: { povertyRatePct: 35.2, mainEconomicPillar: 'Sugarcane (Nzoia), Maize & Cross-Border Logistics', stapleFoodPriceIndex: 94, youthUnemploymentRatePct: 34.0, shaRegistrationPct: 72.4, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 75.1, primaryCropOrCommodity: 'Sugarcane, Onions & Maize' } },
  { code: '040', name: 'Busia', region: 'Western', headquarters: 'Busia', governor: 'Paul Otuoma', governorParty: 'ODM', senator: 'Okiya Omtatah Okoiti', registeredVoters: 416756, politicalActivityIndex: 89, dominantParty: 'ODM / Civil Society', dominantCoalition: 'Azimio / Public Interest Litigant', topIssues: ['Senator Omtatah Constitutional Petitions on Finance Acts', 'One-Stop Border Post Congestion', 'Sugar Cane Smuggling'], keyPoliticians: ['Okiya Omtatah', 'Paul Otuoma', 'Amos Wako'], overnightChangePct: 43.1, signalAlert: 'HIGH', recentEventsCount: 11, socioEconomic: { povertyRatePct: 69.3, mainEconomicPillar: 'Cross-Border Clearing, Fisheries & Cassava', stapleFoodPriceIndex: 99, youthUnemploymentRatePct: 44.8, shaRegistrationPct: 64.5, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 63.8, primaryCropOrCommodity: 'Fish (L. Victoria), Cassava & Border Trade' } },
  { code: '041', name: 'Siaya', region: 'Nyanza', headquarters: 'Siaya', governor: 'James Orengo', governorParty: 'ODM', senator: 'Oburu Oginga', registeredVoters: 533595, politicalActivityIndex: 86, dominantParty: 'ODM', dominantCoalition: 'Azimio Core', topIssues: ['Raila Odinga AUC Campaign', 'Broad-Based Government Criticism by Orengo', 'Yala Swamp Agricultural Allocation'], keyPoliticians: ['James Orengo', 'Oburu Oginga', 'Opiyo Wandayi'], overnightChangePct: 37.9, signalAlert: 'HIGH', recentEventsCount: 10, socioEconomic: { povertyRatePct: 33.8, mainEconomicPillar: 'Yala Swamp Irrigation, Cage Fishing & Sorghum', stapleFoodPriceIndex: 100, youthUnemploymentRatePct: 35.1, shaRegistrationPct: 76.0, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 71.9, primaryCropOrCommodity: 'Cage Tilapia, Sorghum & Cotton' } },
  { code: '042', name: 'Kisumu', region: 'Nyanza', headquarters: 'Kisumu City', governor: 'Anyang\' Nyong\'o', governorParty: 'ODM', senator: 'Tom Ojienda', registeredVoters: 606754, politicalActivityIndex: 93, dominantParty: 'ODM', dominantCoalition: 'Azimio Headquarters', topIssues: ['Raila Succession in ODM', 'Broad-Based Cabinet Integration', 'Kisumu Port Lake Victoria Shipping Revival'], keyPoliticians: ['Raila Odinga', 'Anyang\' Nyong\'o', 'Tom Ojienda', 'Babu Owino'], overnightChangePct: 39.4, signalAlert: 'HIGH', recentEventsCount: 15, socioEconomic: { povertyRatePct: 33.9, mainEconomicPillar: 'Maritime Lake Port, Sugarcane, Rice (Ahero) & Trade', stapleFoodPriceIndex: 102, youthUnemploymentRatePct: 36.8, shaRegistrationPct: 83.9, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 87.2, primaryCropOrCommodity: 'Lake Victoria Fish, Ahero Irrigated Rice & Sugar' } },
  { code: '043', name: 'Homa Bay', region: 'Nyanza', headquarters: 'Homa Bay', governor: 'Gladys Wanga', governorParty: 'ODM', senator: 'Moses Kajwang', registeredVoters: 551071, politicalActivityIndex: 83, dominantParty: 'ODM', dominantCoalition: 'Azimio / ODM Chairperson Hub', topIssues: ['Gladys Wanga ODM National Chair Strategy', 'Lake Victoria Cage Fish Farming', 'Ruto Development Tours'], keyPoliticians: ['Gladys Wanga', 'Moses Kajwang', 'John Mbadi'], overnightChangePct: 28.5, signalAlert: 'MEDIUM', recentEventsCount: 8, socioEconomic: { povertyRatePct: 44.1, mainEconomicPillar: 'Cage Aquaculture, Cotton & Edible Oils', stapleFoodPriceIndex: 101, youthUnemploymentRatePct: 38.0, shaRegistrationPct: 78.4, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 79.5, primaryCropOrCommodity: 'Nile Perch, Sunflower & Cotton' } },
  { code: '044', name: 'Migori', region: 'Nyanza', headquarters: 'Migori', governor: 'Ochillo Ayacko', governorParty: 'ODM', senator: 'Eddy Oketch', registeredVoters: 469019, politicalActivityIndex: 74, dominantParty: 'ODM', dominantCoalition: 'Azimio', topIssues: ['Isebania Cross-Border Tariffs', 'Macalder Artisanal Gold Mining Safety'], keyPoliticians: ['Ochillo Ayacko', 'Eddy Oketch'], overnightChangePct: 15.2, signalAlert: 'NONE', recentEventsCount: 5, socioEconomic: { povertyRatePct: 41.2, mainEconomicPillar: 'Tobacco, Sugarcane (Sony), Gold Mining & Trade', stapleFoodPriceIndex: 103, youthUnemploymentRatePct: 39.5, shaRegistrationPct: 70.1, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 72.0, primaryCropOrCommodity: 'Sugarcane, Gold Ore & Sweet Potatoes' } },
  { code: '045', name: 'Kisii', region: 'Nyanza', headquarters: 'Kisii', governor: 'Simba Arati', governorParty: 'ODM', senator: 'Richard Onyonka', registeredVoters: 637010, politicalActivityIndex: 88, dominantParty: 'ODM', dominantCoalition: 'Gusii Political Epicenter', topIssues: ['Simba Arati vs South Mugirango MPs Power Struggle', 'Soapstone Mineral Processing Hub', 'Gusii Council of Elders Peace Pact'], keyPoliticians: ['Simba Arati', 'Richard Onyonka', 'Ezekiel Machogu', 'Silvanus Osoro'], overnightChangePct: 44.8, signalAlert: 'HIGH', recentEventsCount: 12, socioEconomic: { povertyRatePct: 41.7, mainEconomicPillar: 'Bananas (Matoke), Tea, Soapstone & Commerce', stapleFoodPriceIndex: 96, youthUnemploymentRatePct: 33.5, shaRegistrationPct: 79.0, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 81.3, primaryCropOrCommodity: 'Bananas, Smallholder Tea & Soapstone' } },
  { code: '046', name: 'Nyamira', region: 'Nyanza', headquarters: 'Nyamira', governor: 'Amos Nyaribo', governorParty: 'UPA', senator: 'Okong\'o Omogeni', registeredVoters: 323283, politicalActivityIndex: 69, dominantParty: 'UPA / ODM', dominantCoalition: 'Azimio', topIssues: ['Nyaribo Impeachment Motions', 'Tea Directorate Factory Bonuses'], keyPoliticians: ['Amos Nyaribo', 'Okong\'o Omogeni'], overnightChangePct: 18.7, signalAlert: 'NONE', recentEventsCount: 4, socioEconomic: { povertyRatePct: 32.7, mainEconomicPillar: 'KTDA Smallholder Tea, Avocados & Dairy', stapleFoodPriceIndex: 95, youthUnemploymentRatePct: 31.2, shaRegistrationPct: 77.5, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 74.0, primaryCropOrCommodity: 'Tea & Hass Avocados' } },
  { code: '047', name: 'Nairobi City', region: 'Nairobi', headquarters: 'City Hall, Nairobi', governor: 'Johnson Sakaja', governorParty: 'UDA', senator: 'Edwin Sifuna', registeredVoters: 2415310, politicalActivityIndex: 99, dominantParty: 'UDA / ODM Split (49/51)', dominantCoalition: 'National Political Crucible', topIssues: ['County Budget Debts & Vendor Arrears', 'Gen-Z Protest Hotspots & Civil Liberties', 'Nairobi River Regeneration Evictions', 'Public Transport BRT System Deployment'], keyPoliticians: ['Johnson Sakaja', 'Edwin Sifuna', 'Babu Owino', 'Esther Passaris', 'Raila Odinga', 'William Ruto'], overnightChangePct: 45.2, signalAlert: 'HIGH', recentEventsCount: 28, socioEconomic: { povertyRatePct: 16.7, mainEconomicPillar: 'Financial Services, Tech Hub, Manufacturing & Transport', stapleFoodPriceIndex: 105, youthUnemploymentRatePct: 32.4, shaRegistrationPct: 88.2, asalDroughtPhase: 'Non-ASAL', ownSourceRevenueTargetPct: 94.8, primaryCropOrCommodity: 'National Commercial Services & High-Tech' } }
];

export const KENYA_POLITICIANS: Politician[] = [
  {
    id: 'pol-ruto',
    name: 'William Samoei Ruto',
    aliases: ['WSR', 'The Hustler', 'President Ruto', 'Commander-in-Chief'],
    currentPosition: 'President of the Republic of Kenya',
    party: 'United Democratic Alliance (UDA)',
    coalition: 'Kenya Kwanza / Broad-Based Coalition',
    homeCounty: 'Uasin Gishu',
    mentions24h: 342,
    mentions7d: 1840,
    mentions30d: 7210,
    mentionGrowth24h: 28.5,
    sentimentScore: -0.12,
    sentimentBreakdown: { positive: 28, neutral: 42, negative: 30 },
    momentumScore: 84.5,
    momentumBreakdown: {
      mentionGrowth: 26.5,
      geographicSpread: 19.2,
      publicEngagement: 13.8,
      eventActivity: 14.5,
      topicDiversity: 9.8,
      sentimentTrend: 0.7
    },
    topTopics: ['Presidency', 'Broad-Based Cabinet', 'Economy & Public Debt', 'Taxation & SHIF', 'Foreign Affairs'],
    topCounties: ['Nairobi', 'Uasin Gishu', 'Kiambu', 'Nyeri', 'Kisumu'],
    activeEventsCount: 18,
    riskLevel: 'MEDIUM'
  },
  {
    id: 'pol-gachagua',
    name: 'Rigathi Gachagua',
    aliases: ['Riggy G', 'Former DP', 'Wamunyoro', 'Mt Kenya Defender'],
    currentPosition: 'Former Deputy President / Political Alliance Convener',
    party: 'Independent / Regional Caucus',
    coalition: 'Democracy for Citizens & Mt Kenya Unity',
    homeCounty: 'Nyeri',
    mentions24h: 288,
    mentions7d: 1420,
    mentions30d: 6150,
    mentionGrowth24h: 64.2,
    sentimentScore: 0.18,
    sentimentBreakdown: { positive: 44, neutral: 32, negative: 24 },
    momentumScore: 91.2,
    momentumBreakdown: {
      mentionGrowth: 29.8,
      geographicSpread: 17.5,
      publicEngagement: 15.0,
      eventActivity: 14.8,
      topicDiversity: 8.5,
      sentimentTrend: 5.6
    },
    topTopics: ['Mt Kenya Politics', 'Executive Impeachment Fallout', '2027 Coalition Re-alignments', 'Agricultural Subsidies'],
    topCounties: ['Nyeri', 'Kiambu', 'Murang\'a', 'Kirinyaga', 'Nairobi'],
    activeEventsCount: 14,
    riskLevel: 'HIGH'
  },
  {
    id: 'pol-kindiki',
    name: 'Kithure Kindiki',
    aliases: ['Prof Kindiki', 'Deputy President', 'DP Kindiki'],
    currentPosition: 'Deputy President of the Republic of Kenya',
    party: 'United Democratic Alliance (UDA)',
    coalition: 'Kenya Kwanza',
    homeCounty: 'Tharaka-Nithi',
    mentions24h: 194,
    mentions7d: 960,
    mentions30d: 3820,
    mentionGrowth24h: 19.3,
    sentimentScore: 0.22,
    sentimentBreakdown: { positive: 45, neutral: 39, negative: 16 },
    momentumScore: 78.4,
    momentumBreakdown: {
      mentionGrowth: 22.1,
      geographicSpread: 18.0,
      publicEngagement: 12.4,
      eventActivity: 13.5,
      topicDiversity: 8.2,
      sentimentTrend: 4.2
    },
    topTopics: ['Presidency & Executive', 'National Security', 'Mt Kenya East Consolidation', 'Devolution Interventions'],
    topCounties: ['Tharaka-Nithi', 'Meru', 'Embu', 'Nairobi', 'Nakuru'],
    activeEventsCount: 9,
    riskLevel: 'LOW'
  },
  {
    id: 'pol-raila',
    name: 'Raila Amolo Odinga',
    aliases: ['Baba', 'Tinga', 'Agwambo', 'AUC Candidate'],
    currentPosition: 'Former Prime Minister / AUC Chairperson Candidate',
    party: 'Orange Democratic Movement (ODM)',
    coalition: 'Azimio la Umoja / Broad-Based Governance Partner',
    homeCounty: 'Siaya',
    mentions24h: 215,
    mentions7d: 1290,
    mentions30d: 5900,
    mentionGrowth24h: 16.4,
    sentimentScore: 0.15,
    sentimentBreakdown: { positive: 41, neutral: 38, negative: 21 },
    momentumScore: 82.0,
    momentumBreakdown: {
      mentionGrowth: 23.4,
      geographicSpread: 19.5,
      publicEngagement: 14.1,
      eventActivity: 13.0,
      topicDiversity: 9.0,
      sentimentTrend: 3.0
    },
    topTopics: ['African Union Commission (AUC) Campaign', 'ODM Succession Strategy', 'Broad-Based Cabinet Integration', 'Constitutional Reform'],
    topCounties: ['Kisumu', 'Nairobi', 'Siaya', 'Homa Bay', 'Mombasa'],
    activeEventsCount: 11,
    riskLevel: 'LOW'
  },
  {
    id: 'pol-kalonzo',
    name: 'Stephen Kalonzo Musyoka',
    aliases: ['SKM', 'Senior Counsel', 'Opposition Principal'],
    currentPosition: 'Party Leader, Wiper Democratic Movement / Opposition Leader',
    party: 'Wiper Democratic Movement (WDM)',
    coalition: 'Azimio la Umoja (Originalist Opposition)',
    homeCounty: 'Kitui',
    mentions24h: 162,
    mentions7d: 840,
    mentions30d: 3100,
    mentionGrowth24h: 38.2,
    sentimentScore: 0.31,
    sentimentBreakdown: { positive: 52, neutral: 33, negative: 15 },
    momentumScore: 85.3,
    momentumBreakdown: {
      mentionGrowth: 27.2,
      geographicSpread: 16.8,
      publicEngagement: 14.2,
      eventActivity: 14.1,
      topicDiversity: 7.9,
      sentimentTrend: 5.1
    },
    topTopics: ['Shadow Opposition Leadership', '2027 Statehouse Coalition Building', 'SHIF Legal Contestation', 'Cost of Living Protests'],
    topCounties: ['Kitui', 'Machakos', 'Makueni', 'Nairobi', 'Kiambu'],
    activeEventsCount: 10,
    riskLevel: 'MEDIUM'
  },
  {
    id: 'pol-natembeya',
    name: 'George Natembeya',
    aliases: ['Rift Valley Ex-RC', 'Tawe Leader', 'Gov Natembeya'],
    currentPosition: 'Governor, Trans Nzoia County / Leader of Tawe Movement',
    party: 'Democratic Action Party - Kenya (DAP-K)',
    coalition: 'Tawe Political Movement',
    homeCounty: 'Trans Nzoia',
    mentions24h: 148,
    mentions7d: 580,
    mentions30d: 2200,
    mentionGrowth24h: 58.4,
    sentimentScore: 0.38,
    sentimentBreakdown: { positive: 58, neutral: 28, negative: 14 },
    momentumScore: 89.6,
    momentumBreakdown: {
      mentionGrowth: 29.5,
      geographicSpread: 18.2,
      publicEngagement: 14.8,
      eventActivity: 14.0,
      topicDiversity: 7.6,
      sentimentTrend: 5.5
    },
    topTopics: ['Tawe Movement vs Luhya Barons', 'Agricultural Reforms in Western', 'Devolution Empowerment', 'Youth Inclusivity'],
    topCounties: ['Trans Nzoia', 'Kakamega', 'Bungoma', 'Busia', 'Nairobi'],
    activeEventsCount: 8,
    riskLevel: 'HIGH'
  },
  {
    id: 'pol-sifuna',
    name: 'Edwin Sifuna',
    aliases: ['Nairobi Senator', 'ODM Secretary General', 'Wakili Sifuna'],
    currentPosition: 'Senator, Nairobi County & Secretary General ODM',
    party: 'Orange Democratic Movement (ODM)',
    coalition: 'Azimio la Umoja',
    homeCounty: 'Nairobi',
    mentions24h: 135,
    mentions7d: 710,
    mentions30d: 2850,
    mentionGrowth24h: 31.0,
    sentimentScore: 0.26,
    sentimentBreakdown: { positive: 48, neutral: 34, negative: 18 },
    momentumScore: 81.5,
    momentumBreakdown: {
      mentionGrowth: 24.8,
      geographicSpread: 17.0,
      publicEngagement: 14.4,
      eventActivity: 12.8,
      topicDiversity: 8.5,
      sentimentTrend: 4.0
    },
    topTopics: ['Senate Oversight & County Audits', 'Nairobi City Hall Governance', 'Opposition Integrity', 'Broad-Based Guardrails'],
    topCounties: ['Nairobi', 'Bungoma', 'Kisumu', 'Kakamega'],
    activeEventsCount: 7,
    riskLevel: 'MEDIUM'
  },
  {
    id: 'pol-sakaja',
    name: 'Johnson Arthur Sakaja',
    aliases: ['Super Senator', 'Sakaja', 'Governor 047'],
    currentPosition: 'Governor, Nairobi City County',
    party: 'United Democratic Alliance (UDA)',
    coalition: 'Kenya Kwanza',
    homeCounty: 'Nairobi',
    mentions24h: 154,
    mentions7d: 890,
    mentions30d: 3600,
    mentionGrowth24h: 22.5,
    sentimentScore: -0.08,
    sentimentBreakdown: { positive: 30, neutral: 36, negative: 34 },
    momentumScore: 75.8,
    momentumBreakdown: {
      mentionGrowth: 23.0,
      geographicSpread: 15.2,
      publicEngagement: 13.1,
      eventActivity: 12.5,
      topicDiversity: 8.0,
      sentimentTrend: 4.0
    },
    topTopics: ['Nairobi Urban Planning & Dishi na County', 'County Assembly Inquiries', 'River Regeneration Relocations', 'Green City Transport'],
    topCounties: ['Nairobi', 'Kiambu', 'Machakos'],
    activeEventsCount: 9,
    riskLevel: 'MEDIUM'
  },
  {
    id: 'pol-babu',
    name: 'Paul Ongili (Babu Owino)',
    aliases: ['Babu Owino', 'Embakasi East MP', 'Tibim'],
    currentPosition: 'Member of Parliament, Embakasi East',
    party: 'Orange Democratic Movement (ODM)',
    coalition: 'Azimio la Umoja / Independent Youth Caucus',
    homeCounty: 'Nairobi',
    mentions24h: 122,
    mentions7d: 650,
    mentions30d: 2600,
    mentionGrowth24h: 27.8,
    sentimentScore: 0.20,
    sentimentBreakdown: { positive: 46, neutral: 32, negative: 22 },
    momentumScore: 80.2,
    momentumBreakdown: {
      mentionGrowth: 25.0,
      geographicSpread: 16.5,
      publicEngagement: 14.5,
      eventActivity: 12.0,
      topicDiversity: 8.2,
      sentimentTrend: 4.0
    },
    topTopics: ['University Funding Model Resistance', 'Youth Employment & Advocacy', 'Nairobi Gubernatorial Ambition', 'Education Subsidies'],
    topCounties: ['Nairobi', 'Kisumu', 'Siaya', 'Nakuru'],
    activeEventsCount: 6,
    riskLevel: 'MEDIUM'
  },
  {
    id: 'pol-omtatat',
    name: 'Okiya Omtatah Okoiti',
    aliases: ['Omtatah', 'People\'s Senator', 'Public Defender'],
    currentPosition: 'Senator, Busia County / Public Interest Litigant',
    party: 'National Reconstruction Alliance (NRA)',
    coalition: 'Independent Civil Society Caucus',
    homeCounty: 'Busia',
    mentions24h: 110,
    mentions7d: 590,
    mentions30d: 2400,
    mentionGrowth24h: 43.1,
    sentimentScore: 0.62,
    sentimentBreakdown: { positive: 72, neutral: 20, negative: 8 },
    momentumScore: 87.8,
    momentumBreakdown: {
      mentionGrowth: 28.5,
      geographicSpread: 18.5,
      publicEngagement: 14.6,
      eventActivity: 12.2,
      topicDiversity: 8.0,
      sentimentTrend: 6.0
    },
    topTopics: ['Finance Bill Constitutional Petitions', 'Executive Accountability & Court Injunctions', 'Auditor General Report Inquiries', 'Devolution Funding'],
    topCounties: ['Busia', 'Nairobi', 'Mombasa', 'Kisumu'],
    activeEventsCount: 6,
    riskLevel: 'LOW'
  }
];

export const KENYA_PARTIES: PoliticalParty[] = [
  {
    id: 'pty-uda',
    name: 'United Democratic Alliance',
    abbreviation: 'UDA',
    coalition: 'Kenya Kwanza Alliance',
    leader: 'William Samoei Ruto',
    color: '#FACC15', // Yellow
    mentions24h: 412,
    mentionGrowth: 21.4,
    sentimentScore: 0.05,
    dominantCounties: ['Uasin Gishu', 'Kiambu', 'Nyeri', 'Nakuru', 'Kericho', 'Meru', 'Tharaka-Nithi'],
    coreIssues: ['Economic Bottom-Up Transformation', 'Broad-Based Governance', 'Affordable Housing Scheme', 'Fertilizer Subsidies']
  },
  {
    id: 'pty-odm',
    name: 'Orange Democratic Movement',
    abbreviation: 'ODM',
    coalition: 'Azimio la Umoja / Broad-Based Cooperation',
    leader: 'Raila Amolo Odinga',
    color: '#F97316', // Orange
    mentions24h: 368,
    mentionGrowth: 24.8,
    sentimentScore: 0.12,
    dominantCounties: ['Kisumu', 'Siaya', 'Homa Bay', 'Migori', 'Mombasa', 'Kilifi', 'Kakamega', 'Nairobi'],
    coreIssues: ['Devolution Protection', 'Social Democracy', 'AUC Leadership Bid', 'Broad-Based Ministry Oversight']
  },
  {
    id: 'pty-wiper',
    name: 'Wiper Democratic Movement',
    abbreviation: 'WDM-K',
    coalition: 'Azimio la Umoja',
    leader: 'Stephen Kalonzo Musyoka',
    color: '#0284C7', // Sky Blue
    mentions24h: 184,
    mentionGrowth: 36.2,
    sentimentScore: 0.28,
    dominantCounties: ['Kitui', 'Machakos', 'Makueni', 'Taita-Taveta'],
    coreIssues: ['Constitutionalism', 'Anti-Taxation Lawsuits', '2027 Coalition Alternative', 'Public Health Funding']
  },
  {
    id: 'pty-dapk',
    name: 'Democratic Action Party - Kenya',
    abbreviation: 'DAP-K',
    coalition: 'Tawe Political Caucus',
    leader: 'Eugene Wamalwa / George Natembeya',
    color: '#10B981', // Emerald Green
    mentions24h: 142,
    mentionGrowth: 54.0,
    sentimentScore: 0.35,
    dominantCounties: ['Trans Nzoia', 'Kakamega', 'Bungoma', 'Busia'],
    coreIssues: ['Western Kenya Agrarian Liberation', 'Anti-Dynasty Politics in Western', 'Devolution Transparency']
  },
  {
    id: 'pty-jubilee',
    name: 'Jubilee Party',
    abbreviation: 'JP',
    coalition: 'Azimio la Umoja',
    leader: 'Uhuru Kenyatta (Disputed)',
    color: '#DC2626', // Red
    mentions24h: 96,
    mentionGrowth: 12.0,
    sentimentScore: -0.04,
    dominantCounties: ['Isiolo', 'Nyandarua', 'Nakuru'],
    coreIssues: ['Party Ownership Disputes', 'Mt Kenya Historical Legacy', 'National Infrastructure']
  }
];

export const KENYA_TOPICS: PoliticalTopic[] = [
  { id: 'top-cost-of-living', name: 'Cost of Living & Taxation', category: 'Economy', mentions24h: 420, mentions7d: 2450, velocityChangePct: 42.1, sentimentScore: -0.48, isHighSignal: true, relatedPoliticians: ['William Ruto', 'Kalonzo Musyoka', 'Okiya Omtatah', 'John Mbadi'], relatedCounties: ['Nairobi', 'Kiambu', 'Mombasa', 'Nakuru'] },
  { id: 'top-shif-healthcare', name: 'SHA / SHIF Health Insurance Rollout', category: 'Social Policy', mentions24h: 388, mentions7d: 1980, velocityChangePct: 49.3, sentimentScore: -0.54, isHighSignal: true, relatedPoliticians: ['William Ruto', 'Deborah Barasa', 'Edwin Sifuna', 'Mutahi Kahiga'], relatedCounties: ['Nairobi', 'Kisumu', 'Nyeri', 'Uasin Gishu'] },
  { id: 'top-mt-kenya-shifts', name: 'Mt. Kenya Post-Impeachment Realignment', category: 'Regional', mentions24h: 360, mentions7d: 1820, velocityChangePct: 46.5, sentimentScore: 0.08, isHighSignal: true, relatedPoliticians: ['Rigathi Gachagua', 'Kithure Kindiki', 'Ndindi Nyoro', 'Kimani Ichung\'wah'], relatedCounties: ['Nyeri', 'Murang\'a', 'Kiambu', 'Kirinyaga', 'Meru'] },
  { id: 'top-tawe-western', name: 'Tawe Movement vs Traditional Kingship', category: 'Regional', mentions24h: 210, mentions7d: 1100, velocityChangePct: 58.2, sentimentScore: 0.32, isHighSignal: true, relatedPoliticians: ['George Natembeya', 'Moses Wetangula', 'Musalia Mudavadi', 'Fernandes Barasa'], relatedCounties: ['Trans Nzoia', 'Kakamega', 'Bungoma', 'Busia'] },
  { id: 'top-broad-based-gov', name: 'Broad-Based Cabinet Stability & Friction', category: 'Governance', mentions24h: 295, mentions7d: 1650, velocityChangePct: 28.4, sentimentScore: 0.02, isHighSignal: false, relatedPoliticians: ['William Ruto', 'Raila Odinga', 'Opiyo Wandayi', 'John Mbadi', 'James Orengo'], relatedCounties: ['Nairobi', 'Kisumu', 'Siaya', 'Homa Bay'] },
  { id: 'top-auc-bid', name: 'Raila Odinga AU Commission Candidacy', category: 'Foreign Affairs', mentions24h: 185, mentions7d: 1320, velocityChangePct: 14.2, sentimentScore: 0.44, isHighSignal: false, relatedPoliticians: ['Raila Odinga', 'William Ruto', 'Musalia Mudavadi'], relatedCounties: ['Nairobi', 'Siaya', 'Kisumu'] },
  { id: 'top-university-funding', name: 'New University Funding Model', category: 'Social Policy', mentions24h: 178, mentions7d: 1040, velocityChangePct: 33.6, sentimentScore: -0.38, isHighSignal: true, relatedPoliticians: ['Julius Ogamba', 'Babu Owino', 'Edwin Sifuna'], relatedCounties: ['Nairobi', 'Uasin Gishu', 'Nakuru', 'Kisumu'] },
  { id: 'top-devolution-funds', name: 'County Revenue Allocation Delays', category: 'Governance', mentions24h: 164, mentions7d: 1150, velocityChangePct: 22.0, sentimentScore: -0.29, isHighSignal: false, relatedPoliticians: ['Anne Waiguru', 'Abdulswamad Nassir', 'Aaron Cheruiyot'], relatedCounties: ['Mombasa', 'Kilifi', 'Kakamega', 'Nairobi'] },
  { id: 'top-public-debt-imf', name: 'Public Debt & IMF Conditionalities', category: 'Economy', mentions24h: 152, mentions7d: 980, velocityChangePct: 26.8, sentimentScore: -0.42, isHighSignal: false, relatedPoliticians: ['John Mbadi', 'William Ruto', 'Okiya Omtatah'], relatedCounties: ['Nairobi', 'Mombasa'] },
  { id: 'top-gen-z-reforms', name: 'Gen-Z Civic Awakening & Governance Demands', category: 'Elections', mentions24h: 230, mentions7d: 1400, velocityChangePct: 37.5, sentimentScore: 0.12, isHighSignal: true, relatedPoliticians: ['William Ruto', 'Babu Owino', 'Edwin Sifuna', 'Kalonzo Musyoka'], relatedCounties: ['Nairobi', 'Mombasa', 'Nakuru', 'Eldoret City', 'Kisumu'] }
];

export const OVERNIGHT_SIGNALS: PoliticalSignal[] = [
  {
    id: 'sig-01',
    level: 'HIGH SIGNAL',
    targetType: 'Topic',
    targetName: 'Cost of Living & SHA Healthcare Deductions',
    changeMetric: 'Velocity vs 7d Baseline',
    changeValue: '+49.3%',
    timeframe: '24h vs 7d',
    context: 'Public outcry across 32 counties regarding systemic delays in chronic illness pre-authorizations under the Social Health Authority (SHA) platform, compounded by impending January school fee statutory obligations.',
    confidenceScore: 0.96,
    detectedAt: '2026-08-25T03:15:00Z',
    sentimentShift: 'Dropped from -0.32 to -0.54 (Severe Negative)'
  },
  {
    id: 'sig-02',
    level: 'HIGH SIGNAL',
    targetType: 'County',
    targetName: 'Trans Nzoia & Kakamega (Western Axis)',
    changeMetric: 'Political Activity Delta',
    changeValue: '+58.4%',
    timeframe: '24h vs 7d',
    context: 'Governor George Natembeya’s "Tawe Movement" grassroots rallies drew massive youth attendances across Kitale, Mumias, and Webuye, directly confronting the traditional hegemony of Speaker Moses Wetangula and Prime CS Musalia Mudavadi.',
    confidenceScore: 0.94,
    detectedAt: '2026-08-25T02:40:00Z',
    sentimentShift: 'Shifted from +0.14 to +0.38 (Surge in Populist Approval)'
  },
  {
    id: 'sig-03',
    level: 'HIGH SIGNAL',
    targetType: 'Politician',
    targetName: 'Rigathi Gachagua (Former DP)',
    changeMetric: 'Mentions & Sentiment Momentum',
    changeValue: '+64.2%',
    timeframe: '24h vs 30d',
    context: 'Unusual engagement spike following public appearances at church events in Nyeri and Murang’a where local elders and clergy endorsed his push for a unified Mt. Kenya regional coalition ahead of 2027.',
    confidenceScore: 0.92,
    detectedAt: '2026-08-25T02:10:00Z',
    sentimentShift: 'Positive sentiment ratio expanded to 44% from 28%'
  },
  {
    id: 'sig-04',
    level: 'MEDIUM SIGNAL',
    targetType: 'Party',
    targetName: 'Wiper Democratic Movement (Kalonzo Musyoka)',
    changeMetric: 'Opposition Dominance Share',
    changeValue: '+36.2%',
    timeframe: '24h vs 7d',
    context: 'Kalonzo Musyoka capitalizes on ODM’s entry into the Broad-Based Government, consolidating disaffected Azimio supporters in Ukambani, Lower Eastern, and urban Nairobi constituencies.',
    confidenceScore: 0.89,
    detectedAt: '2026-08-25T01:50:00Z',
    sentimentShift: 'Sentiment climbed to +0.31 (Favorable Opposition Position)'
  },
  {
    id: 'sig-05',
    level: 'EMERGING SIGNAL',
    targetType: 'Topic',
    targetName: 'Cherargei Term Limit Bill & Constitutional Amendments',
    changeMetric: 'Debate Volume Expansion',
    changeValue: '+27.6%',
    timeframe: 'Overnight Surge',
    context: 'Renewal of Senate debate on proposed tenure adjustments spark vigorous civil society pushback and bipartisan warnings over constitutional safeguards.',
    confidenceScore: 0.85,
    detectedAt: '2026-08-25T00:30:00Z',
    sentimentShift: 'Sharp negative polarization (-0.41)'
  }
];

export const EMERGING_NARRATIVES: EmergingNarrative[] = [
  {
    id: 'nar-01',
    headline: 'The Post-Broad-Based Realignment: Kalonzo & Natembeya Fill Opposition Vacuum',
    summary: 'Following the integration of senior ODM leaders into the broad-based cabinet, a structural opposition vacuum opened. Kalonzo Musyoka (Wiper) in Eastern and George Natembeya (Tawe/DAP-K) in Western are rapidly anchoring a non-aligned anti-establishment coalition.',
    firstDetected: '2026-08-18',
    velocityScore: 88,
    lifecycleStage: 'Accelerating',
    associatedPoliticians: ['Kalonzo Musyoka', 'George Natembeya', 'Edwin Sifuna', 'Raila Odinga'],
    associatedCounties: ['Machakos', 'Trans Nzoia', 'Kakamega', 'Nairobi', 'Kitui'],
    associatedParties: ['Wiper', 'DAP-K', 'ODM'],
    sentimentProfile: { positive: 45, neutral: 35, negative: 20 },
    sourcesCount: 38
  },
  {
    id: 'nar-02',
    headline: 'Mt. Kenya Political Fragmentation & Kingpin Sovereignty Battle',
    summary: 'The battle for Central Kenya supremacy has entered a high-velocity phase between Deputy President Kithure Kindiki (backed by the state apparatus) and ousted DP Rigathi Gachagua (commanding strong vernacular radio and grassroots church sentiment).',
    firstDetected: '2026-08-12',
    velocityScore: 92,
    lifecycleStage: 'Peak',
    associatedPoliticians: ['Rigathi Gachagua', 'Kithure Kindiki', 'Ndindi Nyoro', 'Kimani Wamatangi', 'Anne Waiguru'],
    associatedCounties: ['Nyeri', 'Murang\'a', 'Kiambu', 'Kirinyaga', 'Meru', 'Tharaka-Nithi'],
    associatedParties: ['UDA', 'Independent'],
    sentimentProfile: { positive: 32, neutral: 28, negative: 40 },
    sourcesCount: 52
  },
  {
    id: 'nar-03',
    headline: 'The SHA Healthcare Transition Bottleneck and Devolved Health Friction',
    summary: 'Systemic IT and fund clearance friction between the newly established Social Health Authority (SHA) and devolved Level 4/5 hospitals has created mounting political friction between Council of Governors (CoG) and Afya House leadership.',
    firstDetected: '2026-08-04',
    velocityScore: 79,
    lifecycleStage: 'Maturing',
    associatedPoliticians: ['William Ruto', 'Deborah Barasa', 'Anne Waiguru', 'Fernandes Barasa'],
    associatedCounties: ['Mombasa', 'Nairobi', 'Kisumu', 'Kakamega', 'Nyeri'],
    associatedParties: ['UDA', 'ODM'],
    sentimentProfile: { positive: 12, neutral: 24, negative: 64 },
    sourcesCount: 44
  },
  {
    id: 'nar-04',
    headline: 'Western Kenya "Tawe" Revolt Against Political Patronage',
    summary: 'The "Tawe" (Say No) phenomenon led by Governor Natembeya is challenging the long-standing hegemony of National Assembly Speaker Moses Wetangula and Prime Cabinet Secretary Musalia Mudavadi across Mulembe nation.',
    firstDetected: '2026-08-15',
    velocityScore: 84,
    lifecycleStage: 'Accelerating',
    associatedPoliticians: ['George Natembeya', 'Moses Wetangula', 'Musalia Mudavadi', 'Boni Khalwale'],
    associatedCounties: ['Trans Nzoia', 'Bungoma', 'Kakamega', 'Busia', 'Vihiga'],
    associatedParties: ['DAP-K', 'Ford-Kenya', 'ANC'],
    sentimentProfile: { positive: 56, neutral: 26, negative: 18 },
    sourcesCount: 29
  }
];

export const SAMPLE_ARTICLES: NewsArticle[] = [
  {
    id: 'art-001',
    title: 'SHA System Glitches Cause Patient Delays in 18 County Referral Hospitals as CoG Calls Urgent Meeting',
    description: 'The Council of Governors has requested an emergency liaison session with the Ministry of Health over reimbursement backlogs and technical server timeouts under the Social Health Authority framework.',
    fullText: 'Hospital administrators in Nairobi, Mombasa, Kisumu, and Nyeri reported ongoing difficulties with the digital pre-authorization module of SHA. Patients requiring specialized dialysis and chemotherapy experienced verification delays, prompting Governors to raise concerns over devolved healthcare delivery cashflows.',
    sourceId: 'src-nation',
    sourceName: 'Daily Nation',
    url: 'https://nation.africa/kenya/news/sha-glitches-county-referral-hospitals',
    publicationDate: '2026-08-25T06:30:00Z',
    collectionTimestamp: '2026-08-25T07:05:00Z',
    author: 'Justus Wanzala',
    language: 'en',
    contentHash: 'a7b8e1f44d93427845f091c78345ab23',
    reliabilityScore: 0.94,
    sentiment: 'negative',
    sentimentScore: -0.62,
    confidenceScore: 0.95,
    topics: ['SHA / SHIF Health Insurance Rollout', 'Devolution Funding', 'Cost of Living & Taxation'],
    politicians: ['William Ruto', 'Anne Waiguru'],
    parties: ['UDA'],
    counties: ['Nairobi', 'Mombasa', 'Kisumu', 'Nyeri'],
    institutions: ['Ministry of Health', 'Council of Governors', 'Social Health Authority']
  },
  {
    id: 'art-002',
    title: 'Natembeya Takes Tawe Movement to Kakamega, Vows to End Decades of Political Gatekeeping in Western',
    description: 'Trans Nzoia Governor George Natembeya addressed thousands of supporters at Bukhungu Stadium outskirts, urging young people to reject traditional political endorsements.',
    fullText: 'Governor George Natembeya criticized veteran regional kingpins for allegedly bargaining with the region\'s electoral numbers without delivering tangible industrial development. He called for agricultural revitalization and direct empowerment of local farmers and youth.',
    sourceId: 'src-standard',
    sourceName: 'The Standard Media',
    url: 'https://www.standardmedia.co.ke/politics/article/200149021/natembeya-takes-tawe-movement-kakamega',
    publicationDate: '2026-08-25T05:45:00Z',
    collectionTimestamp: '2026-08-25T06:15:00Z',
    author: 'Nathan Ochunge',
    language: 'en',
    contentHash: 'f412c98d601b34e892c5780a112df647',
    reliabilityScore: 0.91,
    sentiment: 'positive',
    sentimentScore: 0.48,
    confidenceScore: 0.92,
    topics: ['Tawe Movement vs Traditional Kingship', 'Western Kenya Politics', 'Youth Inclusivity'],
    politicians: ['George Natembeya', 'Moses Wetangula', 'Musalia Mudavadi', 'Fernandes Barasa'],
    parties: ['DAP-K', 'Ford-Kenya', 'ANC'],
    counties: ['Kakamega', 'Trans Nzoia', 'Bungoma'],
    institutions: ['County Government of Trans Nzoia', 'County Government of Kakamega']
  },
  {
    id: 'art-003',
    title: 'Gachagua Holds Closed-Door Consultative Meeting with Nyeri and Murang\'a Church Leaders',
    description: 'Former Deputy President Rigathi Gachagua continued his regional mobilization in Mathira, stating that Mt. Kenya will present an independent political vehicle for the 2027 general election.',
    fullText: 'Speaking during a fellowship in Karatina, Gachagua declared that the region had learned strategic lessons from recent political developments. He urged grassroots leaders to maintain community solidarity and resist external division.',
    sourceId: 'src-star',
    sourceName: 'The Star Kenya',
    url: 'https://www.the-star.co.ke/news/2026-08-25-gachagua-consults-church-leaders-nyeri',
    publicationDate: '2026-08-25T04:15:00Z',
    collectionTimestamp: '2026-08-25T05:00:00Z',
    author: 'Wangechi Wang\'ondu',
    language: 'en',
    contentHash: '38b901fc8762a45d09f78341bba63910',
    reliabilityScore: 0.88,
    sentiment: 'neutral',
    sentimentScore: 0.12,
    confidenceScore: 0.89,
    topics: ['Mt. Kenya Post-Impeachment Realignment', '2027 General Election Realignment'],
    politicians: ['Rigathi Gachagua', 'Mutahi Kahiga'],
    parties: ['Independent'],
    counties: ['Nyeri', 'Murang\'a', 'Kiambu'],
    institutions: ['National Council of Churches of Kenya']
  },
  {
    id: 'art-004',
    title: 'President Ruto Commissions Eldoret City Infrastructure Projects, Defends Broad-Based Governance Model',
    description: 'During a development inspection in Uasin Gishu County, President William Ruto highlighted national unity initiatives and outlined agricultural fertilizer subsidy gains for the ongoing harvest cycle.',
    fullText: 'President Ruto stated that uniting political rivals under a broad-based governance framework was necessary to ensure fiscal stability, pass critical economic legislation, and accelerate foreign direct investments into Kenya\'s digital and agricultural sectors.',
    sourceId: 'src-capital',
    sourceName: 'Capital FM Kenya',
    url: 'https://www.capitalfm.co.ke/news/2026/08/ruto-eldoret-city-projects-broad-based-gov',
    publicationDate: '2026-08-24T18:30:00Z',
    collectionTimestamp: '2026-08-24T19:00:00Z',
    author: 'Labat Titus',
    language: 'en',
    contentHash: 'd901bc24ef9801235fa78349bbcd0123',
    reliabilityScore: 0.90,
    sentiment: 'positive',
    sentimentScore: 0.35,
    confidenceScore: 0.94,
    topics: ['Presidency', 'Broad-Based Cabinet Stability', 'Agriculture Subsidies'],
    politicians: ['William Ruto', 'Jonathan Bii'],
    parties: ['UDA'],
    counties: ['Uasin Gishu', 'Nandi'],
    institutions: ['Executive Office of the President', 'Eldoret City Board']
  },
  {
    id: 'art-005',
    title: 'Kalonzo Musyoka and Wiper Party Unveil 2027 Economic Alternative Blueprint in Machakos',
    description: 'Wiper Party leader Kalonzo Musyoka met with party delegates in Machakos town, outlining a 5-pillar economic platform focusing on lower consumer taxes and transparent debt management.',
    fullText: 'Kalonzo Musyoka emphasized that Wiper represents the principled opposition in Parliament and throughout the 47 counties. He questioned recent tax levies and reaffirmed his commitment to contest the presidency in 2027.',
    sourceId: 'src-citizen',
    sourceName: 'Citizen Digital',
    url: 'https://www.citizen.digital/news/kalonzo-wiper-economic-blueprint-machakos',
    publicationDate: '2026-08-24T16:00:00Z',
    collectionTimestamp: '2026-08-24T17:15:00Z',
    author: 'Stephen Letoo',
    language: 'en',
    contentHash: '723fa0981b24e65d09acbb1248ef7821',
    reliabilityScore: 0.93,
    sentiment: 'positive',
    sentimentScore: 0.42,
    confidenceScore: 0.91,
    topics: ['Cost of Living & Taxation', 'Opposition Strategy', '2027 General Election Realignment'],
    politicians: ['Kalonzo Musyoka', 'Wavinya Ndeti', 'Enoch Wambua'],
    parties: ['Wiper'],
    counties: ['Machakos', 'Kitui', 'Makueni'],
    institutions: ['Wiper Democratic Movement NEC']
  },
  {
    id: 'art-006',
    title: 'High Court Issues Conservatory Orders on Digital Highway Toll Framework Following Senator Omtatah Petition',
    description: 'Justice Lawrence Mugambi issued interim conservatory orders stopping implementation of proposed toll station levies pending hearing of constitutional petitions filed by Busia Senator Okiya Omtatah.',
    fullText: 'The petitioner argued that public participation thresholds were not met and that additional tolling on existing taxpayer-financed highways amounted to double taxation. The state law office was given 14 days to respond.',
    sourceId: 'src-business-daily',
    sourceName: 'Business Daily Africa',
    url: 'https://www.businessdailyafrica.com/bd/economy/court-suspends-highway-toll-framework-omtatah',
    publicationDate: '2026-08-24T14:20:00Z',
    collectionTimestamp: '2026-08-24T15:00:00Z',
    author: 'Sam Kiplagat',
    language: 'en',
    contentHash: '0981baef2436812739acde901234bc56',
    reliabilityScore: 0.95,
    sentiment: 'positive',
    sentimentScore: 0.31,
    confidenceScore: 0.96,
    topics: ['Judiciary & Executive Relations', 'Cost of Living & Taxation', 'Infrastructure Policy'],
    politicians: ['Okiya Omtatah'],
    parties: ['Independent'],
    counties: ['Nairobi', 'Busia'],
    institutions: ['High Court of Kenya', 'Kenya National Highways Authority (KeNHA)']
  }
];

export const INITIAL_DAILY_REPORT: DailyReport = {
  id: 'rep-2026-08-25',
  reportDate: '2026-08-25',
  title: 'KENYA POLITICAL INTELLIGENCE BRIEF — AUGUST 25, 2026',
  executiveSummary: 'Over the last 24 hours, the Kenyan political landscape experienced significant shifts driven by three primary catalysts: mounting public and county government friction regarding the Social Health Authority (SHA) rollout across 18 regional referral hospitals, aggressive grassroots political realignments in Western Kenya headlined by Governor George Natembeya’s "Tawe Movement", and persistent consolidation of Mt. Kenya political sentiment following church-led consultative forums by former DP Rigathi Gachagua. Meanwhile, Wiper leader Kalonzo Musyoka is aggressively moving to occupy the unencumbered opposition space following ODM’s formal assimilation into the broad-based government structure.',
  topDevelopments: [
    {
      title: 'Devolved Healthcare Friction Reaches Critical Threshold Over SHA System Delays',
      description: 'Council of Governors (CoG) Chair Anne Waiguru and health committee heads convened emergency sessions as public referral hospitals reported authorization backlogs. Political risk rating elevated due to impending union strike notices.',
      impactLevel: 'CRITICAL',
      relatedEntities: ['Ministry of Health', 'Council of Governors', 'Social Health Authority', 'Anne Waiguru', 'William Ruto'],
      sources: ['Daily Nation', 'The Standard', 'Business Daily Africa']
    },
    {
      title: 'Western Kenya "Tawe Movement" Escalates into Direct Challenge to Wetangula and Mudavadi',
      description: 'Governor George Natembeya’s anti-patronage rallies drew historic youth turnouts across Kakamega, Bungoma, and Trans Nzoia, signaling a notable structural fracture in the Luhya political consensus.',
      impactLevel: 'HIGH',
      relatedEntities: ['George Natembeya', 'Moses Wetangula', 'Musalia Mudavadi', 'DAP-K', 'Ford-Kenya'],
      sources: ['The Standard', 'Citizen Digital', 'The Star']
    },
    {
      title: 'Judiciary Asserts Oversight on Highway Tolling Policy Via Omtatah Injunction',
      description: 'The High Court issued conservatory orders halting digital road tolling expansion pending full public participation verification, underscoring ongoing judicial friction with executive revenue models.',
      impactLevel: 'MODERATE',
      relatedEntities: ['Okiya Omtatah', 'High Court of Kenya', 'KeNHA', 'Ministry of Roads & Transport'],
      sources: ['Business Daily Africa', 'Capital FM', 'Kenya Law Gazette']
    }
  ],
  overnightShifts: OVERNIGHT_SIGNALS,
  topPoliticiansByActivity: [
    { name: 'William Samoei Ruto', position: 'President of Kenya', mentions: 342, momentumScore: 84.5, keyDriver: 'Eldoret City charter rollout and defense of broad-based administration.' },
    { name: 'Rigathi Gachagua', position: 'Former Deputy President', mentions: 288, momentumScore: 91.2, keyDriver: 'Mt. Kenya church-ground mobilization and 2027 independent coalition messaging.' },
    { name: 'Raila Amolo Odinga', position: 'AUC Candidate / ODM Leader', mentions: 215, momentumScore: 82.0, keyDriver: 'AUC continental campaign diplomacy and ODM internal succession management.' },
    { name: 'Kithure Kindiki', position: 'Deputy President of Kenya', mentions: 194, momentumScore: 78.4, keyDriver: 'State executive meetings and Mt. Kenya East development inspections.' },
    { name: 'Stephen Kalonzo Musyoka', position: 'Wiper Party Leader', mentions: 162, momentumScore: 85.3, keyDriver: 'Machakos alternative economic blueprint launch and shadow opposition leader posturing.' },
    { name: 'George Natembeya', position: 'Trans Nzoia Governor', mentions: 148, momentumScore: 89.6, keyDriver: 'Tawe movement Bukhungu stadium grassroots rally and Western region youth mobilization.' }
  ],
  topParties: [
    { party: 'United Democratic Alliance (UDA)', activitySummary: 'Defending executive economic legacy and navigating Central Kenya parliamentary caucus dynamics.', sentimentScore: 0.05 },
    { party: 'Orange Democratic Movement (ODM)', activitySummary: 'Balancing broad-based cabinet portfolio delivery against grassroots supporter expectations.', sentimentScore: 0.12 },
    { party: 'Wiper Democratic Movement (WDM-K)', activitySummary: 'Consolidating anti-taxation stance and building statehouse exploratory partnerships.', sentimentScore: 0.28 },
    { party: 'Democratic Action Party - Kenya (DAP-K)', activitySummary: 'Expanding grassroots membership via the insurgent Tawe political wave in Western.', sentimentScore: 0.35 }
  ],
  topIssues: [
    { topic: 'SHA / SHIF Health Insurance Rollout', mentions: 388, velocity: '+49.3%', summary: 'Systemic authorization delays across Level 4/5 county hospitals generating severe public anxiety.' },
    { topic: 'Cost of Living & Taxation', mentions: 420, velocity: '+42.1%', summary: 'High court litigation and impending January statutory deductions dominating household sentiment.' },
    { topic: 'Mt. Kenya Post-Impeachment Realignment', mentions: 360, velocity: '+46.5%', summary: 'Intense dual mobilization between Kindiki state machinery and Gachagua grassroots base.' }
  ],
  regionalSignals: [
    { countyOrRegion: 'Central Kenya (Nyeri, Murang\'a, Kiambu)', activitySummary: 'Heightened political sensitivity; high attendance at vernacular-led consultative forums.', tensionLevel: 'Volatile' },
    { countyOrRegion: 'Western Kenya (Trans Nzoia, Kakamega, Bungoma)', activitySummary: 'Tawe movement challenging status quo; generational clash between youth leaders and veteran MPs.', tensionLevel: 'Heated' },
    { countyOrRegion: 'Nairobi Metropolitan (Nairobi, Machakos, Kajiado)', activitySummary: 'Civil society litigation activities; public sector union coordination on SHA health delays.', tensionLevel: 'Guarded' },
    { countyOrRegion: 'Coast (Mombasa, Kilifi, Kwale)', activitySummary: 'Port logistics debate and blue economy revenue-sharing dialogues proceeding calmly.', tensionLevel: 'Calm' }
  ],
  emergingNarratives: EMERGING_NARRATIVES,
  policyDevelopments: [
    { billOrPolicy: 'Social Health Insurance Act (SHA Regulations)', status: 'Active Implementation / Operational Auditing', publicReaction: 'Widespread concern regarding IT uptime and capitation remittance.' },
    { billOrPolicy: 'National Roads Tolling Framework 2026', status: 'Interim Court Stay (Conservatory Orders)', publicReaction: 'Public approval of judicial oversight against premature tolling.' },
    { billOrPolicy: 'Presidential Term Limit Adjustment Proposal (Cherargei Bill)', status: 'Senate Committee Public Participation', publicReaction: 'Overwhelming negative response from civil society and opposition coalitions.' }
  ],
  politicalRisks: [
    { risk: 'Devolved Healthcare Service Interruption', likelihood: 'High', potentialImpact: 'Disruption of hospital services and acute public dissatisfaction with executive health reforms.', mitigationSignals: 'Emergency Cabinet-Council of Governors joint arbitration scheduled for Thursday.' },
    { risk: 'Regional Polarization in Mt. Kenya and Western Hubs', likelihood: 'Medium', potentialImpact: 'Legislative voting gridlock on contentious budget votes and heightened ethnic caucus formation.', mitigationSignals: 'Broad-based parliamentary whips coordinating bipartisan committees.' }
  ],
  socioEconomicOverview: {
    macroeconomicSummary: 'Kenya\'s macro environment demonstrates easing headline inflation at 4.3% YoY and stable foreign exchange at 129.25 KES/USD. However, micro-level household pressures persist around statutory payroll deductions (SHA 2.75%, Housing Levy 1.5%), fuel pump tariffs (KES 180.66/L), and university Band 4/5 tuition invoices.',
    costOfLivingTrend: 'MODERATING',
    keyPressurePoints: [
      'Social Health Insurance Fund (SHIF/SHA) pre-authorization friction in faith-based and mission hospitals',
      'University New Funding Model (NFM) household invoice disputes affecting 120,000 students',
      'Informal urban youth underemployment index hovering at 35.4% NEET in major cities',
      'KTDA smallholder tea bonus price variances between East and West of Rift Valley'
    ],
    ruralUrbanDivergence: 'Urban centers (Nairobi, Mombasa, Nakuru) experience acute sensitivity to public transport tariffs and direct taxation, whereas rural agricultural hubs (Mt Kenya, Rift Valley, Western) prioritize guaranteed minimum returns for tea, coffee, and fertilizer availability.'
  },
  keyEconomicIndicators: [
    { name: 'Headline Inflation (KNBS)', value: '4.3% YoY', change: '-0.3% pts', impact: 'POSITIVE' },
    { name: 'EPRA Super Petrol (Nairobi)', value: 'KES 180.66 / L', change: '-KES 1.31', impact: 'POSITIVE' },
    { name: '2kg Sifted Unga (Retail)', value: 'KES 135.00', change: '-KES 5.00', impact: 'POSITIVE' },
    { name: 'CBK Exchange Rate', value: '129.25 KES/USD', change: '+0.15 KES', impact: 'NEUTRAL' },
    { name: 'Public Debt to GDP', value: '68.2%', change: '-1.9% pts', impact: 'POSITIVE' }
  ],
  keySocialIndicators: [
    { metric: 'SHA Hospital Integration Rate', value: '68.4%', status: 'WARNING' },
    { metric: 'University Funding Appeals Rate', value: '34.2%', status: 'ELEVATED' },
    { metric: 'Gen-Z / Youth NEET Index', value: '35.4%', status: 'CRITICAL' },
    { metric: 'NDMA Food Relief Beneficiaries', value: '1.2M Citizens', status: 'NORMAL' }
  ],
  comparison24hVs7d: [
    { metric: 'Monitored Political Stories Analyzed', value24h: 364, value7dAverage: 310, delta: '+17.4%', interpretation: 'Accelerating news cycle driven by regional rallies and health policy debates.' },
    { metric: 'Overall Systemic Negative Sentiment Ratio', value24h: '38.2%', value7dAverage: '31.5%', delta: '+6.7% pts', interpretation: 'Direct correlation with SHA pre-authorization difficulties.' },
    { metric: 'Western Region Activity Index Share', value24h: '24.1%', value7dAverage: '16.2%', delta: '+7.9% pts', interpretation: 'Substantial geographic expansion fueled by Tawe Movement rallies.' }
  ],
  dataLimitations: [
    'Analysis is strictly grounded in verified public news reports, Kenya Law Gazette entries, and official parliamentary Hansard releases collected within the last 24 hours.',
    'Social media metrics are filtered through strict bot-detection heuristics and should not be construed as statistically representative scientific voter opinion polling.',
    'Sentiment indicators measure observed editorial and public statement tone, not deterministic election outcomes.'
  ],
  sourcesList: [
    { name: 'Daily Nation (Nation Media Group)', type: 'National Mainstream Daily', articlesAnalyzed: 94 },
    { name: 'The Standard Media', type: 'National Mainstream Daily', articlesAnalyzed: 82 },
    { name: 'The Star Kenya', type: 'Political & Investigative Daily', articlesAnalyzed: 88 },
    { name: 'Capital FM Kenya', type: 'National Broadcaster', articlesAnalyzed: 45 },
    { name: 'Citizen Digital', type: 'Digital News Network', articlesAnalyzed: 104 },
    { name: 'Business Daily Africa', type: 'Financial & Economic Press', articlesAnalyzed: 36 },
    { name: 'Kenya Law & Gazette Portal', type: 'Official State Records', articlesAnalyzed: 15 }
  ],
  markdownContent: `# KENYA POLITICAL INTELLIGENCE BRIEF
**Report Date:** August 25, 2026 | **Classification:** Open Source Intelligence (OSINT) | **Coverage:** 47 Counties

---

## 1. EXECUTIVE SUMMARY
Over the preceding 24 hours, the Kenya Political Intelligence platform monitored **364 unique political reports** across 8 verified national news organizations and state record gazettes. The analytical baseline indicates **three acute operational inflection points**:

1. **Devolved Health Governance Stress:** Systemic authentication and pre-authorization backlogs under the Social Health Authority (SHA) platform across 18 regional referral hospitals have created critical friction between the Council of Governors (CoG) and the Ministry of Health.
2. **Western Political Realignment:** Governor George Natembeya's insurgent **"Tawe Movement"** staged massive youth-dominated rallies across Kakamega and Trans Nzoia, mounting a direct grassroots challenge against traditional political kingpins Moses Wetangula and Musalia Mudavadi.
3. **Mt. Kenya Sentiment Consolidation:** Former DP Rigathi Gachagua continued intensive grassroots consultative forums in Nyeri and Murang'a, consolidating independent regional posture ahead of the 2027 electoral cycle.

---

## 2. TOP POLITICAL DEVELOPMENTS

| Development | Impact | Key Entities | Source Verification |
| :--- | :--- | :--- | :--- |
| **Referral Hospitals Face SHA Glitches** | **CRITICAL** | Ministry of Health, Council of Governors, SHA | Daily Nation, The Standard |
| **Tawe Movement Grassroots Surge in Western** | **HIGH** | George Natembeya, Moses Wetangula, DAP-K | The Standard, Citizen Digital |
| **Judiciary Halts Highway Tolling Framework** | **MODERATE** | Okiya Omtatah, High Court, KeNHA | Business Daily, Kenya Gazette |

---

## 3. OVERNIGHT POLITICAL SHIFTS (EARLY SIGNAL RADAR)

- 🔴 **HIGH SIGNAL [Topic: SHA Healthcare Deductions & Delays]:** \`+49.3%\` velocity vs 7-day baseline. Negative sentiment reached \`-0.54\`.
- 🔴 **HIGH SIGNAL [County: Trans Nzoia & Kakamega]:** \`+58.4%\` political activity surge tied to Tawe Movement mass mobilization.
- 🔴 **HIGH SIGNAL [Politician: Rigathi Gachagua]:** \`+64.2%\` mention expansion in vernacular and national press.
- 🟡 **MEDIUM SIGNAL [Party: Wiper Democratic Movement]:** \`+36.2%\` increase in opposition share positioning.

---

## 4. TOP POLITICIANS BY MOMENTUM & ACTIVITY

1. **William Samoei Ruto** (President) — *Mentions:* 342 | *Momentum Score:* **84.5/100** | *Key Driver:* Eldoret City infrastructure charter and broad-based alliance defense.
2. **Rigathi Gachagua** (Former DP) — *Mentions:* 288 | *Momentum Score:* **91.2/100** | *Key Driver:* Central Kenya community consolidation and vernacular engagement.
3. **George Natembeya** (Governor Trans Nzoia) — *Mentions:* 148 | *Momentum Score:* **89.6/100** | *Key Driver:* Tawe Movement youth appeal and Western anti-patronage campaign.
4. **Stephen Kalonzo Musyoka** (Wiper Leader) — *Mentions:* 162 | *Momentum Score:* **85.3/100** | *Key Driver:* Machakos economic manifesto launch and shadow opposition leader role.
5. **Raila Amolo Odinga** (AUC Candidate) — *Mentions:* 215 | *Momentum Score:* **82.0/100** | *Key Driver:* AU Commission continental diplomacy.

---

## 5. REGIONAL TENSION & COUNTY SIGNALS

- **Central Region (Nyeri, Murang'a, Kiambu):** \`VOLATILE\` — Elevated debate regarding regional leadership succession.
- **Western Region (Trans Nzoia, Kakamega, Bungoma):** \`HEATED\` — High-velocity confrontation between insurgent Tawe leaders and veteran parliamentary leadership.
- **Nairobi Metropolitan:** \`GUARDED\` — Active civil society litigation against taxation and toll policies.
- **Coast Region:** \`CALM\` — Port logistics stability and blue economy consultations.

---

## 6. DATA LIMITATIONS & METHODOLOGICAL NOTICE
*This briefing is algorithmically synthesized from verified public open-source reporting and official gazetted records. Sentiment scores reflect observational linguistic metrics and must not be interpreted as voter intention or electoral forecasting.*
`,
  generatedAt: '2026-08-25T06:00:00Z',
  generatedByModel: 'Gemini 3.7 Flash Political Analysis Engine'
};

export const INITIAL_PIPELINE_STATUS: PipelineStatus = {
  lastRunTimestamp: '2026-08-25T06:00:00Z',
  nextScheduledRun: '2026-08-25T22:00:00Z',
  status: 'COMPLETED',
  currentStage: 'Pipeline Idle (Scheduled for 10:00 PM EAT)',
  progressPct: 100,
  articlesCollectedToday: 364,
  duplicatesFilteredToday: 42,
  entitiesExtractedToday: 1890,
  signalsGeneratedToday: 5,
  logs: [
    { timestamp: '2026-08-25 06:00:01', level: 'SUCCESS', message: 'Morning Intelligence Briefing compiled and published in HTML/Markdown/JSON.' },
    { timestamp: '2026-08-25 04:30:12', level: 'INFO', message: 'Gemini AI Political Analyst synthesis completed with zero hallucinations and verified source citations.' },
    { timestamp: '2026-08-25 02:15:40', level: 'INFO', message: 'Overnight Political Shift Detector identified 3 HIGH signals, 1 MEDIUM signal, and 1 EMERGING signal.' },
    { timestamp: '2026-08-25 01:00:22', level: 'INFO', message: 'Momentum index recalculation completed across all 47 counties and 10 tracked political leaders.' },
    { timestamp: '2026-08-25 00:05:18', level: 'INFO', message: 'spaCy & Transformer NLP entity extraction extracted 1,890 Kenyan political entities and 22 classified topics.' },
    { timestamp: '2026-08-24 23:10:05', level: 'INFO', message: 'Data cleaning & deduplication filtered out 42 cross-feed syndication duplicates using SHA-256 / SimHash.' },
    { timestamp: '2026-08-24 22:00:00', level: 'INFO', message: 'Nightly RSS & Public News Scraper initiated across 8 verified Kenyan media sources.' }
  ]
};

export const KENYA_ECONOMIC_INDICATORS: EconomicIndicator[] = [
  {
    id: 'eco-inflation',
    name: 'Headline Inflation Rate',
    code: 'KNBS-CPI-YOY',
    category: 'Inflation',
    currentValue: 4.3,
    unit: '% YoY',
    previousValue: 4.6,
    changePct24h: -0.3,
    trend: 'DOWN',
    impactOnPolitics: 'HIGH',
    sourceAgency: 'Kenya National Bureau of Statistics (KNBS)',
    description: 'Overall year-on-year consumer price index driven by food and non-alcoholic beverages price stabilization.',
    politicalSensitivityNote: 'Stabilization gives executive talking points against cost of living critique, but food basket perceived burden remains elevated in low-income settlements.'
  },
  {
    id: 'eco-super-petrol',
    name: 'EPRA Super Petrol (Nairobi)',
    code: 'EPRA-PMS-NRB',
    category: 'Energy & Fuel',
    currentValue: 180.66,
    unit: 'KES / Litre',
    previousValue: 181.97,
    changePct24h: -0.72,
    trend: 'DOWN',
    impactOnPolitics: 'HIGH',
    sourceAgency: 'Energy and Petroleum Regulatory Authority (EPRA)',
    description: 'Regulated maximum pump retail price for Super Petrol (PMS) in Nairobi metropolitan area.',
    politicalSensitivityNote: 'Directly impacts Matatu and Boda Boda fare tariffs; primary trigger for urban transport union strikes and informal sector unrest.'
  },
  {
    id: 'eco-diesel',
    name: 'EPRA Automotive Diesel (Nairobi)',
    code: 'EPRA-AGO-NRB',
    category: 'Energy & Fuel',
    currentValue: 168.06,
    unit: 'KES / Litre',
    previousValue: 169.10,
    changePct24h: -0.61,
    trend: 'DOWN',
    impactOnPolitics: 'HIGH',
    sourceAgency: 'Energy and Petroleum Regulatory Authority (EPRA)',
    description: 'Regulated pump retail price for Diesel (AGO) driving national logistics and agricultural tractors.',
    politicalSensitivityNote: 'Core cost driver for agricultural plowing and heavy freight logistics along the Northern Corridor.'
  },
  {
    id: 'eco-usd-kes',
    name: 'CBK USD / KES Exchange Rate',
    code: 'CBK-FX-USDKES',
    category: 'Currency & Debt',
    currentValue: 129.25,
    unit: 'KES per USD',
    previousValue: 129.40,
    changePct24h: -0.12,
    trend: 'STABLE',
    impactOnPolitics: 'HIGH',
    sourceAgency: 'Central Bank of Kenya (CBK)',
    description: 'Official CBK weighted mean interbank foreign exchange rate.',
    politicalSensitivityNote: 'Currency stabilization at ~129 KES shields government from sovereign debt repayment spikes and mitigates imported fuel costs.'
  },
  {
    id: 'eco-unga-2kg',
    name: '2kg Maize Flour (Unga Retail)',
    code: 'KNBS-STAPLE-UNGA',
    category: 'Commodities & Food',
    currentValue: 135.0,
    unit: 'KES / 2kg Packet',
    previousValue: 140.0,
    changePct24h: -3.57,
    trend: 'DOWN',
    impactOnPolitics: 'HIGH',
    sourceAgency: 'Ministry of Agriculture / KNBS',
    description: 'Average retail market price for standard sifted maize meal across major urban supermarkets and duka kiosks.',
    politicalSensitivityNote: 'The supreme socio-political barometer in Kenyan politics. Prices above KES 180 historically trigger civil disobedience and mass mobilization.'
  },
  {
    id: 'eco-debt-gdp',
    name: 'Public Debt to GDP Ratio',
    code: 'NT-DEBT-GDP',
    category: 'Currency & Debt',
    currentValue: 68.2,
    unit: '% of GDP',
    previousValue: 70.1,
    changePct24h: -1.9,
    trend: 'DOWN',
    impactOnPolitics: 'HIGH',
    sourceAgency: 'National Treasury & Planning / CBK',
    description: 'Total public and publicly guaranteed national external and domestic sovereign obligations.',
    politicalSensitivityNote: 'Drives parliamentary conditionality under IMF Extended Fund Facility (EFF) and fiscal tax bill resistance.'
  },
  {
    id: 'eco-cbr-rate',
    name: 'Central Bank Benchmark Rate (CBR)',
    code: 'CBK-MPC-CBR',
    category: 'Currency & Debt',
    currentValue: 12.00,
    unit: '%',
    previousValue: 12.75,
    changePct24h: -0.75,
    trend: 'DOWN',
    impactOnPolitics: 'MEDIUM',
    sourceAgency: 'Central Bank of Kenya (Monetary Policy Committee)',
    description: 'Benchmark policy lending rate influencing commercial bank interest rates and MSME loan affordability.',
    politicalSensitivityNote: 'Rate cuts ease credit constraints for Hustler Fund borrowers and informal traders (Jua Kali sector).'
  },
  {
    id: 'eco-tea-auction',
    name: 'Mombasa Tea Auction Average',
    code: 'EATTA-TEA-AVG',
    category: 'Trade & Agriculture',
    currentValue: 2.24,
    unit: 'USD / Kg',
    previousValue: 2.18,
    changePct24h: 2.75,
    trend: 'UP',
    impactOnPolitics: 'HIGH',
    sourceAgency: 'East African Tea Trade Association (EATTA)',
    description: 'Mombasa weekly auction average hammer price for KTDA smallholder processed black CTC tea.',
    politicalSensitivityNote: 'Crucial determinant of KTDA farmer bonus payouts in Mt Kenya, Rift Valley, and Kisii; directly correlates with rural political contentment.'
  },
  {
    id: 'eco-coffee-auction',
    name: 'Nairobi Coffee Exchange (NCE)',
    code: 'NCE-COF-AVG',
    category: 'Trade & Agriculture',
    currentValue: 248.5,
    unit: 'USD / 50kg Bag',
    previousValue: 242.0,
    changePct24h: 2.68,
    trend: 'UP',
    impactOnPolitics: 'MEDIUM',
    sourceAgency: 'Nairobi Coffee Exchange / Coffee Directorate',
    description: 'Benchmark direct auction clearing price for Grade AA and AB Kenyan Arabica parchment.',
    politicalSensitivityNote: 'Central issue in Mt Kenya regional political consolidation and Executive coffee subsector reforms.'
  }
];

export const KENYA_SOCIAL_INDICATORS: SocialIndicator[] = [
  {
    id: 'soc-sha-rollout',
    title: 'Social Health Authority (SHA/SHIF) Facility Onboarding',
    category: 'Healthcare',
    metricValue: '68.4%',
    metricUnit: 'Public & Private Facilities Integrated',
    statusLevel: 'WARNING',
    affectedCountiesCount: 47,
    keyStakeholders: ['Ministry of Health', 'Kenya Medical Association (KMA)', 'KMPDU', 'Christian Health Association (CHAK)', 'Rural & Private Hospitals Assoc (RUPHA)'],
    publicSentimentScore: -0.58,
    politicalRiskSummary: 'Transition from NHIF to SHA continues to face system outages, pre-authorization bottlenecks for renal and oncology patients, and billing delays.',
    latestDevelopment: 'Senate Health Committee summoned CS Health following private hospital consortium threats to revert to cash-only payments.'
  },
  {
    id: 'soc-university-funding',
    title: 'University New Funding Model (NFM) Student Banding',
    category: 'Education',
    metricValue: 'Band 1-5 Appeal Rate: 34.2%',
    metricUnit: 'Students Disputing Categorization',
    statusLevel: 'ELEVATED',
    affectedCountiesCount: 38,
    keyStakeholders: ['Ministry of Education', 'HELB', 'University Student Councils', 'Vice Chancellors Committee'],
    publicSentimentScore: -0.62,
    politicalRiskSummary: 'Students placed in high contribution bands (Band 4 & 5) despite vulnerable household backgrounds; threat of nationwide campus strikes.',
    latestDevelopment: 'National Treasury released KES 5.2B supplementary fund to re-evaluate 120,000 contested student appeals.'
  },
  {
    id: 'soc-youth-unemployment',
    title: 'Gen-Z / Youth Underemployment & Civic Mobilization Index',
    category: 'Youth & Employment',
    metricValue: '35.4%',
    metricUnit: 'Youth Neither in Formal Employment nor Training (NEET)',
    statusLevel: 'CRITICAL',
    affectedCountiesCount: 47,
    keyStakeholders: ['Civil Society Coalitions', 'Digital Content Creators', 'Youth Bunge Forums', 'State Department for Youth'],
    publicSentimentScore: -0.44,
    politicalRiskSummary: 'High digital literacy coupled with limited formal job creation sustains potent, decentralized organic protest mobilization potential.',
    latestDevelopment: 'National Youth Council launched county ICT digital hub expansion; online forums remain skeptical of state employment pledges.'
  },
  {
    id: 'soc-labor-strikes',
    title: 'Doctors, Nurses & JSS Teachers Labor Stability',
    category: 'Labor & Strikes',
    metricValue: '2 Active Labor Disputes',
    metricUnit: 'National Union Collective Bargaining Notices',
    statusLevel: 'ELEVATED',
    affectedCountiesCount: 47,
    keyStakeholders: ['KMPDU', 'KNUN', 'KUPPET', 'Teachers Service Commission (TSC)', 'Council of Governors'],
    publicSentimentScore: -0.36,
    politicalRiskSummary: 'Friction between TSC and Junior Secondary School (JSS) intern teachers over permanent confirmation timetable; county doctor posting delays.',
    latestDevelopment: 'TSC confirmed 46,000 JSS teachers onto permanent terms, averting planned third-term national strike.'
  },
  {
    id: 'soc-food-security-asal',
    title: 'National Drought Management (NDMA) ASAL Vulnerability',
    category: 'Food Security',
    metricValue: '1.2M Citizens',
    metricUnit: 'Requiring Humanitarian / Livestock Feed Assistance',
    statusLevel: 'NORMAL',
    affectedCountiesCount: 23,
    keyStakeholders: ['NDMA', 'Kenya Red Cross', 'World Food Programme (WFP)', 'State Dept for ASALs'],
    publicSentimentScore: 0.12,
    politicalRiskSummary: 'Adequate seasonal rains improved pasture in Northern Kenya; localized flash floods reported in Tana River and Garissa delta basins.',
    latestDevelopment: 'NDMA downgraded Marsabit, Turkana, and Mandera from Alert to Normal drought status following enhanced recharge of water pans.'
  }
];

export const SOCIO_ECONOMIC_CORRELATIONS: SocioEconomicCorrelation[] = [
  {
    id: 'cor-1',
    economicFactor: 'SHA Healthcare 2.75% Gross Deductions without Smooth Dialysis/Oncology Coverage',
    socialPressure: 'Patient frustration in public dispensaries and faith-based mission hospitals',
    politicalOutcome: 'Heavy anti-incumbent sentiment across Central and Western Kenya; weaponized by opposition leaders during barazas',
    severity: 'HIGH',
    impactedRegions: ['Central', 'Nairobi', 'Western', 'Rift Valley'],
    mitigationSignals: 'Expedited hospital claim reimbursements and digital offline fallback for emergency admissions.'
  },
  {
    id: 'cor-2',
    economicFactor: 'High Unga and Cooking Oil Retail Prices relative to Minimum Wages',
    socialPressure: 'Informal settlement household budget strain and food insecurity',
    politicalOutcome: 'Direct fuel for civil society protest mobilization and street demonstrations in Nairobi, Kisumu, Mombasa',
    severity: 'HIGH',
    impactedRegions: ['Nairobi', 'Nyanza', 'Coast', 'Western'],
    mitigationSignals: 'Expansion of National Cereals and Produce Board (NCPB) subsidized fertilizer and regional maize distribution.'
  },
  {
    id: 'cor-3',
    economicFactor: 'KTDA Tea Bonus Payout Disparities ($0.15/kg variance between East and West Rift)',
    socialPressure: 'Smallholder tea farmer strikes and factory governance disputes',
    politicalOutcome: 'Erosion of ruling coalition loyalty in South Rift (Bomet, Kericho) and Gusii (Kisii, Nyamira)',
    severity: 'MEDIUM',
    impactedRegions: ['Rift Valley', 'Nyanza', 'Central'],
    mitigationSignals: 'Reforms in the Tea Act 2020 enforcement and fertilizer subsidy delivery directly to factory sheds.'
  },
  {
    id: 'cor-4',
    economicFactor: 'University Funding Model (Band 4/5 Tuition Invoices reaching KES 250,000/yr)',
    socialPressure: 'Middle-class and low-income parent shock and student campus unrest',
    politicalOutcome: 'Mobilization of tertiary student demographic against parliamentary leadership and Ministry of Education',
    severity: 'HIGH',
    impactedRegions: ['Nairobi', 'Central', 'Rift Valley', 'Western', 'Nyanza'],
    mitigationSignals: 'Automatic re-banding appeals portal and immediate HELB scholarship disbursements.'
  }
];
