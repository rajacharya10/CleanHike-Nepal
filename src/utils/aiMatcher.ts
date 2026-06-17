import { aiFAQData } from '../data/aiFAQ';

export function matchFAQ(query: string): string | null {
  const normalizedQuery = query.toLowerCase().trim();

  // Direct match
  if (aiFAQData[normalizedQuery]) {
    return aiFAQData[normalizedQuery];
  }

  // Keyword matching
  const keywords: Record<string, string[]> = {
    hello: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    about: ['about cleanhike', 'what is cleanhike', 'tell me about', 'cleanhike'],
    'best hike': ['best hike', 'top treks', 'best treks', 'recommended', 'must do'],
    'beginner hike': ['beginner', 'easy hike', 'novice', 'first time', 'starter', 'simple hike'],
    'challenging hike': ['challenging', 'difficult', 'hard trek', 'adventure', 'extreme'],
    donate: ['donate', 'donation', 'contribute', 'support', 'give'],
    'best season': ['best season', 'when to visit', 'best time', 'season', 'weather'],
    gear: ['gear', 'equipment', 'what to bring', 'packing', 'clothes'],
    permit: ['permit', 'permits', 'TIMS', 'national park permit', 'documentation'],
    'eco tourism': ['eco', 'sustainable', 'green tourism', 'responsible travel'],
    environment: ['environment', 'conservation', 'nature', 'protect'],
    sponsor: ['sponsor', 'partnership', 'partner', 'corporate'],
    help: ['help', 'what can you do', 'how can you help'],
  };

  for (const [key, terms] of Object.entries(keywords)) {
    if (terms.some(term => normalizedQuery.includes(term))) {
      return aiFAQData[key] || null;
    }
  }

  return null;
}
