import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const api = createApi({
  reducerPath: 'files-api',
  tagTypes: ['files-api'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  /* eslint-disable consistent-return */
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  /* eslint-enable consistent-return */
  endpoints: (builder) => ({
    addPost: builder.mutation<IPost, Partial<IPost>>({
      query: (body) => ({
        url: '/posts/5',
        method: 'POST',
        body: JSON.stringify(body),
      }),
    }),
    getPost: builder.query<IPost, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddPostMutation, useGetPostQuery } = api;
