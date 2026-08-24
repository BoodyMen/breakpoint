import { NextResponse } from 'next/server';
import { parsePlaceContext } from '@/lib/intake';

export async function POST(request: Request) {
  try {
    const context = parsePlaceContext(await request.json());
    return NextResponse.json({ context }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Context must contain place-focused fields only.' }, { status: 400 });
  }
}
