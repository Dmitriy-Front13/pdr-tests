import Link from "next/link";

export default function TestsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex items-center justify-between p-4 max-w-7xl w-full mx-auto">
        <Link href="/tests">На головну</Link>
        <Link href="/tests/topics">По темам</Link>
        <Link href="/tests/service-center">Як в МРЕО</Link>
        <Link href="/tests/search">Поиск</Link>
      </header>
      <main className="flex min-h-screen flex-col items-center bg-gray-100 p-4">
        {children}
      </main>
    </>
  );
}
