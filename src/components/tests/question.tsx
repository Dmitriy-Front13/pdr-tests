import { IQuestionDTO, TQuestionWithoutTopic } from "@/types";
import { AnswerButton } from "./answer-button";

interface IQuestionProps {
  question: TQuestionWithoutTopic | IQuestionDTO;
  handleAnswerSubmit: (isCorrect: boolean) => void;
  isAnswered: boolean;
}
export const Question = ({
  question,
  handleAnswerSubmit,
  isAnswered,
}: IQuestionProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {"topic" in question && (
        <h5 className="font-bold col-span-2">Тема: {question.topic.name}</h5>
      )}
      <h5 className="font-semibold col-span-2">{question.text}</h5>
      {question.imagePath && (
        <img
          src={`/uploads/${question.imagePath}`}
          alt={question.text}
          className="col-span-1"
        />
      )}
      <ul
        className={`flex flex-col gap-1 ${
          question.imagePath ? "col-span-1" : "col-span-2"
        }`}
      >
        {question.answers.map((answer) => (
          <li key={answer.id}>
            <AnswerButton
              isAnswered={isAnswered}
              answer={answer}
              handleAnswerSubmit={handleAnswerSubmit}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
