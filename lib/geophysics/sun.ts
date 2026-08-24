import SunCalc from 'suncalc';

export type SunEvidence = {
  observation: string;
  inference: string;
  source: 'api';
  source_url: null;
  confidence: number;
};

export function sunPositionEvidence(latitude: number, longitude: number, capturedAt: Date): SunEvidence {
  const position = SunCalc.getPosition(capturedAt, latitude, longitude);
  const altitudeDegrees = position.altitude * 180 / Math.PI;
  const azimuthDegrees = (position.azimuth * 180 / Math.PI + 180) % 360;
  const observation = `sun altitude ${altitudeDegrees.toFixed(1)}deg, azimuth ${azimuthDegrees.toFixed(1)}deg at ${capturedAt.toISOString()}`;
  return {
    observation,
    inference: 'Constrains the possible latitude, hemisphere, coast orientation, and local time; it does not identify a person.',
    source: 'api',
    source_url: null,
    confidence: 0.5
  };
}
