import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
/* eslint-disable-next-line import/no-cycle */
import { RootState } from '../index';
import { queryUrl } from '../../services/helpers';

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

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['credentials'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${queryUrl}/user`,
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
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
