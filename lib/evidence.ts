import { z } from 'zod';

export const evidenceClassSchema = z.literal('place');
export const evidenceItemSchema = z.object({
  class: evidenceClassSchema,
  type: z.enum(['visual', 'metadata', 'ocr', 'caption', 'web', 'map', 'source']),
  observation: z.string().min(1),
  inference: z.string().min(1),
  source: z.enum(['user_upload', 'model', 'url', 'api', 'screenshot']),
  source_url: z.string().url().nullable(),
  confidence: z.number().min(0).max(1)
});

export type EvidenceItem = z.infer<typeof evidenceItemSchema>;

export function acceptPlaceEvidence(input: unknown): EvidenceItem {
  const parsed = evidenceItemSchema.safeParse(input);
  if (!parsed.success) throw new Error('Only valid place evidence can be accepted. Person evidence is rejected.');
  return parsed.data;
}
