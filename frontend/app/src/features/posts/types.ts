export type Author = {
  id: number;
  name: string;
};

export type Post = {
  id: number;
  content: string;
  author: Author;
  createdAt: Date;
};

export type FindRequestInput = {
  page?: number;
  take?: number;
};
export type FindResponseSuccess = {
  data: Post[];
  total: number;
};
export type FindResponseError = {
  message: string;
  statusCode: number;
};
export type FindResponse = FindResponseSuccess | FindResponseError;

export type CreateRequestInput = {
  content: string;
};
export type CreateResponseSuccess = Post;
export type CreateResponseError = {
  message: string;
  statusCode: number;
  error?: string;
};
export type CreateResponse = CreateResponseSuccess | CreateResponseError;

export type RemoveRequestInput = {
  id: number;
};
export type RemoveResponseSuccess = Post;
export type RemoveResponseError = {
  message: string;
  statusCode: number;
  error?: string;
};
export type RemoveResponse = CreateResponseSuccess | CreateResponseError;
