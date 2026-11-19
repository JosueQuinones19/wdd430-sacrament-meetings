import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getMeetingsByDate } from '@/lib/meetings-db';

function getMostRecentSunday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 0 : day;
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - diff);
  return sunday.toISOString().split('T')[0];
}

export default async function CurrentMeetingPage() {
  // Opt into dynamic rendering so new Date() runs at request time.
  await headers();

  const meetings = await getMeetingsByDate();

  if (meetings.length === 0) {
    redirect('/meetings');
  }

  const recentSunday = getMostRecentSunday();

  // meetings is ordered newest first. Prefer this Sunday's meeting, then the
  // next upcoming one, then fall back to the most recent meeting.
  const currentMeeting =
    meetings.find((m) => m.date === recentSunday) ||
    meetings.find((m) => m.date >= recentSunday) ||
    meetings[0];

  redirect(`/meetings/${currentMeeting.id}`);
}
