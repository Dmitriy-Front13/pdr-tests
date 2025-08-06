import { Answer, Question, Topic } from "@prisma/client";

export interface IQuestionDTO extends Question {
  topic: Omit<Topic, "id">;
  answers: TAnswerDTO[];
}

export interface ITopicDTO extends Topic {
  questions: TQuestionWithoutTopic[];
}

export type TAnswerDTO = Omit<Answer, "questionId">;

export type TQuestionWithoutTopic = Omit<IQuestionDTO, "topic">;
export interface IQuestionResponse {
  data: ITopicDTO;
}
