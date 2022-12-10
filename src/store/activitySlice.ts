import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  activities: {
    id: string;
    day: string;
    hour: string;
    title: string;
    description: string;
    date: Date | undefined;
  }[];
  onCreateActivity: boolean;
  onUpdateActivity: boolean;
  onActivityActive: {
    id: string;
    day: string;
    hour: string;
    title: string;
    description: string;
    date: Date | undefined;
  };
}

const initialState: initialStateType = {
  activities: [],
  onCreateActivity: true,
  onUpdateActivity: false,
  onActivityActive: {
    id: "",
    day: "",
    hour: "",
    title: "",
    description: "",
    date: undefined,
  },
};

export const activityReducer = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addActivity: (state, action) => {
      state.activities = [...state.activities, action.payload];
    },
    removeActivity: (state, action) => {
      state.activities = state.activities.filter(
        (activity) => activity.id !== action.payload
      );
    },
    updateActivity: (state, action) => {
      state.activities = state.activities.map((activity) =>
        activity.id === action.payload.id ? action.payload : activity
      );
    },
    loadActivity: (state, action) => {
      state.activities = action.payload;
    },
    onActivityActive: (state, action) => {
      state.onActivityActive = action.payload;
    },
    onCreateActivity: (state) => {
      state.onCreateActivity = true;
      state.onUpdateActivity = false;
    },
    onUpdateActivity: (state) => {
      state.onUpdateActivity = true;
      state.onCreateActivity = false;
    },
  },
});

export const {
  addActivity,
  removeActivity,
  loadActivity,
  updateActivity,
  onActivityActive,
  onCreateActivity,
  onUpdateActivity,
} = activityReducer.actions;
