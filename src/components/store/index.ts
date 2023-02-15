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

const rootReducer = combineReducers({
  modal: modalReducer,
  files: filesReducer,
  filter: filterReducer,
  fileInfo: fileInfoReducer,
  [filesApi.reducerPath]: filesApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['modal'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareHandler = (getDefaultMiddleware: any) => {
  const middlewareList = [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    filesApi.middleware,
  ];
  return middlewareList;
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => middlewareHandler(getDefaultMiddleware)
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { filesApi } from './../pages/Explorer/api/api';

