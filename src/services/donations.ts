import { supabase } from './supabase';

export async function getDonationCampaigns(filters?: {
  category?: string;
  status?: string;
}) {
  let query = supabase
    .from('donation_campaigns')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (filters?.category && filters.category !== 'All') {
    query = query.eq('category', filters.category);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getDonationCampaignBySlug(slug: string) {
  const { data, error } = await supabase
    .from('donation_campaigns')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function createDonation(donation: {
  campaign_id?: string;
  amount: number;
  payment_method: string;
  donor_name?: string;
  donor_email?: string;
  is_anonymous?: boolean;
  message?: string;
}) {
  const { data, error } = await supabase
    .from('donations')
    .insert([{
      ...donation,
      payment_status: 'completed', // In real app, this would be set after payment confirmation
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserDonations(userId: string) {
  const { data, error } = await supabase
    .from('donations')
    .select(`
      *,
      donation_campaigns(title)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
