'use client';

export default function Footer() {
  const year = typeof window !== 'undefined' ? new Date().getFullYear() : 2026;

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 px-4 mt-auto">
      <div className="max-w-4xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {year} Sacrament Meeting Planner</p>
        <p className="mt-1">Maple Creek 3rd Ward</p>
      </div>
    </footer>
  );
}
