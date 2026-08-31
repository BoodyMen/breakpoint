import type { Candidate, Consensus } from '@/lib/consensus';

// A fixed sample response used only when no model API keys are configured, so the
// upload -> analysis flow is demonstrable before the environment is wired up. It
// is NOT an analysis of the uploaded image; the analysis page flags it clearly.
export const DEMO_CANDIDATES: Candidate[] = [
  {
    label: 'Sagres, Portugal',
    country: 'PT',
    lat: 37.0106,
    lng: -8.9502,
    radius_km: 18,
    confidence: 0.64,
    likelihood: 0.57,
    models: ['anthropic', 'google']
  },
  {
    label: 'Carrapateira, Portugal',
    country: 'PT',
    lat: 37.1807,
    lng: -8.9006,
    radius_km: 26,
    confidence: 0.42,
    likelihood: 0.28,
    models: ['openai']
  },
  {
    label: 'Ericeira, Portugal',
    country: 'PT',
    lat: 38.9634,
    lng: -9.4177,
    radius_km: 44,
    confidence: 0.29,
    likelihood: 0.15,
    models: ['google']
  }
];

export const DEMO_CONSENSUS: Consensus = {
  status: 'converged',
  members: ['anthropic', 'google'],
  label: 'Sagres, Portugal',
  lat: 37.0106,
  lng: -8.9502,
  radius_km: 22,
  confidence: 0.6
};

export function isMissingKeyError(message: string | undefined): boolean {
  return typeof message === 'string' && message.includes('is not configured');
}
