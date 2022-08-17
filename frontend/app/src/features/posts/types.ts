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

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
}

export type FindRequestInput = {
  cursorId?: number;
  take?: number;
  accessToken: string;
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
