// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Set up the persist config
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, counterReducer);

// Set up the store
export const store = configureStore({
  reducer: {
    counter: persistedReducer,
  },
});

// Create a persistor
export const persistor = persistStore(store);
