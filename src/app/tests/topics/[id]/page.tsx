"use client";
import { Tests } from "@/components/tests";
import { IQuestionResponse, ITopicDTO } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TestByTopicPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState<ITopicDTO>();

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/questions/topics/${id}`);
      const { data } = (await res.json()) as IQuestionResponse;
      setTopic(data);
      console.log("Questions loaded:", data);
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (topic?.questions.length === 0) {
    return <div>No questions found for this topic.</div>;
  }
  return (
    <>
      <h2>{topic!.name}</h2>
      <Tests questions={topic!.questions} />
    </>
  );
}
