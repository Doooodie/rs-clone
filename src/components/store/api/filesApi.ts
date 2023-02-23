import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';
/* eslint-disable-next-line import/no-cycle */
import { RootState } from '../index';
import { FileApi } from '../../pages/Explorer/types/types';

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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload?.[reducerPath];
    }
    return null;
  },
  endpoints: (builder) => ({
    createFile: builder.mutation<string, FileApi>({
      query: (body) => ({
        url: ``,
        method: 'POST',
        body,
      }),
    }),
    getFile: builder.mutation<string, string>({
      query: (body) => ({
        url: ``,
        method: 'GET',
        body,
      }),
    }),
    deleteFile: builder.mutation<string, string>({
      query: (body) => ({
        url: ``,
        method: 'DELETE',
        body,
      }),
    }),
  }),
});

export const { useCreateFileMutation, useGetFileMutation, useDeleteFileMutation } = filesApi;
