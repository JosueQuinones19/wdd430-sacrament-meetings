'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  const linkClass =
    'px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-blue-900 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors';

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between pt-6"
    >
      {currentPage > 1 ? (
        <Link href={createPageURL(currentPage - 1)} className={linkClass} rel="prev">
          Previous
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      <span className="text-sm text-gray-500 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={createPageURL(currentPage + 1)} className={linkClass} rel="next">
          Next
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
