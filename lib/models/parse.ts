import { modelResultSchema, type ModelResult } from './types';

export function parseModelJson(text: string): ModelResult {
  const withoutFence = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  return modelResultSchema.parse(JSON.parse(withoutFence));
}
