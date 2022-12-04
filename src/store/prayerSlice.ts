import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  prayers: { type: string; names: string[] }[];
}

const initialState: initialStateType = {
  prayers: [],
};

export const prayerReducer = createSlice({
  name: "prayer",
  initialState,
  reducers: {
    addPrayer: (state, action) => {
      state.prayers = [...state.prayers, action.payload];
    },
    removePrayer: (state, action) => {
      state.prayers = state.prayers.filter(
        (prayer) => prayer.type !== action.payload
      );
    },
    loadPrayer: (state, action) => {
      state.prayers = action.payload;
    },
  },
});

export const { addPrayer, removePrayer, loadPrayer } = prayerReducer.actions;
