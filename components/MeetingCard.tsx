import Link from 'next/link';
import { Meeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: Meeting;
}

const typeLabels: Record<string, string> = {
  regular: 'Sacrament Meeting',
  testimony: 'Fast & Testimony Meeting',
  stake: 'Stake Conference',
  general: 'General Conference',
};

const typeBadgeColors: Record<string, string> = {
  regular: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  testimony: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  stake: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  general: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const dateFormatted = new Date(meeting.date + 'T12:00:00').toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {dateFormatted}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Conducting: {meeting.conducting}
          </p>
          {meeting.speakers.length > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Speakers: {meeting.speakers.map((s) => s.name).join(', ')}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
            typeBadgeColors[meeting.type]
          }`}
        >
          {typeLabels[meeting.type]}
        </span>
      </div>
    </Link>
  );
}
