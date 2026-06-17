import { useState, useEffect } from 'react';
import { getHikes, getHikeById, getFeaturedHikes } from '../services/api';

export function useHikes(filters?: {
  difficulty?: string;
  featured?: boolean;
  search?: string;
}) {
  const [hikes, setHikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHikes() {
      try {
        setLoading(true);
        const data = await getHikes(filters);
        setHikes(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch hikes'));
      } finally {
        setLoading(false);
      }
    }
    fetchHikes();
  }, [filters?.difficulty, filters?.featured, filters?.search]);

  return { hikes, loading, error };
}

export function useHike(id: string) {
  const [hike, setHike] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHike() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getHikeById(id);
        setHike(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch hike'));
      } finally {
        setLoading(false);
      }
    }
    fetchHike();
  }, [id]);

  return { hike, loading, error };
}

export function useFeaturedHikes() {
  const [hikes, setHikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHikes() {
      try {
        setLoading(true);
        const data = await getFeaturedHikes();
        setHikes(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch featured hikes'));
      } finally {
        setLoading(false);
      }
    }
    fetchHikes();
  }, []);

  return { hikes, loading, error };
}
