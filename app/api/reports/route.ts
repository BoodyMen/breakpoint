import { NextResponse } from 'next/server';
import { z } from 'zod';

const reportSchema = z.object({ analysis_id: z.string().uuid(), reason: z.string().min(1).max(2000) });

export async function POST(request: Request) {
  const parsed = reportSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'A valid analysis id and reason are required.' }, { status: 400 });
  return NextResponse.json({ report: parsed.data, status: 'received' }, { status: 201 });
}
