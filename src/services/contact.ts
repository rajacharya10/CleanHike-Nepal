import { supabase } from './supabase';
import { contactService, EmailData } from './email.service';

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { error: dbError } = await supabase
    .from('contact_messages')
    .insert([formData]);

  if (dbError) {
    console.error('Database Error:', dbError);
  }

  const emailResult = await contactService.sendMessage(
    formData as EmailData
  );

  if (!emailResult.success) {
    throw new Error(
      emailResult.error || 'Failed to send message'
    );
  }

  return {
    success: true,
  };
}

export async function getContactMessages(filters?: {
  status?: string;
}) {
  let query = supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', {
      ascending: false,
    });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}