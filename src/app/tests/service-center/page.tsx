"use client";
import { Tests } from "@/components/tests";
import { TQuestionWithoutTopic } from "@/types";
import { useEffect, useRef, useState } from "react";

export default function TestKindaServiceCenter() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<TQuestionWithoutTopic[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const hasMounted = useRef(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/questions/service-center");
      const { data } = (await res.json()) as { data: TQuestionWithoutTopic[] };

      setQuestions(data);
      console.log("Questions loaded:", data);
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      load();
      return;
    }

    if (wrongAttempts >= 3) {
      const timeout = setTimeout(() => {
        setWrongAttempts(0);
        load();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [wrongAttempts]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (questions.length === 0) {
    return <div>No questions found for this topic.</div>;
  }
  return (
    <>
      <h2>Як в МРЕО</h2>
      <Tests questions={questions} setWrongAttempts={setWrongAttempts} />
    </>
  );
}
