import { Button } from "@/components/ui/button";
import { IStatsOfQuestions } from ".";

interface INavigationProps {
  questions: IStatsOfQuestions[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export const Navigation = ({
  questions,
  currentStep,
  onStepChange,
}: INavigationProps) => {
  return (
    <div className="py-2.5 flex items-center gap-2.5 overflow-x-auto max-w-full">
      {questions.map((question) => {
        const isActive = question.number === currentStep;
        return (
          <Button
            key={question.number}
            variant="outline"
            className={`${
              isActive ? "bg-blue-500 text-white" : "bg-gray-200"
            } ${
              question.isAnswered
                ? question.isCorrect
                  ? "bg-green-500"
                  : "bg-red-400"
                : ""
            } `}
            size="icon"
            disabled={isActive}
            onClick={() => onStepChange(question.number)}
          >
            {question.number}
          </Button>
        );
      })}
    </div>
  );
};
