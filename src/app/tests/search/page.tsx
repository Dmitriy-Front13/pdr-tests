"use client";
import { SearchForm } from "@/components/forms/search-form";
import { Tests } from "@/components/tests";
import { IQuestionDTO } from "@/types";
import { useState } from "react";

export default function SearchPage() {
  const [questions, setQuestions] = useState<IQuestionDTO[]>([]);
  return (
    <section className="max-w-7xl mx-auto p-4 w-full">
      <h1 className="text-2xl font-bold mb-5 text-center">Пошук запитань</h1>
      <SearchForm setQuestions={setQuestions} />
      {questions.length > 0 ? (
        <Tests questions={questions} />
      ) : (
        <p className="text-center">Немає запитань за вашим запитом.</p>
      )}
    </section>
  );
}
