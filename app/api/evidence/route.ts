import { NextResponse } from 'next/server';
import { acceptPlaceEvidence } from '@/lib/evidence';

export async function POST(request: Request) {
  try {
    const evidence = acceptPlaceEvidence(await request.json());
    return NextResponse.json({ evidence }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Evidence rejected.' }, { status: 400 });
  }
}
