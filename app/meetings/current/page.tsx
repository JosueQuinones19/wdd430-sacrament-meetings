import { redirect } from 'next/navigation';
import { getMeetings as fetchAllMeetings } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

function getMostRecentSunday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 0 : day;
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - diff);
  return sunday.toISOString().split('T')[0];
}

export default async function CurrentMeetingPage() {
  const meetings = fetchAllMeetings();

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
