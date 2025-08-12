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
          orderBy: { label: "asc" },
        },
        topic: {
          select: { name: true },
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

export const getQuestionsByTopic = async (topicId: string) => {
  const id = Number(topicId);
  try {
    const data = await prisma.topic.findUnique({
      where: {
        id,
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
    return data;
  } catch (error) {
    return null;
  }
};
