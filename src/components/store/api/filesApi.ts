import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MyFile } from '../../pages/Drive/types/types';
/* eslint-disable-next-line import/no-cycle */
import { RootState } from '../index';

const isProd = process.env.NODE_ENV === 'production';
const url = isProd ? 'https://badoone-drive-backend.up.railway.app' : 'http://127.0.0.1:5000';

export const filesApi = createApi({
  reducerPath: 'filesApi',
  tagTypes: ['file'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/file`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createFile: builder.mutation<string, FormData>({
      query: (body) => ({
        url: ``,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['file'],
    }),
    deleteFile: builder.mutation<string, Partial<MyFile>>({
      query: ({ id }) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['file'],
    }),
    renameFile: builder.mutation<string, Partial<MyFile>>({
      query: ({ id, ...body }) => ({
        url: `${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['file'],
    }),
    getAllFiles: builder.query<MyFile[], void>({
      query: () => ``,
      providesTags: ['file'],
    }),
    getFile: builder.mutation<MyFile, Partial<MyFile>>({
      query: ({ id }) => ({
        url: `${id}`,
        method: 'GET',
        cache: 'no-cache',
      }),
    }),
  }),
});

export const {
  useCreateFileMutation,
  useRenameFileMutation,
  useDeleteFileMutation,
  useGetAllFilesQuery,
  useGetFileMutation,
} = filesApi;
