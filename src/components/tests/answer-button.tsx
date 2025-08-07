import { Button } from "@/components/ui/button";
import { TAnswerDTO } from "@/types";
import { useState } from "react";

interface IAnswerButtonProps {
  handleAnswerSubmit: (isCorrect: boolean) => void;
  answer: TAnswerDTO;
  isAnswered: boolean;
}

export const AnswerButton = ({
  answer,
  handleAnswerSubmit,
  isAnswered,
}: IAnswerButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Button
      variant="outline"
      className={`w-full justify-start transition-all h-fit whitespace-normal text-left ${
        isClicked
          ? answer.isCorrect
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-red-400 text-white hover:bg-red-500"
          : isAnswered && answer.isCorrect
          ? "bg-green-500 text-white hover:bg-green-600"
          : ""
      }`}
      onClick={() => {
        handleAnswerSubmit(answer.isCorrect);
        setIsClicked(true);
      }}
      disabled={isAnswered}
    >
      {answer.label}) {answer.text}
    </Button>
  );
};
