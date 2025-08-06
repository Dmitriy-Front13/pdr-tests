"use server";

import { prisma } from "@/prisma/prisma-client";

export async function onSearch(query: string) {
  try {
    const questions = await prisma.question.findMany({
      where: {
        text: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        answers: {
          select: { id: true, label: true, text: true, isCorrect: true },
        },
      },
    });
    if (questions.length === 0) {
      console.warn("No questions found for the query:", query);
      return [];
    }
    return questions;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
