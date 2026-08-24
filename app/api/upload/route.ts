import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { processUpload } from '@/lib/images/process-upload';
import { LocalImageStorage } from '@/lib/storage/local';
import { SupabaseStorageAdapter } from '@/lib/storage/supabase';

export const runtime = 'nodejs';

const MAX_UPLOAD_BYTES = Number(process.env.UPLOAD_MAX_BYTES ?? 10 * 1024 * 1024);
const storage = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? new SupabaseStorageAdapter()
  : new LocalImageStorage();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Choose an image to upload.' }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: 'Image is larger than the 10 MB limit.' }, { status: 413 });
    }

    const processed = await processUpload(Buffer.from(await file.arrayBuffer()), file.type);
    const key = `${randomUUID()}.jpg`;
    const stored = await storage.putImage({ key, ...processed });

    return NextResponse.json({ upload: stored }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload could not be processed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
