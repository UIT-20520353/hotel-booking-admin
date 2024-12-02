import { RootState } from "@/app/store";
import { TGlobalState } from "@/types/global";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TGlobalState = {
  loading: 0,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    increaseLoading: (state) => {
      state.loading += 1;
    },
    decreaseLoading: (state) => {
      if (state.loading > 0) {
        state.loading -= 1;
      }
    },
  },
});

export const { increaseLoading, decreaseLoading } = globalSlice.actions;
export const selectGlobalState = (state: RootState) => state.global;
export default globalSlice.reducer;
