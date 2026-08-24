import { createHash } from 'node:crypto';
import sharp from 'sharp';

const MAX_DIMENSION = 1568;
const SUPPORTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/tiff']);

export type ProcessedUpload = {
  body: Buffer;
  contentType: 'image/jpeg';
  width: number;
  height: number;
  hash: string;
};

export async function processUpload(input: Buffer, mime: string): Promise<ProcessedUpload> {
  if (!SUPPORTED_TYPES.has(mime)) {
    throw new Error('Unsupported image type. Use JPEG, PNG, WebP, or TIFF.');
  }

  const image = sharp(input, { failOn: 'error' });
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error('The image has no readable dimensions.');
  }

  const body = await image
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
  const outputMetadata = await sharp(body).metadata();

  return {
    body,
    contentType: 'image/jpeg',
    width: outputMetadata.width ?? metadata.width,
    height: outputMetadata.height ?? metadata.height,
    hash: createHash('sha256').update(body).digest('hex')
  };
}
