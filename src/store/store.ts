import { configureStore } from '@reduxjs/toolkit';
import subscriptionStatusReducer from './subscriptionStatusSlice';

export const store = configureStore({
  reducer: {
    subscriptionStatus: subscriptionStatusReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
