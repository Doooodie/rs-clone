import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MyFile } from '../../pages/Drive/types/types';
/* eslint-disable-next-line import/no-cycle */
import { RootState } from '../index';
import { queryUrl } from '../../services/helpers';

export const filesApi = createApi({
  reducerPath: 'filesApi',
  tagTypes: ['file'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${queryUrl}/file`,
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
