import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  FindRequestInput,
  FindResponse,
  FindResponseSuccess,
} from '../types';

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
          url: 'posts',
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
  }),
});

export const { useFindPostsQuery } = postsApi;
