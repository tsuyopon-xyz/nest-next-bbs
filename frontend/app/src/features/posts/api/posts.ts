import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  FindRequestInput,
  FindResponseSuccess,
  CreateRequestInput,
  CreateResponseSuccess,
  RemoveRequestInput,
  RemoveResponseSuccess,
} from '../types';

const POSTS_END_POINT = 'posts';
const REVALIDATION_TAG_TYPE = 'Posts';
const REVALIDATION_TAG_ID_FOR_LIST = 'LIST';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT + POSTS_END_POINT,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  tagTypes: [REVALIDATION_TAG_TYPE],
  endpoints: (builder) => ({
    findPosts: builder.query<FindResponseSuccess, FindRequestInput>({
      query: ({ page, take }) => {
        return {
          url: '',
          params: {
            page,
            take,
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
      query: ({ content }) => {
        return {
          method: 'POST',
          url: '',
          body: {
            content,
          },
        };
      },
      invalidatesTags: [
        { type: REVALIDATION_TAG_TYPE, id: REVALIDATION_TAG_ID_FOR_LIST },
      ],
    }),
    removePost: builder.mutation<RemoveResponseSuccess, RemoveRequestInput>({
      query: ({ id }) => {
        return {
          method: 'DELETE',
          url: '/' + id,
        };
      },
      invalidatesTags: (result, error, { id }) => {
        if (result) {
          return [{ type: REVALIDATION_TAG_TYPE, id }];
        }

        return [{ type: REVALIDATION_TAG_TYPE, id: 'ERROR' }];
      },
    }),
  }),
});

export const {
  useFindPostsQuery,
  useCreatePostMutation,
  useRemovePostMutation,
} = postsApi;
