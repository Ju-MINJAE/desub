import { configureStore } from '@reduxjs/toolkit';
import subscriptionStatusReducer from './subscriptionStatusSlice';
import authReducer from './authslice';

export const store = configureStore({
  reducer: {
    subscriptionStatus: subscriptionStatusReducer,
    auth: authReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
