import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  FindRequestInput,
  FindResponseSuccess,
  CreateRequestInput,
  CreateResponseSuccess,
  Post,
} from '../types';

const END_POINT = 'posts';
const REVALIDATION_TAG_TYPE = 'Posts';
const REVALIDATION_TAG_ID_FOR_LIST = 'LIST';

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
  tagTypes: [REVALIDATION_TAG_TYPE],
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

      // Revalidation: For update cache in rtk query
      // - https://redux-toolkit.js.org/rtk-query/usage/mutations#advanced-mutations-with-revalidation
      // - https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#selectively-invalidating-lists
      providesTags: (result) => {
        if (result) {
          return [
            ...result.data.map(
              ({ id }) => ({ type: REVALIDATION_TAG_TYPE, id } as const)
            ),
            { type: REVALIDATION_TAG_TYPE, id: REVALIDATION_TAG_ID_FOR_LIST },
          ];
        }
        return [
          { type: REVALIDATION_TAG_TYPE, id: REVALIDATION_TAG_ID_FOR_LIST },
        ];
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
      invalidatesTags: [
        { type: REVALIDATION_TAG_TYPE, id: REVALIDATION_TAG_ID_FOR_LIST },
      ],
    }),
  }),
});

export const { useFindPostsQuery, useCreatePostMutation } = postsApi;
