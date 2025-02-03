import { createSlice } from '@reduxjs/toolkit';

interface subscriptionStatus {
  status: string;
}

const initialState: subscriptionStatus = {
  status: 'unsubscribed',
};

const subscriptionStatusSlice = createSlice({
  name: 'subscriptionStatus',
  initialState,
  reducers: {
    setSubscriptionStatus: (state, action: { payload: string }) => {
      state.status = action.payload;
    },
  },
});

export const { setSubscriptionStatus } = subscriptionStatusSlice.actions;
export default subscriptionStatusSlice.reducer;
