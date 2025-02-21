import { configureStore } from '@reduxjs/toolkit';
import subscriptionStatusReducer from './subscriptionStatusSlice';
import authReducer from './authslice';
import userDataReducer from './userDataSlice';
import planReducter from './planDataSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const userDataPersistConfig = {
  key: 'userData',
  storage,
};
const persistedUserDataReducer = persistReducer(userDataPersistConfig, userDataReducer);

const planPersistConfig = {
  key: 'plan',
  storage,
};
const persistedPlanReducer = persistReducer(planPersistConfig, planReducter);

export const store = configureStore({
  reducer: {
    subscriptionStatus: subscriptionStatusReducer,
    auth: authReducer,
    userData: persistedUserDataReducer,
    plan: persistedPlanReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
