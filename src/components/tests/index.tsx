"use client";
import { TQuestionWithoutTopic } from "@/types";
import { Navigation } from "./navigation";
import { useState } from "react";
import { Question } from "./question";

interface TestsProps {
  questions: TQuestionWithoutTopic[];
}
export interface IStatsOfQuestions {
  number: number;
  isAnswered: boolean;
  isCorrect: boolean;
}

export function Tests({ questions }: TestsProps) {
  const [statsOfQuestions, setStatsOfQuestions] = useState<IStatsOfQuestions[]>(
    questions.map((q) => ({
      number: q.number,
      isAnswered: false,
      isCorrect: false,
    }))
  );
  const [step, setStep] = useState(1);
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
      <Question
        question={question!}
        handleAnswerSubmit={handleAnswerSubmit}
        isAnswered={isAnswered || false}
      />
    </div>
  );
}
