import { analyzeWithAnthropic } from './anthropic';
import { analyzeWithGoogle } from './google';
import { analyzeWithOpenAI } from './openai';
import type { ModelResult } from './types';
import type { EvidenceItem } from '@/lib/evidence';

export type ModelAdapter = (image: Buffer, mime: string, ledger?: EvidenceItem[]) => Promise<ModelResult>;

export const modelRegistry: Record<string, ModelAdapter> = {
  anthropic: analyzeWithAnthropic,
  openai: analyzeWithOpenAI,
  google: analyzeWithGoogle
};

export type ModelRun = {
  model_key: string;
  status: 'succeeded' | 'failed';
  result?: ModelResult;
  error?: string;
  latency_ms: number;
};

export async function runModels(image: Buffer, mime: string, ledger?: EvidenceItem[]): Promise<ModelRun[]> {
  const runs = Object.entries(modelRegistry).map(async ([modelKey, adapter]) => {
    const started = Date.now();
    try {
      return { model_key: modelKey, status: 'succeeded' as const, result: await adapter(image, mime, ledger), latency_ms: Date.now() - started };
    } catch (error) {
      return { model_key: modelKey, status: 'failed' as const, error: error instanceof Error ? error.message : 'Model failed.', latency_ms: Date.now() - started };
    }
  });
  return Promise.all(runs);
}
