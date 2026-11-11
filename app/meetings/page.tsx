import MeetingCard from '@/components/MeetingCard';
import { getMeetings as fetchMeetings } from '@/lib/meetings-db';

export default async function MeetingsPage() {
  const meetings = fetchMeetings();

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
