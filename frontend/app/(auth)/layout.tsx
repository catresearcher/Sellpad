export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] lg:w-[50%] xl:w-[25%]  p-2">
        {children}
      </div>
    </div>
  );
}
