export type StoredImage = {
  path: string;
  url?: string;
  storageType?: 'local' | 'supabase';
  contentType: string;
  size: number;
  width: number;
  height: number;
  hash: string;
};

export interface ImageStorage {
  putImage(input: {
    key: string;
    body: Buffer;
    contentType: string;
    width: number;
    height: number;
    hash: string;
  }): Promise<StoredImage>;
}
