export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Public (member-facing) section. Authentication is not required here.
  return <>{children}</>;
}
