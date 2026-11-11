'use client';

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Header() {
  const today = typeof window !== 'undefined' ? getFormattedDate() : '';

  return (
    <header className="bg-blue-900 text-white py-6 px-4 shadow-md">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Maple Creek 3rd Ward
        </h1>
        {today && <p className="text-blue-200 text-sm mt-1">{today}</p>}
      </div>
    </header>
  );
}
