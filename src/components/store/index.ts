import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import filterReducer from './slices/filterSlice';
import appThemeReducer from './slices/appThemeSlice';
import authReducer from './slices/authSlice';
/* eslint-disable import/no-cycle */
import { authApi } from './api/authApi';
import { filesApi } from './api/filesApi';
/* eslint-enable import/no-cycle */

const rootReducer = combineReducers({
  filter: filterReducer,
  appTheme: appThemeReducer,
  auth: authReducer,
  [filesApi.reducerPath]: filesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [filesApi.reducerPath, authApi.reducerPath, 'filter'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(filesApi.middleware)
      .concat(authApi.middleware),
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
