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
import modalReducer from './modalSlice';
import filesReducer from './driveSlice';
import filterReducer from './filterSlice';
import fileInfoReducer from './fileInfo';
import appThemeReducer from './appThemeSlice';

import { api } from '../../api/api';

const rootReducer = combineReducers({
  modal: modalReducer,
  files: filesReducer,
  filter: filterReducer,
  fileInfo: fileInfoReducer,
  [api.reducerPath]: api.reducer,
  appTheme: appThemeReducer,
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
    }).concat(api.middleware),
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
