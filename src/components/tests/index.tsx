"use client";
import { IQuestionDTO, TQuestionWithoutTopic } from "@/types";
import { Navigation } from "./navigation";
import { useEffect, useState } from "react";
import { Question } from "./question";

interface TestsProps {
  questions: TQuestionWithoutTopic[] | IQuestionDTO[];
}
export interface IStatsOfQuestions {
  number: number;
  isAnswered: boolean;
  isCorrect: boolean;
}

export function Tests({ questions }: TestsProps) {
  const [statsOfQuestions, setStatsOfQuestions] = useState<IStatsOfQuestions[]>(
    []
  )

  const [step, setStep] = useState<number>(1);
  useEffect(() => {
    setStatsOfQuestions(
      questions.map((q) => ({
        number: q.number,
        isAnswered: false,
        isCorrect: false,
      }))
    );
    setStep(questions[0].number);
  }, [questions]);
  const question = questions.find((q) => q.number === step);
  const isAnswered = statsOfQuestions.find(
    (q) => q.number === step
  )?.isAnswered;
  const handleAnswerSubmit = (isCorrect: boolean) => {
    setStatsOfQuestions((prev) =>
      prev.map((q) =>
        q.number === step ? { ...q, isAnswered: true, isCorrect } : q
      )
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 max-w-7xl w-full">
      <Navigation
        questions={statsOfQuestions}
        currentStep={step}
        onStepChange={(newStep) => {
          setStep(newStep);
        }}
      />
      {question ? (
        <Question
          question={question}
          handleAnswerSubmit={handleAnswerSubmit}
          isAnswered={isAnswered || false}
        />
      ) : (
        "Виникла помилка: запитання не знайдено."
      )}
    </div>
  );
}
