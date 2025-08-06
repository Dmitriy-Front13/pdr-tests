import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const topicId = Number(id);

  const data = await prisma.topic.findUnique({
    where: {
      id: topicId,
    },
    include: {
      questions: {
        orderBy: [{ number: "asc" }],
        include: {
          answers: {
            orderBy: { label: "asc" },
            select: { id: true, label: true, text: true, isCorrect: true },
          },
        },
      },
    },
  });

  return NextResponse.json({ data });
}
