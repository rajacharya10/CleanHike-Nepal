import { supabase } from './supabase';

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([formData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getContactMessages(filters?: {
  status?: string;
}) {
  let query = supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}
