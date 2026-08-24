import { NextResponse } from 'next/server';
import { processUpload } from '@/lib/images/process-upload';
import { runModels } from '@/lib/models/registry';
import { calculateConsensus } from '@/lib/consensus';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    if (!(file instanceof File)) return NextResponse.json({ error: 'Choose an image to analyze.' }, { status: 400 });
    const processed = await processUpload(Buffer.from(await file.arrayBuffer()), file.type);
    const runs = await runModels(processed.body, processed.contentType);
    const consensus = calculateConsensus(runs.flatMap((run) => run.result ? [{ model_key: run.model_key, result: run.result }] : []));
    return NextResponse.json({ pass: 'a', runs, consensus, image: { width: processed.width, height: processed.height, hash: processed.hash } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Analysis failed.' }, { status: 502 });
  }
}
