import { z } from 'zod';

export const locationGuessSchema = z.object({
  label: z.string(),
  country: z.string().length(2),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  radius_km: z.number().nonnegative(),
  confidence: z.number().min(0).max(1)
});

export const modelResultSchema = z.object({
  primary_guess: locationGuessSchema,
  alternates: z.array(locationGuessSchema).max(3),
  clues: z.array(z.object({ observation: z.string(), inference: z.string() })),
  contradictions: z.array(z.string()),
  reasoning: z.string(),
  grounded_in: z.enum(['image', 'ledger', 'both'])
});

export type ModelResult = z.infer<typeof modelResultSchema>;
