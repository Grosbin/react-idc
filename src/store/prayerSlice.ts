import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  prayers: { id: string; type: string; names: string[] }[];
  onCreatePrayer: boolean;
  onUpdatePrayer: boolean;
  onPrayerActive: { id: string; type: string; names: string[] };
}

const initialState: initialStateType = {
  prayers: [],
  onCreatePrayer: true,
  onUpdatePrayer: false,
  onPrayerActive: { id: "", type: "", names: [] },
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
        (prayer) => prayer.id !== action.payload
      );
    },
    updatePrayer: (state, action) => {
      state.prayers = state.prayers.map((prayer) =>
        prayer.id === action.payload.id ? action.payload : prayer
      );
    },
    loadPrayer: (state, action) => {
      state.prayers = action.payload;
    },
    onPrayerActive: (state, action) => {
      state.onPrayerActive = action.payload;
    },
    onCreatePrayer: (state) => {
      state.onCreatePrayer = true;
      state.onUpdatePrayer = false;
    },
    onUpdatePrayer: (state) => {
      state.onUpdatePrayer = true;
      state.onCreatePrayer = false;
    },
  },
});

export const {
  addPrayer,
  removePrayer,
  loadPrayer,
  updatePrayer,
  onPrayerActive,
  onCreatePrayer,
  onUpdatePrayer,
} = prayerReducer.actions;
