// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import interestReducer from './slices/interestSlice';

const store = configureStore({
  reducer: {
    interest: interestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
