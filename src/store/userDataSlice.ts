import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '@/types/profiles';

const initialState: UserData = {
  email: '',
  img_url: '',
  name: '',
  phone: '',
  sub_status: 'none',
  subscription_info: {
    card_name: '',
    card_number: '',
    end_date: '',
    next_bill_date: '',
    payment_amount: 0,
    plan_id: 0,
    remaining_days: 0,
  },
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (_, action: PayloadAction<UserData>) => {
      return action.payload;
    },
    clearUserData: () => initialState,
    updateSubStatus: (state, action: PayloadAction<'active' | 'cancelled' | 'none' | 'paused'>) => {
      state.sub_status = action.payload;
    },
  },
});

export const { setUserData, clearUserData, updateSubStatus } = userDataSlice.actions;
export default userDataSlice.reducer;
