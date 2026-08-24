import { NextResponse } from 'next/server';
import { analyzeWithAnthropic } from '@/lib/models/anthropic';
import { processUpload } from '@/lib/images/process-upload';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Choose an image to analyze.' }, { status: 400 });
    }

    const processed = await processUpload(Buffer.from(await file.arrayBuffer()), file.type);
    const result = await analyzeWithAnthropic(processed.body, processed.contentType);
    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Analysis failed.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
