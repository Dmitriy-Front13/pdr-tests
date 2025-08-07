"use client";
import { Tests } from "@/components/tests";
import { IQuestionResponse, TQuestionWithoutTopic } from "@/types";
import { useEffect, useState } from "react";

export default function TestKindaServiceCenter() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<TQuestionWithoutTopic[]>([]);

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
    load();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (questions.length === 0) {
    return <div>No questions found for this topic.</div>;
  }
  return (
    <>
      <h2>Як в МРЕО</h2>
      <Tests questions={questions} />
    </>
  );
}
