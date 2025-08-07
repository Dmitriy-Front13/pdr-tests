import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const requiredTopics = [
    49, 2, 48, 46, 47, 17, 18, 35, 36, 34, 33, 21, 13, 8, 9,
  ];
  const excludedTopics = [42, 43, 44, 45];

  const questionIdsResult = await prisma.$queryRawUnsafe<{ id: number }[]>(`
  SELECT id FROM (
    (
      SELECT DISTINCT ON (q.topic_id) q.id
      FROM "Question" q
      WHERE q.topic_id IN (${requiredTopics.join(",")})
      ORDER BY q.topic_id, RANDOM()
    )
    UNION
    (
      SELECT DISTINCT ON (q.topic_id) q.id
      FROM "Question" q
      WHERE q.topic_id NOT IN (${[...requiredTopics, ...excludedTopics].join(
        ","
      )})
      ORDER BY q.topic_id, RANDOM()
    )
  ) AS combined
  LIMIT 20;
`);

  const questionIds = questionIdsResult.map((q) => q.id);
  const questions = await prisma.question.findMany({
    where: {
      id: { in: questionIds },
    },
    omit: {
      topicId: true,
    },
    include: {
      answers: {
        orderBy: { label: "asc" },
        select: {
          id: true,
          label: true,
          text: true,
          isCorrect: true,
        },
      },
    },
  });

  const numberedQuestions = questions.map((q, index) => ({
    ...q,
    number: index + 1,
  }));

  return NextResponse.json({ data: numberedQuestions });
}
