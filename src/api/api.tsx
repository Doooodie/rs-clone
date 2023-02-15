import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const filesApi = createApi({
  reducerPath: 'files-api',
  tagTypes: ['files-api'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
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

export const { useAddPostMutation, useGetPostQuery } = filesApi;
