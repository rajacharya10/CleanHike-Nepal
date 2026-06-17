import { useState, useEffect } from 'react';
import { getSponsors, getSponsorsByTier } from '../services/sponsors';

export function useSponsors(filters?: { tier?: string }) {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSponsors() {
      try {
        setLoading(true);
        const data = await getSponsors(filters);
        setSponsors(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch sponsors'));
      } finally {
        setLoading(false);
      }
    }
    fetchSponsors();
  }, [filters?.tier]);

  return { sponsors, loading, error };
}

export function useSponsorsByTier() {
  const [sponsorsByTier, setSponsorsByTier] = useState<{
    platinum: any[];
    gold: any[];
    silver: any[];
    bronze: any[];
  }>({ platinum: [], gold: [], silver: [], bronze: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSponsors() {
      try {
        setLoading(true);
        const data = await getSponsorsByTier();
        setSponsorsByTier(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch sponsors'));
      } finally {
        setLoading(false);
      }
    }
    fetchSponsors();
  }, []);

  return { sponsorsByTier, loading, error };
}
