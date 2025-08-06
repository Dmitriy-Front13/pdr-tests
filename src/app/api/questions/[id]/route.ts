import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const topicId = Number(id);

  const data = await prisma.question.findMany({
    where: {
      topicId,
    },
    orderBy: [{ number: "asc" }],
    include: {
      topic: { select: { name: true } },
      answers: {
        orderBy: { label: "asc" },
        select: { id: true, label: true, text: true, isCorrect: true },
      },
    },
  });

  return NextResponse.json({ data });
}
