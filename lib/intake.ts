import { z } from 'zod';

export const placeContextSchema = z.object({
  where_found: z.string().max(2000).optional(),
  url: z.string().url().optional(),
  platform: z.enum(['other', 'website', 'news', 'video', 'forum']).optional(),
  caption_or_visible_text: z.string().max(5000).optional(),
  location_tag: z.string().max(500).optional(),
  date_published: z.string().date().optional(),
  date_captured: z.string().datetime().optional(),
  time_of_day: z.string().max(100).optional(),
  original_file: z.boolean().optional(),
  suspected_region: z.string().max(500).optional()
}).strict();

export type PlaceContext = z.infer<typeof placeContextSchema>;

export function parsePlaceContext(input: unknown): PlaceContext {
  return placeContextSchema.parse(input);
}
