import { supabase } from './supabase';

export async function getAllContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateMessageStatus(messageId: string, status: 'unread' | 'read' | 'replied' | 'archived') {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ status })
    .eq('id', messageId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function replyToMessage(messageId: string, replyMessage: string) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({
      status: 'replied',
      reply_message: replyMessage,
      replied_at: new Date().toISOString(),
    })
    .eq('id', messageId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function checkIsAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return profile?.role === 'admin';
}

export async function getAdminStats() {
  // Get counts for dashboard
  const [messagesResult, donationsResult, bookingsResult] = await Promise.all([
    supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
    supabase.from('donations').select('amount', { count: 'exact' }),
    supabase.from('trek_bookings').select('id', { count: 'exact', head: true }),
  ]);

  const unreadMessages = await supabase
    .from('contact_messages')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'unread');

  return {
    totalMessages: messagesResult.count || 0,
    unreadMessages: unreadMessages.count || 0,
    totalDonations: donationsResult.data?.reduce((sum, d) => sum + Number(d.amount), 0) || 0,
    totalBookings: bookingsResult.count || 0,
  };
}

export async function getAllDonations() {
  const { data, error } = await supabase
    .from('donations')
    .select(`
      *,
      donation_campaigns(title)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAllBookings() {
  const { data, error } = await supabase
    .from('trek_bookings')
    .select(`
      *,
      hikes(name, location)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateBookingStatus(bookingId: string, status: 'pending' | 'confirmed' | 'cancelled' | 'completed') {
  const { data, error } = await supabase
    .from('trek_bookings')
    .update({ status })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
