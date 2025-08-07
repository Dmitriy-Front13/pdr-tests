import { Button } from "@/components/ui/button";
import { IStatsOfQuestions } from ".";
import { cn } from "@/lib/utils";

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
            className={cn(
              "bg-gray-200 transition-colors duration-300",
              isActive && "bg-blue-500 text-white",
              question.isAnswered &&
                (question.isCorrect
                  ? "bg-green-500 hover:bg-green-500 text-white"
                  : "bg-red-400 hover:bg-red-400 text-white")
            )}
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
