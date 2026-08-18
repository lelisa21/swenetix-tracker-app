export interface Idea {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface CreateIdeaInput {
  title: string;
  description: string;
}