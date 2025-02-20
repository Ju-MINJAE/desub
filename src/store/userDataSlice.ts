import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '@/types/profiles';

const initialState: UserData = {
  email: '',
  img_url: '',
  name: '',
  phone: '',
  sub_status: 'none',
  subscription_info: {
    end_date: '',
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
  },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
