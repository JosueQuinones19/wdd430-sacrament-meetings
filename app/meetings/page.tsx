import MeetingCard from '@/components/MeetingCard';
import { Meeting } from '@/lib/types';

async function getMeetings(): Promise<Meeting[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch meetings');
  }

  return res.json();
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  if (meetings.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
        No meetings scheduled at this time.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}
