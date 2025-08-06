import { TQuestionWithoutTopic } from "@/types";
import { AnswerButton } from "./answer-button";

interface IQuestionProps {
  question: TQuestionWithoutTopic;
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
      <h5 className="font-semibold col-span-2">{question.text}</h5>
      {question.imagePath && (
        <img
          src={`/uploads/${question.imagePath}`}
          alt={question.text}
          className="col-span-1"
        />
      )}
      <ul className="flex flex-col gap-1">
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
