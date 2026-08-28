import { NextResponse } from 'next/server';
import { processUpload } from '@/lib/images/process-upload';
import { runModels } from '@/lib/models/registry';
import { calculateConsensus, rankCandidates } from '@/lib/consensus';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    if (!(file instanceof File)) return NextResponse.json({ error: 'Choose an image to analyze.' }, { status: 400 });
    const processed = await processUpload(Buffer.from(await file.arrayBuffer()), file.type);
    const runs = await runModels(processed.body, processed.contentType);
    const succeeded = runs.flatMap((run) => (run.result ? [{ model_key: run.model_key, result: run.result }] : []));

    if (succeeded.length === 0) {
      const reason = runs.find((run) => run.error)?.error ?? 'No model returned a usable answer.';
      return NextResponse.json({ error: reason, runs }, { status: 502 });
    }

    return NextResponse.json({
      pass: 'a',
      runs,
      consensus: calculateConsensus(succeeded),
      candidates: rankCandidates(succeeded),
      image: { width: processed.width, height: processed.height, hash: processed.hash }
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Analysis failed.' }, { status: 502 });
  }
}
