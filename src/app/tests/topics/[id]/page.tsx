import { getQuestionsByTopic } from "@/app/actions";
import { Tests } from "@/components/tests";

export default async function TestByTopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const topic = await getQuestionsByTopic(id);
  return (
    <>
      <h2>{topic!.name}</h2>
      <Tests questions={topic!.questions} />
    </>
  );
}
