export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
