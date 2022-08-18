import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  FindRequestInput,
  FindResponseSuccess,
  CreateRequestInput,
  CreateResponseSuccess,
} from '../types';

const END_POINT = 'posts';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    findPosts: builder.query<FindResponseSuccess, FindRequestInput>({
      query: ({ page, take, accessToken }) => {
        return {
          url: END_POINT,
          params: {
            page,
            take,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    createPost: builder.mutation<CreateResponseSuccess, CreateRequestInput>({
      query: ({ content, accessToken }) => {
        return {
          method: 'POST',
          url: END_POINT,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            content,
          },
        };
      },
    }),
  }),
});

export const { useFindPostsQuery, useCreatePostMutation } = postsApi;
