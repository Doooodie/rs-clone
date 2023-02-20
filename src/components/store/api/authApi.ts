import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';
/* eslint-disable import/no-cycle */
import { RootState } from '../index';
/* eslint-enable import/no-cycle */

type Credentials = {
  name: string;
  email: string;
  password: string;
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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
    return null;
  },
  endpoints: (builder) => ({
    signUp: builder.mutation<string, Credentials>({
      query: (body) => ({
        url: `registration`,
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation<string, Credentials>({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
