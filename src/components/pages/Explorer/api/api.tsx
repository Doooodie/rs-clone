import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IFolder {
  name: string,
  parentId: string,
  userId: number,
  path: string,
  createAt: string,
}

export const filesApi = createApi({
  reducerPath: 'files-api',
  tagTypes: ['files-api'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rsclone-91a0b-default-rtdb.firebaseio.com/'}),
  endpoints: (builder) => ({
    addFolder: builder.mutation<IFolder, Partial<IFolder>>({
      query: (body) => ({
        url: '/folders.json',
        method: 'POST',
        body: JSON.stringify(body)
      })
    }),
    getFolders: builder.query<IFolder[], string>({
      query: () => ({
        url: '/folders'
      })
    })
  })
})

export const {
  useAddFolderMutation,
  useGetFoldersQuery,
} = filesApi;