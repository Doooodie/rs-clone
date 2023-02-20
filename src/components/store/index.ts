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

import modalReducer from './slices/modalSlice';
import filesReducer from './slices/driveSlice';
import filterReducer from './slices/filterSlice';
import fileInfoReducer from './slices/fileInfo';
import appThemeReducer from './slices/appThemeSlice';
import authReducer from './slices/authSlice';
/* eslint-disable import/no-cycle */
import { authApi } from './api/authApi';
/* eslint-enable import/no-cycle */

const rootReducer = combineReducers({
  modal: modalReducer,
  files: filesReducer,
  filter: filterReducer,
  fileInfo: fileInfoReducer,
  appTheme: appThemeReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['modal'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
