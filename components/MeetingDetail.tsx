'use client';

import { Meeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: Meeting;
}

const typeLabels: Record<string, string> = {
  regular: 'Sacrament Meeting',
  testimony: 'Fast & Testimony Meeting',
  stake: 'Stake Conference',
  general: 'General Conference',
};

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const dateFormatted = new Date(
    meeting.date + 'T12:00:00'
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="max-w-2xl mx-auto">
      {/* Print button */}
      <div className="flex justify-end mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="px-4 py-2 text-sm bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors cursor-pointer"
        >
          Print Program
        </button>
      </div>

      {/* Program header */}
      <div className="text-center mb-8 print:mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 print:text-black">
          {meeting.wardName}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-1 print:text-gray-700">
          {typeLabels[meeting.type]}
        </p>
        <p className="text-gray-500 dark:text-gray-400 mt-1 print:text-gray-600">
          {dateFormatted}
        </p>
      </div>

      {/* Leadership */}
      <section className="mb-6">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Presiding:
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {meeting.presiding}
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Conducting:
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {meeting.conducting}
          </div>
        </div>
      </section>

      <hr className="border-gray-200 dark:border-gray-700 my-4 print:border-gray-300" />

      {/* Announcements */}
      {meeting.announcements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
            Announcements
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
            {meeting.announcements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Ward Business */}
      {meeting.wardBusiness.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
            Ward Business
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
            {meeting.wardBusiness.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>
      )}

      {meeting.stakeBusiness && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
            Stake Business
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
            Stake business will be conducted during this meeting.
          </p>
        </section>
      )}

      <hr className="border-gray-200 dark:border-gray-700 my-4 print:border-gray-300" />

      {/* Meeting program */}
      <section className="space-y-4">
        {/* Opening Hymn */}
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Opening Hymn
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            #{meeting.openingHymn.number} &ndash; {meeting.openingHymn.title}
          </span>
        </div>

        {/* Opening Prayer */}
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Invocation
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {meeting.openingPrayer}
          </span>
        </div>

        {/* Sacrament Hymn (only for sacrament meetings) */}
        {meeting.sacramentHymn.number > 0 && (
          <>
            <hr className="border-gray-100 dark:border-gray-800 print:border-gray-200" />
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Sacrament Hymn
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                #{meeting.sacramentHymn.number} &ndash;{' '}
                {meeting.sacramentHymn.title}
              </span>
            </div>
            <p className="text-xs text-center text-gray-400 dark:text-gray-500 italic">
              Administration of the Sacrament
            </p>
          </>
        )}

        {/* Speakers and Musical Numbers */}
        {meeting.speakers.length > 0 && (
          <>
            <hr className="border-gray-100 dark:border-gray-800 print:border-gray-200" />
            {meeting.speakers.map((speaker, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Speaker
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {speaker.name}
                  </span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  Topic: {speaker.topic}
                </p>
                {/* Insert musical number after first speaker if available */}
                {i === 0 && meeting.musicalNumbers.length > 0 && (
                  <div className="mt-3">
                    {meeting.musicalNumbers.map((mn, j) => (
                      <div key={j} className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          Musical Number
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {mn.performer} &ndash; &ldquo;{mn.title}&rdquo;
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Testimony meeting note */}
        {meeting.type === 'testimony' && (
          <>
            <hr className="border-gray-100 dark:border-gray-800 print:border-gray-200" />
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 italic py-2">
              The remainder of the meeting is open for the bearing of
              testimonies.
            </p>
          </>
        )}

        <hr className="border-gray-100 dark:border-gray-800 print:border-gray-200" />

        {/* Closing Hymn */}
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Closing Hymn
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            #{meeting.closingHymn.number} &ndash; {meeting.closingHymn.title}
          </span>
        </div>

        {/* Closing Prayer */}
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Benediction
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {meeting.closingPrayer}
          </span>
        </div>
      </section>
    </article>
  );
}
