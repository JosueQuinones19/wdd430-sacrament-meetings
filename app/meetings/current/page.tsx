import { redirect } from 'next/navigation';
import { Meeting } from '@/lib/types';

async function getMeetings(): Promise<Meeting[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch meetings');
  }

  return res.json();
}

function getMostRecentSunday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 0 : day;
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - diff);
  return sunday.toISOString().split('T')[0];
}

export default async function CurrentMeetingPage() {
  const meetings = await getMeetings();

  if (meetings.length === 0) {
    redirect('/meetings');
  }

  const recentSunday = getMostRecentSunday();

  // Find meeting matching this Sunday or the next upcoming one
  const currentMeeting =
    meetings.find((m) => m.date === recentSunday) ||
    meetings.find((m) => m.date >= recentSunday) ||
    meetings[0];

  redirect(`/meetings/${currentMeeting.id}`);
}
