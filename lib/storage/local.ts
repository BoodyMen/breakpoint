import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { ImageStorage, StoredImage } from './types';

export class LocalImageStorage implements ImageStorage {
  private readonly root: string;

  constructor(root = path.join(process.cwd(), 'storage')) {
    this.root = root;
  }

  async putImage(input: {
    key: string;
    body: Buffer;
    contentType: string;
    width: number;
    height: number;
    hash: string;
  }): Promise<StoredImage> {
    const filePath = path.join(this.root, input.key);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, input.body);

    return {
      path: input.key,
      storageType: 'local',
      contentType: input.contentType,
      size: input.body.byteLength,
      width: input.width,
      height: input.height,
      hash: input.hash
    };
  }
}
