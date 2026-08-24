import type { ModelResult } from '@/lib/models/types';

export type SuccessfulGuess = { model_key: string; result: ModelResult };
export type Consensus = {
  status: 'converged' | 'single' | 'unresolved';
  members: string[];
  label: string | null;
  lat: number | null;
  lng: number | null;
  radius_km: number | null;
  confidence: number;
};

const EARTH_RADIUS_KM = 6371;
const toRadians = (value: number) => value * Math.PI / 180;

export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const latDelta = toRadians(b.lat - a.lat);
  const lngDelta = toRadians(b.lng - a.lng);
  const sinLat = Math.sin(latDelta / 2);
  const sinLng = Math.sin(lngDelta / 2);
  const value = sinLat ** 2 + Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * sinLng ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(Math.min(1, value)));
}

function agree(a: SuccessfulGuess, b: SuccessfulGuess): boolean {
  const first = a.result.primary_guess;
  const second = b.result.primary_guess;
  return haversineKm(first, second) < Math.max(50, Math.min(first.radius_km, second.radius_km));
}

function centroid(members: SuccessfulGuess[]) {
  let x = 0;
  let y = 0;
  let z = 0;
  let weight = 0;
  for (const member of members) {
    const guess = member.result.primary_guess;
    const confidence = Math.max(guess.confidence, 0.001);
    const latitude = toRadians(guess.lat);
    const longitude = toRadians(guess.lng);
    x += Math.cos(latitude) * Math.cos(longitude) * confidence;
    y += Math.cos(latitude) * Math.sin(longitude) * confidence;
    z += Math.sin(latitude) * confidence;
    weight += confidence;
  }
  const longitude = Math.atan2(y, x);
  const hypotenuse = Math.sqrt(x ** 2 + y ** 2);
  return { lat: Math.atan2(z, hypotenuse) * 180 / Math.PI, lng: longitude * 180 / Math.PI, weight };
}

export function calculateConsensus(guesses: SuccessfulGuess[]): Consensus {
  if (guesses.length === 0) return { status: 'unresolved', members: [], label: null, lat: null, lng: null, radius_km: null, confidence: 0 };

  const remaining = new Set(guesses.map((_, index) => index));
  const clusters: SuccessfulGuess[][] = [];
  while (remaining.size > 0) {
    const seedIndex = [...remaining][0];
    const clusterIndexes = new Set([seedIndex]);
    const queue = [seedIndex];
    remaining.delete(seedIndex);
    while (queue.length > 0) {
      const current = queue.shift() as number;
      for (const candidate of [...remaining]) {
        if (agree(guesses[current], guesses[candidate])) {
          clusterIndexes.add(candidate);
          remaining.delete(candidate);
          queue.push(candidate);
        }
      }
    }
    clusters.push([...clusterIndexes].map((index) => guesses[index]));
  }

  clusters.sort((first, second) => second.reduce((sum, item) => sum + item.result.primary_guess.confidence, 0) - first.reduce((sum, item) => sum + item.result.primary_guess.confidence, 0));
  const winner = clusters[0];
  const centre = centroid(winner);
  const radius = Math.max(...winner.map((item) => haversineKm(centre, item.result.primary_guess)), Math.min(...winner.map((item) => item.result.primary_guess.radius_km)));
  const confidence = winner.reduce((sum, item) => sum + item.result.primary_guess.confidence, 0) / winner.length;

  return {
    status: winner.length === 1 ? 'single' : 'converged',
    members: winner.map((item) => item.model_key),
    label: winner[0].result.primary_guess.label,
    lat: centre.lat,
    lng: centre.lng,
    radius_km: radius,
    confidence
  };
}
