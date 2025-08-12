"use client";

import { IQuestionDTO } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminAnswersPage() {
  const { id } = useParams();
  const [rows, setRows] = useState<IQuestionDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topicId, setTopicId] = useState<number>(Number(id) ?? 1);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/questions/${topicId}`);
      const json = await res.json();
      setRows(json.data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Помилка завантаження");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [topicId, id]);

  async function uploadImage(questionId: number, file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`/api/questions/${questionId}/upload-image`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Помилка завантаження зображення");
    } else {
      await load();
    }
  }

  if (loading) return <div className="p-4">Завантаження...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-xl font-semibold">Фото для відповідей</h1>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">№</th>
              <th className="px-3 py-2 text-left">Тема</th>
              <th className="px-3 py-2 text-left">Вопрос</th>
              <th className="px-3 py-2 text-left">Фото</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((q) => (
              <tr key={q.id} className="border-t">
                <td className="px-3 py-2 whitespace-nowrap">{q.number}</td>
                <td className="px-3 py-2">{q.topic?.name}</td>
                <td className="px-3 py-2">{q.text}</td>
                <td className="px-3 py-2">
                  {q.imagePath && (
                    <img
                      src={q.imagePath}
                      alt="Зображення"
                      className="max-w-[200px] rounded border"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        uploadImage(q.id, e.target.files[0]);
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button
          className="border rounded px-3 py-1"
          disabled={topicId === 1}
          onClick={() => setTopicId((p) => Math.max(0, p - 1))}
        >
          ← Назад
        </button>
        <button
          className="border rounded px-3 py-1"
          onClick={() => setTopicId((p) => p + 1)}
        >
          Далі →
        </button>
      </div>
    </div>
  );
}
