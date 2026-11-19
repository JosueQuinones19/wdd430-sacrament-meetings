import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <Image
        src="/chapel.svg"
        alt="A Latter-day Saint chapel with a steeple against a blue sky"
        width={600}
        height={400}
        className="rounded-lg mx-auto shadow-md"
        priority
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Welcome to the Sacrament Meeting Planner
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        View upcoming sacrament meeting agendas, browse past programs, and print
        meeting bulletins for the Maple Creek 3rd Ward.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/meetings"
          className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors font-medium"
        >
          View All Meetings
        </Link>
        <Link
          href="/meetings/current"
          className="px-6 py-3 border border-blue-900 text-blue-900 dark:border-blue-400 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors font-medium"
        >
          Current Meeting
        </Link>
      </div>
    </div>
  );
}
