import type { Candidate, Consensus } from '@/lib/consensus';

export const LAST_RUN_KEY = 'breakpoint:last-run';

export type LastRun = {
  savedAt: number;
  candidates: Candidate[];
  consensus: Consensus;
  image?: { width: number; height: number; hash: string };
};

export function saveLastRun(run: Omit<LastRun, 'savedAt'>) {
  try {
    sessionStorage.setItem(LAST_RUN_KEY, JSON.stringify({ ...run, savedAt: Date.now() }));
  } catch {
    /* private mode / storage disabled — the investigation page will show its empty state */
  }
}

export function readLastRun(): LastRun | null {
  try {
    const raw = sessionStorage.getItem(LAST_RUN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LastRun;
    if (!Array.isArray(parsed.candidates)) return null;
    return parsed;
  } catch {
    return null;
  }
}
