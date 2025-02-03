import { configureStore } from '@reduxjs/toolkit';
import subscriptionStatusReducer from './subscriptionStatusSlice';

export const store = configureStore({
  reducer: {
    subscriptionStatus: subscriptionStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
