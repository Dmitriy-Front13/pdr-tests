"use client";
import { IQuestionDTO, TQuestionWithoutTopic } from "@/types";
import { Navigation } from "./navigation";
import React, { useEffect, useRef, useState } from "react";
import { Question } from "./question";

interface TestsProps {
  questions: TQuestionWithoutTopic[] | IQuestionDTO[];
  setWrongAttempts?: React.Dispatch<React.SetStateAction<number>>;
}
export interface IStatsOfQuestions {
  number: number;
  isAnswered: boolean;
  isCorrect: boolean;
}

export function Tests({ questions, setWrongAttempts }: TestsProps) {
  const [statsOfQuestions, setStatsOfQuestions] = useState<IStatsOfQuestions[]>(
    []
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setStatsOfQuestions((prev) =>
      prev.map((q) =>
        q.number === step ? { ...q, isAnswered: true, isCorrect } : q
      )
    );
    if (isCorrect) {
      timeoutRef.current = setTimeout(
        () =>
          setStep((prev) => {
            const nextStep = prev + 1;
            return questions.some((q) => q.number === nextStep)
              ? nextStep
              : prev;
          }),
        500
      );
    }
    if (!isCorrect && setWrongAttempts) {
      setWrongAttempts((prev) => prev + 1);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
