import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    return NextResponse.json(
      { error: 'Invalid meeting ID. Must be a numeric value.' },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(numericId);

  if (!meeting) {
    return NextResponse.json(
      { error: `Meeting with ID ${numericId} not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}
