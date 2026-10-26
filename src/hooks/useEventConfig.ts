import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { EventSettings } from '../types/payment';

const DEFAULT_SETTINGS: EventSettings = {
  registration_fee: 0,
  currency: 'INR',
  event_name: 'IDEAVYA 2026',
  registration_open: true,
  max_team_size: 4,
  razorpay_enabled: true,
  isFree: true,
  feeInRupees: 0,
};

export function useEventConfig() {
  const [settings, setSettings] = useState<EventSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);
  const configured = isSupabaseConfigured;

  useEffect(() => {
    if (!configured || !supabase) {
      setLoading(false);
      return;
    }

    async function fetchConfig() {
      try {
        const { data, error: fetchErr } = await supabase!
          .from('event_config')
          .select('key, value');

        if (fetchErr) throw fetchErr;

        const map: Record<string, string> = {};
        data?.forEach(row => { map[row.key] = row.value; });

        const fee = parseInt(map.registration_fee ?? '0', 10);
        const parsed: EventSettings = {
          registration_fee: fee,
          currency: map.currency ?? 'INR',
          event_name: map.event_name ?? 'IDEAVYA 2026',
          registration_open: map.registration_open === 'true',
          max_team_size: parseInt(map.max_team_size ?? '4', 10),
          razorpay_enabled: map.razorpay_enabled === 'true',
          isFree: fee === 0,
          feeInRupees: fee / 100,
        };

        setSettings(parsed);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to load config';
        setError(msg);
        console.error('[useEventConfig]', msg);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, [configured]);

  return { settings, loading, error, configured };
}
