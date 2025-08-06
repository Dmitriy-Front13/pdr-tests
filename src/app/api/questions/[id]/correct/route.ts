import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const questionId = Number(id);
  const body = (await req.json()) as { label: string }; // напр. { "label": "2" }
  const label = String(body.label);

  if (!questionId || !label) {
    return NextResponse.json(
      { error: "questionId або label відсутні" },
      { status: 400 }
    );
  }

  // В одній транзакції: скидаємо всі в false, потім обраний — в true
  await prisma.$transaction([
    prisma.answer.updateMany({
      where: { questionId },
      data: { isCorrect: false },
    }),
    prisma.answer.updateMany({
      where: { questionId, label },
      data: { isCorrect: true },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
