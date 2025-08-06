import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma/prisma-client";
import Link from "next/link";

export default async function TopicsPage() {
  const topics = await prisma.topic.findMany({
    orderBy: { id: "asc" },
  });
  return (
    <section className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-5 text-center">Вибирайте тему</h1>
      <ul className="flex flex-col gap-2">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start h-12"
            >
              <Link href={`/tests/topics/${topic.id}`}>{topic.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
