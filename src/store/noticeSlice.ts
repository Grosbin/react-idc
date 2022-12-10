import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  notices: {
    id: string;
    title: string;
    description: string;
    date: string;
  }[];
  onCreateNotice: boolean;
  onUpdateNotice: boolean;
  onNoticeActive: {
    id: string;
    title: string;
    description: string;
    date: string;
  };
}

const initialState: initialStateType = {
  notices: [],
  onCreateNotice: true,
  onUpdateNotice: false,
  onNoticeActive: {
    id: "",
    title: "",
    description: "",
    date: "",
  },
};

export const noticeReducer = createSlice({
  name: "notice",
  initialState,
  reducers: {
    addNotice: (state, action) => {
      state.notices = [...state.notices, action.payload];
    },
    removeNotice: (state, action) => {
      state.notices = state.notices.filter(
        (notice) => notice.id !== action.payload
      );
    },
    updateNotice: (state, action) => {
      state.notices = state.notices.map((notice) =>
        notice.id === action.payload.id ? action.payload : notice
      );
    },
    loadNotice: (state, action) => {
      state.notices = action.payload;
    },
    onNoticeActive: (state, action) => {
      state.onNoticeActive = action.payload;
    },
    onCreateNotice: (state) => {
      state.onCreateNotice = true;
      state.onUpdateNotice = false;
    },
    onUpdateNotice: (state) => {
      state.onCreateNotice = false;
      state.onUpdateNotice = true;
    },
  },
});

export const {
  addNotice,
  removeNotice,
  updateNotice,
  loadNotice,
  onNoticeActive,
  onCreateNotice,
  onUpdateNotice,
} = noticeReducer.actions;
