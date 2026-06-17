import { supabase } from './supabase';

export async function getGalleryImages(filters?: {
  category?: string;
}) {
  let query = supabase
    .from('gallery')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (filters?.category && filters.category !== 'All') {
    query = query.eq('category', filters.category.toLowerCase());
  }

  const { data, error } = await query;

  if (error) throw error;

  // Transform to match frontend GalleryImage type
  return data?.map(img => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    category: img.category,
    location: img.location,
  })) || [];
}
