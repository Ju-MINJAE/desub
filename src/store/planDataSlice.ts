import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlanState {
  id: number | null;
  plan_name: string;
  price: number;
  period: string;
  is_active: boolean;
}

const initialState: PlanState = {
  id: null,
  plan_name: '',
  price: 0,
  period: '',
  is_active: false,
};

export const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setPlanData: (_, action: PayloadAction<PlanState>) => {
      return action.payload;
    },
    resetPlan: () => initialState,
  },
});

export const { setPlanData, resetPlan } = planSlice.actions;
export default planSlice.reducer;
