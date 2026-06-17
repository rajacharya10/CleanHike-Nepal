import { supabase } from './supabase';

export async function getSponsors(filters?: {
  tier?: string;
}) {
  let query = supabase
    .from('sponsors')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (filters?.tier) {
    query = query.eq('tier', filters.tier);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getSponsorsByTier() {
  const sponsors = await getSponsors();

  return {
    platinum: sponsors?.filter(s => s.tier === 'platinum') || [],
    gold: sponsors?.filter(s => s.tier === 'gold') || [],
    silver: sponsors?.filter(s => s.tier === 'silver') || [],
    bronze: sponsors?.filter(s => s.tier === 'bronze') || [],
  };
}
