import { supabase } from './supabase';

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  // Store in database first
  const { data: dbData, error: dbError } = await supabase
    .from('contact_messages')
    .insert([formData])
    .select()
    .single();

  if (dbError) {
    console.error('Database error:', dbError);
    // Still try to send email even if DB fails
  }

  // Send email via Edge Function
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Email sending failed:', error);
      // Even if email fails, the message was saved to DB
    }
  } catch (error) {
    console.error('Failed to send email notification:', error);
    // Message was saved to DB, so still return success
  }

  return dbData;
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
