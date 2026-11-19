export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin (leader-facing) section. Authentication arrives in Week 05.
  return (
    <section className="max-w-3xl mx-auto">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-400">
        Admin area
      </p>
      {children}
    </section>
  );
}
