import { onSearch } from "@/app/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IQuestionDTO } from "@/types";

interface SearchFormProps {
  setQuestions: (questions: IQuestionDTO[]) => void;
}
export const SearchForm = ({ setQuestions }: SearchFormProps) => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("query") as string;
    const questions = await onSearch(query);
    console.log("Search results:", questions);
    setQuestions(questions);
  };
  return (
    <form
      className="flex gap-4 mb-6 max-w-2xl w-full mx-auto"
      onSubmit={onSubmit}
    >
      <Input name="query" placeholder="Введіть запитання або ключові слова" />
      <Button>Пошук</Button>
    </form>
  );
};
