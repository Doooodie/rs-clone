import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
/* eslint-disable-next-line import/no-cycle */
import { RootState } from '../index';

type Credentials = {
  name: string;
  email: string;
  password: string;
};

type Result = {
  token: string;
  user: {
    id: number;
  };
};

const isProd = process.env.NODE_ENV === 'production';
const url = isProd ? 'https://badoone-drive-backend.up.railway.app' : 'http://127.0.0.1:5000';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['credentials'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/user`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<Result, Credentials>({
      query: (body) => ({
        url: `registration`,
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation<Result, Credentials>({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        body,
      }),
    }),
    getToken: builder.query<Partial<Result>, void>({
      query: () => `auth`,
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetTokenQuery } = authApi;
