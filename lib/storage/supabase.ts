import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { ImageStorage, StoredImage } from './types';

const BUCKET = 'breakpoint-images';

export class SupabaseStorageAdapter implements ImageStorage {
  private readonly client: SupabaseClient;

  constructor(
    supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Supabase server storage requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
    }
    this.client = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
  }

  async putImage(input: {
    key: string;
    body: Buffer;
    contentType: string;
    width: number;
    height: number;
    hash: string;
  }): Promise<StoredImage> {
    const filename = `${input.hash}.jpg`;
    const { error } = await this.client.storage.from(BUCKET).upload(filename, input.body, {
      contentType: 'image/jpeg',
      upsert: false
    });
    if (error && error.message.toLowerCase().includes('already exists')) {
      return this.storedImage(filename, input);
    }
    if (error) throw error;
    return this.storedImage(filename, input);
  }

  private storedImage(filename: string, input: { body: Buffer; contentType: string; width: number; height: number; hash: string }): StoredImage {
    const { data } = this.client.storage.from(BUCKET).getPublicUrl(filename);
    return {
      path: filename,
      url: data.publicUrl,
      storageType: 'supabase',
      contentType: input.contentType,
      size: input.body.byteLength,
      width: input.width,
      height: input.height,
      hash: input.hash
    };
  }
}
