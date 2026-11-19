import { NextRequest, NextResponse } from 'next/server';
import { getMeetingsByDate } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const date = searchParams.get('date') ?? undefined;

  const meetings = await getMeetingsByDate(date);
  return NextResponse.json(meetings);
}
