import { NextResponse } from 'next/server';
import { processUpload } from '@/lib/images/process-upload';
import { acceptPlaceEvidence, type EvidenceItem } from '@/lib/evidence';
import { calculateConsensus } from '@/lib/consensus';
import { runModels } from '@/lib/models/registry';

export const runtime = 'nodejs';

function readLedger(value: FormDataEntryValue | null): EvidenceItem[] {
  if (typeof value !== 'string' || !value.trim()) return [];
  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed)) throw new Error('Evidence ledger must be an array.');
  return parsed.map(acceptPlaceEvidence);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    if (!(file instanceof File)) return NextResponse.json({ error: 'Choose an image to analyze.' }, { status: 400 });

    const processed = await processUpload(Buffer.from(await file.arrayBuffer()), file.type);
    const ledger = readLedger(formData.get('evidence'));
    const passA = await runModels(processed.body, processed.contentType);
    const passB = ledger.length ? await runModels(processed.body, processed.contentType, ledger) : null;

    return NextResponse.json({
      image: { width: processed.width, height: processed.height, hash: processed.hash },
      evidence: ledger,
      pass_a: { runs: passA, consensus: calculateConsensus(passA.flatMap((run) => run.result ? [{ model_key: run.model_key, result: run.result }] : [])) },
      pass_b: passB ? { runs: passB, consensus: calculateConsensus(passB.flatMap((run) => run.result ? [{ model_key: run.model_key, result: run.result }] : [])) } : null
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Analysis failed.' }, { status: 400 });
  }
}
